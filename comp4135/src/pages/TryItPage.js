import React from "react";
import { Tab, Tabs, Grid, Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import "./TryItPage.css";
const TryItPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="TryIt">
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Time Top-20" />
              <Tab label="Action" />
              <Tab label="Drama" />
              <Tab label="Comedy" />
              <Tab label="Romance" />
              <Tab label="Horror" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 3, bgcolor: "background.paper" }}>Tab {value + 1}</Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default TryItPage;
