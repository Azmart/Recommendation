import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { Box } from "@mui/material";
import axios from "axios";
import NewMovieCard from "../components/NewMovieCard";
import "./UpdatedResults.css";

function UpdatedResults() {
  const [top5Movies, setTop5Movies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/final-recommendations")
      .then((res) => {
        setTop5Movies(res.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const top5_Movies = top5Movies.final_recommendations || [];

  const handleClick = () => {
    alert("You Clicked!");
  };

  return (
    <div className="UResults">
      <Header />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Updated Results</h1>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div
          className="col-8"
          style={{
            backgroundColor: "#a2d2ff",
            height: "8rem",
            width: "65rem",
            borderRadius: "0.5rem",
          }}
        >
          <text>
            This uses a hybrid method consisting of a collaborative filtering
            method and a content based method. SVD is being used for
            collaborative filtering, whereas as a basic method, specifically the
            one-hot-vectors method, is being used for content based filtering.
            The weightings of the collaborative filtering and content based
            method are 0.2 and 0.8 respectively. This is because collaborative
            filtering gives a prediction rating out of 5 and the content based
            method gives a maximum similarity score of 1. Taking their ratios,
            that would be 1:5. This is why we thought it was appropriate to give
            those weightings.
          </text>
        </div>
        <div className="col-2"></div>
      </div>
      <div>
        <div class="row">
          <Box>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {top5_Movies && top5_Movies.length > 0 ? (
                top5_Movies.map((movie) => (
                  <NewMovieCard
                    key={movie.MovieID}
                    title={movie.Title}
                    genre={movie.Genres}
                    {...movie}
                    onClick={handleClick}
                    // onRating={(rating) => handleRating(movie.id, rating)}
                    rated={movie.rated}
                  />
                ))
              ) : (
                <p>No recommended movies found</p>
              )}
            </Box>
          </Box>
        </div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col-3" style={{ textAlign: "center" }}>
          <a href="/">
            <Button variant="primary">HomePage</Button>
          </a>
        </div>
        <div class="col"></div>
      </div>
      <div style={{ height: "2rem" }}></div>
      <Footer />;
    </div>
  );
}

export default UpdatedResults;
