import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Box } from "@mui/material";
import NewMovieCard from "../components/NewMovieCard";

import "./NewResults.css";

function NewResults() {
  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const [movieRatings, SetMovieRatings] = useState({});
  const [hasRatedAllMovies, setHasRatedAllMovies] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/top5-recommendations")
      .then((res) => {
        setRecommendedMovies(res.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const hasRatedAllMovies =
      recommendedMovies &&
      recommendedMovies.top5_movies &&
      recommendedMovies.top5_movies.every(
        (movie) => movieRatings[movie.MovieID] !== undefined
      );
    setHasRatedAllMovies(hasRatedAllMovies);
  }, [recommendedMovies, movieRatings]);

  const handleClick = () => {
    alert("You Clicked!");
  };

  const handleRating = (MovieID, rating) => {
    SetMovieRatings((prevMovieRatings) => ({
      ...prevMovieRatings,
      [MovieID]: rating,
    }));
  };

  const handleFeedback = () => {
    console.log("recommendedMovies: ", recommendedMovies);
    console.log("movieRatings: ", movieRatings);
    if (!recommendedMovies || !recommendedMovies.top5_movies) {
      console.log("No recommended movies or top5_movies");
      return;
    }

    const feedbackData = {
      movieRatings: recommendedMovies.top5_movies.map((movie) => ({
        movieId: movie.MovieID,
        rating:
          movieRatings[movie.MovieID] !== undefined
            ? movieRatings[movie.MovieID]
            : 0, //if movieRatings[movie.id] is undefined, use 0
      })),
    };
    console.log("feedbackData", feedbackData);
    fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData), //using json instead of stringify
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Success:", response);
          window.location.href = "/updated-results";
        } else {
          alert("Error:" + response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const top5Movies =
    recommendedMovies && recommendedMovies.top5_movies
      ? recommendedMovies.top5_movies.map((movie) => ({
          ...movie,
          rated: movieRatings[movie.MovieID] !== undefined,
        }))
      : [];

  return (
    <div className="NewResults">
      <Header />
      <div>
        <h1 style={{ textAlign: "center" }}>Results</h1>
      </div>
      <div>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {top5Movies && top5Movies.length > 0 ? (
              top5Movies.map((movie) => (
                <NewMovieCard
                  key={movie.MovieID}
                  title={movie.Title}
                  genre={movie.Genres}
                  {...movie}
                  onClick={handleClick}
                  onRating={(rating) => handleRating(movie.MovieID, rating)}
                  rated={movie.rated}
                />
              ))
            ) : (
              <p>No recommended movies found</p>
            )}
          </Box>
        </Box>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col-3" style={{ textAlign: "center" }}>
          <Button variant="success" id="get-it" onClick={handleFeedback}>
            Send Feedback
          </Button>
        </div>
        <div class="col"></div>
      </div>
      <div style={{ height: "2rem" }}></div>

      <Footer />
    </div>
  );
}

export default NewResults;
