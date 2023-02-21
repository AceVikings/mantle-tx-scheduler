import React from "react";
import TitleBar from "./TitleBar";
import JobSettings from "./JobSettings";
import "../styles/Body.css";
import JobView from "./JobView";
const Body = (props) => {
  const { activeJob, activeTitle } = props;
  if (activeJob !== -1) {
    return (
      <div className="body">
        <TitleBar />
        <h1>{activeTitle}</h1>
        <JobView activeJob={activeJob} />
      </div>
    );
  } else {
    return (
      <div className="body">
        <TitleBar />
        <JobSettings />
      </div>
    );
  }
};

export default Body;
