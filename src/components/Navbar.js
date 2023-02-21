import React from "react";
import "../styles/Navbar.css";
import JobBox from "./JobBox";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Ez Scheduler</h1>
      <JobBox />
    </div>
  );
};

export default Navbar;
