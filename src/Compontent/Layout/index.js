import Footer from "Compontent/Footer";
import NavBar from "Compontent/Navbar";
import React from "react";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
