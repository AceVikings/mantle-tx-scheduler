import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import JobBox from "./JobBox";
import logo from "../images/logo.png";
const ipcRenderer = window.require("electron").ipcRenderer;

const Navbar = (props) => {
  const { activeJob, onJobClickHandler } = props;
  const [jobCount, setCount] = useState(0);
  const [jobs, setJobs] = useState();
  const [jobInfo, setJobInfo] = useState();
  useEffect(() => {
    ipcRenderer.send("Request:Jobs");

    let event = ipcRenderer.on("Return:Jobs", (event, message) => {
      console.log(message);
      setCount(message.length);
      setJobInfo(message);
    });

    return () => {
      event.removeAllListeners("Return:Jobs");
    };
  }, []);

  useEffect(() => {
    let jobsList = [];
    for (let i = 0; i < jobCount; i++) {
      jobsList.push(
        <JobBox
          title={jobInfo[i].name}
          id={i}
          onJobClickHandler={onJobClickHandler}
        />
      );
    }
    setJobs(jobsList);
  }, [jobInfo]);

  return (
    <div className="navbar">
      <div className="logo-box">
        <img src={logo} className="navabar-logo" />
        <h1>
          Ez <span className="color-span">Scheduler</span>
        </h1>
      </div>
      {jobs}
      <JobBox title="+ New Job" id={-1} onJobClickHandler={onJobClickHandler} />
    </div>
  );
};

export default Navbar;
