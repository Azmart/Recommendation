import React, { useState, useEffect } from "react";
import axios from "axios";
const API_IMG = "https://image.tmdb.org/t/p/w500";

const MovieBox = ({ title, id, vote_average, release_date, overview }) => {
  const [poster_path, setPoster_path] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=f144460d4d13237bbb975926f9534dea&language=en-US"
      )
      .then((res) => {
        setPoster_path(res.data.poster_path);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <img src={API_IMG + poster_path} alt={title} />
      <p>{vote_average}</p>
      <p>{release_date}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MovieBox;
