import React from "react";
import IMAGES from "../photos/index.js";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(254, 80, 80)",
        paddingTop: "2rem",
        height: "7rem",
        marginTop: "auto",
      }}
    >
      <div class="row">
        <div class="col-3" style={{ textAlign: "left", paddingLeft: "3rem" }}>
          <p class="h1">The Outliers</p>
        </div>
        <div class="col-6"></div>
        <div class="col-3" style={{ paddingRight: "2rem" }}>
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
      </div>
    </div>
  );
};

export default Footer;
