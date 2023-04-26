import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const API_IMG = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ title, id, vote_average }) => {
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

  const [overview, setOverview] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=f144460d4d13237bbb975926f9534dea&language=en-US"
      )
      .then((res) => {
        setOverview(res.data.overview);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>{overview}</Popover.Body>
    </Popover>
  );

  return (
    <Card style={{ width: "20rem", margin: "1rem" }}>
      <Card.Img variant="top" src={API_IMG + poster_path} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Average Rating: {vote_average}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Genres</Card.Link>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Card.Link href="#">Overview</Card.Link>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
