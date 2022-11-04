import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "10px",
          cursor: "pointer",
          listStyle: "none",
        }}
      >
        <Link href="/">
          <h1>Home</h1>
        </Link>
        <Link href="/posts">
          <li>Blogs</li>
        </Link>
        <li>About</li>
        <li>About</li>
        <li>About</li>
        <li>About</li>
        <li>About</li>
      </ul>
    </>
  );
};

export default NavBar;
