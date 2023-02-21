import React, { useState, useEffect } from "react";
import "../styles/Jobs.css";
const ipcRenderer = window.require("electron").ipcRenderer;

const JobView = (props) => {
  const { id } = props;
  const [data, setData] = useState();

  useEffect(() => {
    ipcRenderer.send("Request:JobInfo", [id]);
    let event = ipcRenderer.on("Return:JobInfo", (event, message) => {
      if (message[0] === id) {
        setData(message[1]);
      }
    });
    return () => {
      event.removeAllListeners("Return:JobInfo");
    };
  }, []);

  return (
    <>
      <div className="job-view">
        <h3>{`Contract: ${data.address}`}</h3>
        <h3>{`ABI: ${data.abi}`}</h3>
        <h3>{`Params: ${data.params}`}</h3>
        <h3>{`Cron: ${data.expression}`}</h3>
      </div>
      <div className="job-submit-button">Stop Job</div>
    </>
  );
};

export default JobView;
