import csv
import pandas as pd

splitList = []
with open("movies.dat") as infile:
    file_contents = infile.readlines()
for n in file_contents:
    new = n.split("::")
    new[-1] = new[-1].replace("\n", "")
    splitList.append(new)


df = pd.DataFrame(splitList, columns =['MovieID', 'Title', 'Genres'],) 
print(df)
df.to_csv("movies.csv", index=False)

splitList = []
with open("users.dat") as infile:
    file_contents = infile.readlines()
for n in file_contents:
    new = n.split("::")
    new[-1] = new[-1].replace("\n", "")
    splitList.append(new)


df = pd.DataFrame(splitList, columns =['UserID', 'Gender', 'Age', 'Occupation', 'Zip-code'],) 
print(df)
df.to_csv("users.csv", index=False)

splitList = []
with open("ratings.dat") as infile:
    file_contents = infile.readlines()
for n in file_contents:
    new = n.split("::")
    new[-1] = new[-1].replace("\n", "")
    splitList.append(new)


df = pd.DataFrame(splitList, columns =['UserID', 'MovieID', 'Rating', 'Timestamp'],) 
print(df)
df.to_csv("ratings.csv", index=False)


movies = pd.read_csv('movies.csv')
tmdb = pd.read_csv('links.csv')
movies['tmdbID'] = 0
for movieID in movies['MovieID']:
    rowData = movies.loc[movies['MovieID']
                              == movieID].index
    try:
        movieTmdb = tmdb['tmdbId'].loc[tmdb['movieId'] == movieID].values[0]
        movies.at[rowData[0], 'tmdbID'] = int(movieTmdb)
    except:
        movies = movies.drop([rowData[0]])
        continue
        
movies.head(5)