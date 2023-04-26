import React from "react";
import IMAGES from "../photos/index.js";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <div
      class="row"
      style={{
        backgroundColor: "rgb(254, 80, 80)",
        color: "rgb(17, 24, 39)",
        height: "150px",
      }}
    >
      <div class="container text center">
        <div class="row align-items-center">
          <div class="col-3" style={{ padding: "1rem" }}>
            <ul class="">
              <li style={{ display: "inline" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://facebook.com/"
                >
                  <img
                    src={IMAGES.logoFacebook}
                    alt="Facebook icon"
                    width={50}
                    height={50}
                  />
                </a>
              </li>
              <li style={{ display: "inline" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com/"
                >
                  <img
                    src={IMAGES.logoInstagram}
                    alt="Instagram icon"
                    width={50}
                    height={50}
                  />
                </a>
              </li>
              <li style={{ display: "inline" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/"
                >
                  <img
                    src={IMAGES.logoTwitter}
                    alt="Twitter icon"
                    width={50}
                    height={50}
                  />
                </a>
              </li>
              <li style={{ display: "inline" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://whatsapp.com/"
                >
                  <img
                    src={IMAGES.logoWhatsapp}
                    alt="WhatsApp icon"
                    width={50}
                    height={50}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <table style={{ height: "100px" }}>
              <thead>
                <tr>
                  <th
                    class="top2"
                    style={{
                      fontFamily: "Addington CF Thin",
                      paddingLeft: "4%",
                      fontSize: "50px",
                    }}
                  >
                    The Outliers
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="align-middle justify-content-center"
                    style={{ fontFamily: "Addington CF" }}
                  >
                    <p class=" fs-2" style={{ paddingRight: "2rem" }}>
                      Recommender System
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-3">
            <Button
              variant="contained"
              color="inherit"
              href="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
