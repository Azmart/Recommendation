import React from "react";
import "./HomePage.css";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
function HomePage() {
  const styles1 = {
    height: "70rem",
    backgroundSize: "cover",
    backgroundImage:
      "linear-gradient(rgba(221, 139, 7, 0.8), rgba(201, 164, 14, 0.4)), url('https://images.unsplash.com/photo-1620013000843-31252842d370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHw3fHxSZWNvbW1lbmRlciUyMFN5c3RlbSUyMGZvciUyME1vdmllc3xlbnwwfHx8fDE2Nzg1MzE4MjI&ixlib=rb-4.0.3&q=80&w=1080')",
  };
  return (
    <div>
      <Header />

      <div class="bg-image" style={styles1}>
        <div class="container text-center">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <p class="top1">
                Hong Kong's Movie Matchmaker: Recommender System Launches
              </p>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <p class="top2">
                Outliers is revolutionizing the way Hong Kongers watch movies.
                With our smart recommender system, we make it easier to find the
                perfect movie to watch at anytime. Our service uses your
                existing movie tastes to provide personalized movie
                recommendations tailored to your preferences. Outliers will find
                the perfect movie match for you whether you're looking for an
                action-packed thriller or romance with your partner or a comedy
                to lighten your mood.
              </p>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div class="container" style={{ paddingTop: "1rem" }}>
          <div class="row">
            <div class="col"></div>
            <div class="col-3">
              <a href="/sample-try" target="_blank">
                <Button variant="primary" id="try-it">
                  Try It
                </Button>
              </a>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>

      <div id="about" style={{ fontFamily: "Addington CF Thin" }}>
        <div class="display-3" style={{ textAlign: "left" }}>
          <p>Our Services</p>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div
            class="col"
            style={{
              padding: "1rem 2rem 0 0",
              backgroundColor: "rgb(254, 80, 80)",
            }}
          >
            <div class="card h-50">
              <div class="card-body">
                <h5 class="card-title h1">Content Based Recommendation</h5>
                <p class="card-text h3">
                  A Recommender System that uses the information of a user's
                  past ratings and choices to suggest similar items.
                </p>
              </div>
              <div class="card-footer">
                <button class="btn btn-dark btn-lg">More Info</button>
              </div>
            </div>
          </div>
          <div
            class="col"
            style={{
              padding: "1rem 2rem 0 1rem",
              backgroundColor: "rgb(254, 80, 80)",
            }}
          >
            <div class=" card h-50">
              <div class="card-body">
                <h5 class="card-title h1">Collaborative Filtering</h5>
                <p class="card-text h3">
                  A Recommender System that uses the ratings and choices of
                  other users to suggest items to the user.
                </p>
              </div>
              <div class="card-footer">
                <button class="btn btn-dark btn-lg">More Info</button>
              </div>
            </div>
          </div>
          <div
            class="col"
            style={{
              paddingRight: "1rem",
              paddingTop: "1rem",
              backgroundColor: "rgb(254, 80, 80)",
            }}
          >
            <div class="card h-50">
              <div class="card-body">
                <h5 class="card-title h1">Hybrid Systems</h5>
                <p class="card-text h3">
                  A Recommender System that combines both content based and
                  collaborative filtering techniques to provide the most
                  accurate recommendations.
                </p>
              </div>
              <div class="card-footer">
                <button class="btn btn-dark btn-lg">More Info</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="past" style={{ fontFamily: "Addington CF Thin" }}>
        <div class="row" style={{ paddingTop: "3rem", paddingLeft: "4rem" }}>
          <div class="col-8 h1">
            <figure>
              <blockquote class="blockquote">
                <p style={{ fontSize: "2rem", textAlign: "left" }}>
                  Outliers recommendations has been a lifesaver for me. Their
                  Recommender System for Movies is the best I have ever seen.
                  Every time I use it, I get amazing movie recommendations that
                  are exactly suited to my tastes. In Love with it.😍😍
                </p>
              </blockquote>
              <figcaption class="blockquote-footer">
                <cite title="Source Title">Mui Sze</cite>
              </figcaption>
            </figure>
          </div>
          <div class="col"></div>
        </div>
      </div>

      <div id="aboutUs">
        <div class="display-4">
          <p>About Us</p>
        </div>
        <div>
          <p style={{ fontSize: "2rem" }}>
            We are a team of 3 who worked day and night to finish this group
            project of COMP4135. We put our sweat and heart into making this
            Movie Recommender System.
          </p>
        </div>
        <div>
          <ol
            class="list-group list-group-numbered"
            style={{ display: "inline-flex" }}
          >
            <li class="list-group-item">Martas</li>
            <li class="list-group-item">Akib</li>
            <li class="list-group-item">Enzo</li>
          </ol>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
