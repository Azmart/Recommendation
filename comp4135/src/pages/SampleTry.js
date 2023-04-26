import { Tab, Tabs, Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Sample.css";

function SampleTry() {
  const [value, setValue] = React.useState(0);
  const [moviedata, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        setData(res.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    alert("You Clicked!");
  };

  // const MovieList = () => {
  //   const [top20Movies, setTop20Movies] = useState([]);

  // };

  const top20Movies = moviedata.top20movies || [];
  const actionMovies = moviedata.action || [];
  const adventureMovies = moviedata.adventure || [];
  const animationMovies = moviedata.animation || [];
  const comedyMovies = moviedata.comedy || [];
  const crimeMovies = moviedata.crime || [];
  const dramaMovies = moviedata.drama || [];
  const horrorMovies = moviedata.horror || [];
  const romanceMovies = moviedata.romance || [];
  const scifiMovies = moviedata.scifi || [];

  // add more genres
  return (
    <div className="Sample">
      <Header />
      <div
        class="row"
        style={{
          height: "10rem",
          backgroundColor: "#e9c46a",
          alignItems: "center",
        }}
      >
        <div class="col"></div>
        <div class="col-3" style={{ textAlign: "center" }}>
          <h5 style={{ color: "white" }}>Get Personalized Recommendations</h5>
          <a href="/user-input" target="_blank">
            <Button variant="primary" id="try-it">
              Click Here!!
            </Button>
          </a>
        </div>
        <div class="col"></div>
      </div>
      <div
        style={{
          height: "3rem",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#c8b6ff",
          fontFamily: "Roboto",
        }}
      >
        <h4>Below are some of our top picks in different genres!!</h4>
      </div>
      <div>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            selectionFollowsFocus
            aria-label="Try It Page Tabs"
          >
            <Tab label="Top 20 Movies" />
            <Tab label="Action" />
            <Tab label="Adventure" />
            <Tab label="Animation" />
            <Tab label="Comedy" />
            <Tab label="Crime" />
            <Tab label="Drama" />
            <Tab label="Horror" />
            <Tab label="Romance" />
            <Tab label="Sci-Fi" />
            {/* add more genre tabs */}
          </Tabs>
          {value === 0 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {top20Movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 1 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {actionMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 2 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {adventureMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 3 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {animationMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 4 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {comedyMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 5 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {crimeMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 6 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {dramaMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 7 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {horrorMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 8 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {romanceMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
          {value === 9 && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {scifiMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onClick={handleClick} />
              ))}
            </Box>
          )}
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default SampleTry;
