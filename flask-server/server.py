import os
import random
import pickle
import numpy as np
import pandas as pd
import requests

from flask import Flask, request
from surprise import SVD, Dataset, Reader, BaselineOnly, accuracy
from surprise.model_selection import train_test_split, cross_validate
from buildChart import build_chart, content_based_recommendation

app = Flask(__name__)


# Global variables in Server.py
# Global variable to store user input
global userInput, userGenres, combinedRecommend, newCombined, top5movies, userRatingsData, userID
userinput = []
userGenres = []  # Global variable to store user input after extracting genres
# Global variable to store the combined recommendation of CF and CB
combinedRecommend = []
top5movies = []  # Global variable to store the top 5 movies from CB filtering
userRatingsData = []  # Global variable to store the user ratings data


# Other variables
ratings = pd.read_csv('ratings.csv')
movies = pd.read_csv('movies.csv')
movies.set_index('MovieID')
ratings = pd.merge(movies, ratings)
userRatings = ratings.pivot_table(index=['UserID'], columns=[
                                  'Title'], values='Rating')
userRatings = userRatings.fillna(0)

user = 6041  # 6041 will be the new user. Anything not 6041 is a predefined user and the maximum number of users are 6040

filePath = os.path.expanduser("ratings.dat")
qualified_dict = pickle.load(open('qualified.pkl', 'rb'))
qualified = pd.DataFrame(qualified_dict)


reader = 0
try:
    reader = Reader(line_format="user item rating timestamp", sep="::")
    data = Dataset.load_from_file(filePath, reader=reader)
except:
    reader = Reader(line_format="user item rating timestamp", sep=":")
    data = Dataset.load_from_file(filePath, reader=reader)

# random.shuffle(data)

train_set, test_set = train_test_split(data, test_size=.20)

# algo = SVD(n_factors=20, n_epochs=20, biased=False)
algo = SVD()

# Train the algorithm on the trainset, and predict ratings for the testset
algo.fit(train_set)
predictions = algo.test(test_set)


# Getting user input for genres
@app.route('/api/userinput', methods=['POST'])
def userinput():
    global userInput  # access to global userInput
    userInput = request.get_json()
    print(userInput)
    print(type(userInput))
    # Calling content_based_recommendation function
    global userGenres
    userGenres = toGenreArray(userInput)
    global top5movies
    top5movies = coldStart(np.array(userGenres))
    return {'message': 'successfully received', 'top5': top5movies.to_json()}

# Change userInput list type to array and extract genres


def toGenreArray(userData):
    userGenresL = []
    for genre in userData:
        userGenresL.append(genre['label'])
    print('userGenres', userGenresL)
    print(type(userGenresL))
    return userGenresL


@app.route('/api/feedback', methods=['POST'])
def feedback():
    userRating = request.get_json()
    print(userRating)
    global userRatingsData
    userRatingsData = getDataForHybridRecommendation(userRating)
    print(userRatingsData)
    return {'message': 'successfully received'}

# Function to get movieID & ratings from userRating json


def getDataForHybridRecommendation(userRating):
    userData = userRating['movieRatings']
    rating_list = []
    for rating in userData:
        rating_list.append([rating['movieId'], rating['rating']])
        addUser([rating['movieId'], rating['rating']])
    return rating_list

# Functions


def addUser(userRatings):  # Function to add new user to the ratings.csv file
    df = 0
    dfCheck = pd.read_csv("ratings.csv")
    dfCheck = dfCheck[dfCheck['UserID'] == user]
    if (len(dfCheck.index) >= 5):
        df = pd.read_csv('original/ratings.csv')
    else:
        df = pd.read_csv('ratings.csv')

    row = {'UserID': int(user), 'MovieID': int(userRatings[0]),
           'Rating': int(userRatings[1]), 'Timestamp': int(978824291)}
    df2 = pd.DataFrame([row])

    df3 = pd.concat([df, df2], ignore_index=True)
    df3.reset_index()

    df3.to_csv("ratings.dat", sep=":", index=False, header=False)

    splitList = []
    with open("ratings.dat") as infile:
        file_contents = infile.readlines()
    for n in file_contents:
        new = n.split(":")
        new[-1] = new[-1].replace("\n", "")
        splitList.append(new)

    df = pd.DataFrame(splitList, columns=[
                      'UserID', 'MovieID', 'Rating', 'Timestamp'],)
    print(df)
    df.to_csv("ratings.csv", index=False)


