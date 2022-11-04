import Footer from "Compontent/Footer";
import NavBar from "Compontent/Navbar";
import React from "react";

const Layout = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
