import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Rate from "./Rate";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const API_IMG = "https://image.tmdb.org/t/p/w500";

const NewMovieCard = ({ title, genre, tmdbID, vote_average, onRating }) => {
  const [poster_path, setPoster_path] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          tmdbID +
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
          tmdbID +
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
      <Popover.Header as="h3">Movie Overview</Popover.Header>
      <Popover.Body>{overview}</Popover.Body>
    </Popover>
  );

  const popover2 = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Movie Genres</Popover.Header>
      <Popover.Body>
        {Array.isArray(genre) ? genre.join(", ") : genre}
      </Popover.Body>
    </Popover>
  );

  const [rating, SetRating] = useState(0);

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
        <OverlayTrigger trigger="click" placement="right" overlay={popover2}>
          <Card.Link href="#">Genres</Card.Link>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Card.Link href="#">Overview</Card.Link>
        </OverlayTrigger>
      </Card.Body>
      <p>Your rating for this recommended movie:</p>
      <div>
        <div className="col-2"></div>
        <div className="col-8">
          <Rate
            rating={rating}
            onRating={(rate) => {
              SetRating(rate);
              onRating(rate);
            }}
            count={5}
          />
        </div>
        <div className="col-2"></div>
      </div>
      <p>Rating - {rating}</p>
    </Card>
  );
};

export default NewMovieCard;
