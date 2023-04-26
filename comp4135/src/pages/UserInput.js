import React from "react";
import { Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Select from "react-select";
import "./UserInput.css";

function UserInput() {
  // state to keep track of selected genres
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  // function to handle genre selection
  const handleGenreSelection = (selectedOption) => {
    //check if genre is already selected
    if (
      selectedGenres.find(
        (genre) =>
          genre.value === selectedOption.value &&
          genre.label === selectedOption.label
      )
    ) {
      //if it is, remove it from the list
      return;
    }
    if (selectedGenres.length >= 6) {
      alert("You can only select upto 6 genres");
      return;
    }
    setSelectedGenres([...selectedGenres, selectedOption]);
  };

  const handleGenreDeselection = (selectedOption) => {
    setSelectedGenres(
      selectedGenres.filter(
        (genre) =>
          genre.value !== selectedOption.value ||
          genre.label !== selectedOption.label
      )
    );
  };

  // function to handle Get Recommendations button click
  const handleGetRecommendations = () => {
    //Check if user has selected between 3 and 5 genres
    if (selectedGenres.length >= 3 && selectedGenres.length <= 6) {
      //if they have, send them to the backend
      fetch("/api/userinput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedGenres),
      })
        .then((response) => {
          //if the response is successful, send them to the results page
          if (response.status === 200) {
            window.location.href = "/new-results";
            console.log("success");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      //if they haven't, display an error message
      alert("Please select between 3 and 6 genres");
    }
  };

  const options = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "romance", label: "Romance" },
    { value: "sci-fi", label: "Sci-Fi" },
    { value: "thriller", label: "Thriller" },
    { value: "fiction", label: "Fiction" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "crime", label: "Crime" },
    { value: "animation", label: "Animation" },
    { value: "family", label: "Family" },
    { value: "musical", label: "Musical" },
    { value: "war", label: "War" },
    { value: "history", label: "Historical" },
    { value: "sport", label: "Sport" },
  ];

  return (
    <div className="NewUserInput">
      <Header />
      <div>
        <h3 style={{ textAlign: "center" }}>
          Hello! Please select your prefered genres✌️
        </h3>
      </div>
      <div
        className="genre-container"
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <Select
          options={options}
          onChange={handleGenreSelection}
          placeholder="Search for a genre..."
          isClearable={false}
          isSearchable={true}
        />
        <div className="selected-genres">
          {selectedGenres.map((genre) => (
            <div
              key={`${genre.value}-${genre.label}`}
              className="genre"
              onClick={() => handleGenreDeselection(genre)}
            >
              {genre.label}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          height: "2rem",
        }}
      ></div>
      <div class="row">
        <div class="col"></div>
        <div class="col-3" style={{ textAlign: "center" }}>
          <Button
            variant="success"
            id="get-it"
            onClick={handleGetRecommendations}
          >
            Get Recommendations
          </Button>
        </div>
        <div class="col"></div>
      </div>
      <div style={{ height: "2rem" }}></div>
      <Footer />
    </div>
  );
}

export default UserInput;