def coldStart(selectGenres):  # Function to recommend movies when there is no user ratings for any movies using content based filtering
    movies = pd.read_csv('movies.csv')
    ratings = pd.read_csv('ratings.csv')
    movies['Genres'] = movies['Genres'].str.split('|')

    moviesGenres = movies.copy(deep=True)

    genreList = []

    exist = 0
    for ind in movies.index:
        for eachGenres in movies['Genres'][ind]:
            moviesGenres.at[ind, eachGenres] = 1
            for genre in genreList:
                if eachGenres == genre:
                    exist = 1
            if (exist == 0):
                genreList.append(eachGenres)
            else:
                exist = 0

    moviesGenres = moviesGenres.fillna(0)
    genreMatrix = moviesGenres[genreList].to_numpy()

    genrePicks = pd.DataFrame(columns=genreList)
    genrePicks.loc[len(genrePicks.index)] = 0

    for elem in genreList:
        for genre in selectGenres:
            if (genre == elem):
                genrePicks.at[0, genre] = 1

    genrePicks = genrePicks.reset_index(drop=True)
    genrePicks = genrePicks.T

    userProfNorm = (genrePicks / genrePicks.sum())
    userProfNorm = userProfNorm[0]

    moviesGenres = moviesGenres[genreList]

    userProfNorm_matrix = np.array([userProfNorm.values] * len(moviesGenres))
    results = np.multiply(userProfNorm_matrix, np.array(moviesGenres))
    results = results.sum(axis=1)

    recommendTable = movies[['MovieID', 'Title', 'Genres', 'tmdbID']]
    recommendTable['Rating'] = results

    recommendTable = recommendTable.sort_values(
        by=['Rating'], ascending=False).reset_index(drop=True)
    recommendTable.index = recommendTable.index + 1
    print(recommendTable.head(10))
    return recommendTable


def CFBased(userNum):  # Function to recommend movies using collaborative filtering
    userNum = int(userNum)
    ratings = pd.read_csv('ratings.csv')
    movies = pd.read_csv('movies.csv')
    movies.set_index('MovieID')
    ratings = pd.merge(movies, ratings)
    userRatings = ratings.pivot_table(index=['UserID'], columns=[
                                      'Title'], values='Rating')
    userRatings = userRatings.fillna(0)

    if (len(userRatings) <= userNum-1):
        userRatings.loc[len(userRatings) + 1] = 0

    userRatings.loc[userNum] = userRatings.loc[userNum].mask(
        userRatings.loc[userNum] != 0)
    # print(userRatings.loc[userNum, '12 Angry Men (1957)'])

    for (columnName, columnData) in userRatings.items():
        if (userRatings.loc[userNum, columnName] == 0):
            movieID = movies.loc[movies['Title']
                                 == columnName, 'MovieID'].iloc[0]
            predRate = algo.predict(str(userNum), str(movieID))
            userRatings.loc[userNum, columnName] = predRate.est

    oneUser = userRatings
    oneUser = oneUser.T
    oneUser = oneUser[[userNum]]
    oneUser = oneUser.fillna(0)
    oneUser = oneUser.sort_values(by=[userNum], ascending=False)
    oneUser['index'] = range(1, len(oneUser) + 1)
    oneUser.set_index('index')

    return oneUser


