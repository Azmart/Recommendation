import React, { useState, useEffect } from "react";
import MovieBox from "../components/MovieBox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import "./Try.css";
import { Tabs, Tab, Box } from "@mui/material";

const API_URL = "http://localhost:5000/api/movies";
function Try() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setMovies(res.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const top20Movies = movies.top20movies || [];

  return (
    <div className="Try">
      <Header />
      <div>
        <Tabs
          //   value={value}
          //   onChange={handleChange}
          centered
          selectionFollowsFocus
          aria-label="Try It Page Tabs"
        >
          <Tab label="Top 20 Movies" />
        </Tabs>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          {top20Movies.map((movieReq) => (
            <MovieBox key={movieReq.id} {...movieReq} />
          ))}
        </Box>
      </div>

      <Footer />
    </div>
  );
}

export default Try;
