import React from "react";

const Genres = (props) => {
  return (
    <div
      className={`genre-tile ${props.selected ? "selected" : ""}`}
      onClick={props.onClick}
    >
      {props.name}
    </div>
  );
};

export default Genres;
