import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center" }}>
      <p>
        &copy;
        <a href="#">Yato_WordPress</a>
        <span> {new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