def CBBased(userNum):  # Function to recommend movies using content based filtering when ther is user Rating for movies
    userNum = int(userNum)
    movies = pd.read_csv('movies.csv')
    ratings = pd.read_csv('ratings.csv')
    movies['Genres'] = movies['Genres'].str.split('|')
    movies.head()

    moviesGenres = movies.copy(deep=True)

    genreList = []

    exist = 0
    for ind in movies.index:
        for eachGenres in movies['Genres'][ind]:
            moviesGenres.at[ind, eachGenres] = 1
            for genre in genreList:
                if eachGenres == genre:
                    exist = 1
            if (exist == 0):
                genreList.append(eachGenres)
            else:
                exist = 0

    moviesGenres = moviesGenres.fillna(0)
    genreMatrix = moviesGenres[genreList].to_numpy()
    userRatings = ratings[ratings['UserID'] == userNum]
    if len(userRatings.index) > 10:
        userPref = userRatings.sample(
            frac=0.3, random_state=1).reset_index(drop=True)
    else:
        userPref = userRatings.sample(
            frac=1, random_state=1).reset_index(drop=True)

    movieRatings = pd.merge(userPref, moviesGenres)
    movieRatings = movieRatings[genreList]
    weight = userPref['Rating']/userPref['Rating'].sum()
    userProf = movieRatings.T.dot(weight)
    userProfNorm = (userProf / userProf.sum())

    moviesGenres = moviesGenres[genreList]

    userProfNorm_matrix = np.array([userProfNorm.values] * len(moviesGenres))
    results = np.multiply(userProfNorm_matrix, np.array(moviesGenres))
    results = results.sum(axis=1)

    recommendTable = movies[['MovieID', 'Title', 'Genres', 'tmdbID']]
    recommendTable['Rating'] = results

    recommendTable = recommendTable.sort_values(
        by=['Rating'], ascending=False).reset_index(drop=True)
    recommendTable.index = recommendTable.index + 1

    return recommendTable


# Hybrid Recommendation Function & not coldstart
def getFinalRecommendations(user):
    CBrec = CBBased(user)
    CFrec = CFBased(user)

    combinedRecommend = CBrec.copy(deep=True)

    for title in combinedRecommend['Title']:
        contentB = CBrec.loc[CBrec['Title'] == title]
        rankCB = contentB['Rating'].values[0]
        indexCB = contentB['Rating'].index[0]
        try:
            rankCF = CFrec.loc[title].values[0]
        except:
            continue
        indexCF = CFrec.loc[title].values[1]
        compounded = (rankCB * 0.8) + (rankCF * 0.2)
        combinedRecommend.at[indexCB, 'Rating'] = compounded

    combinedRecommend = combinedRecommend.sort_values(
        by=['Rating'], ascending=False).reset_index(drop=True)

    return combinedRecommend


# API Routes

# MovieData API Route
@app.route('/api/movies')
def movies():
    return {'top20movies': qualified.head(20).to_dict(orient='records'),
            'action': build_chart('Action').head(10).to_dict(orient='records'),
            'drama': build_chart('Drama').head(10).to_dict(orient='records'),
            'comedy': build_chart('Comedy').head(10).to_dict(orient='records'),
            'romance': build_chart('Romance').head(10).to_dict(orient='records'),
            'horror': build_chart('Horror').head(10).to_dict(orient='records'),
            'adventure': build_chart('Adventure').head(10).to_dict(orient='records'),
            'crime': build_chart('Crime').head(10).to_dict(orient='records'),
            'scifi': build_chart('Science Fiction').head(10).to_dict(orient='records'),
            'animation': build_chart('Animation').head(10).to_dict(orient='records'),
            }


# Sending top 5 recommended movies to frontend
@app.route('/api/top5-recommendations')
def top5_recommendations():
    # top5_recommended_movies = request.args.get('top5_recommended_movies')
    # Returning top 5 recommended movies as json
    return {'top5_movies': top5movies.head(5).to_dict(orient='records')}


@app.route('/api/final-recommendations')
def final_recommendations():
    final_recommendations = getFinalRecommendations(user)
    return {'final_recommendations': final_recommendations.head(5).to_dict(orient='records')}


if __name__ == '__main__':
    app.run(debug=True)
