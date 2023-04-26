# COMP4135 Group Project

Create a new folder called Recomsys in desktop
Then open the folder in vs code
Open terminal and split the terminal into 2.

In first command prompt of vs code run below commands:

npx create-react-app comp4135

cd comp4135

npm install @mui/material @emotion/react @emotion/styled

npm install @mui/icons-material

npm install react-bootstrap bootstrap

npm install axios

After installing those, there should be src & public folder inside comp4135, replace the files inside with files from github.

In second command prompt of vs code run below commands:

//First time only

mkdir flask-server

cd flask-server

py -3 -m venv recom

pip install Flask

(also install pandas, scikitlearn, numpy, etc in venv, if u don't want to then no need to create venv, just install Flask on root env.
Better to use venv, but scikitlearn does not install sometimes, so only in that case use root env)

//Second time

cd flask-server

recom\Scripts\activate (no need if u install Flask on root env & want to use that)

Download the files inside flask-server folder from github and place it there.

/_ To run the project_/

First terminal:

cd flask-server

python server.py

Second terminal:

cd comp4135

npm start

After the react app is run in localhost:3000, we need to add the Moesif Origin & CORS Changer extension in chrome and enable it for passing the data from backend 
localhost:5000 to localhost:3000 properly.
