import React, { useState, useEffect } from "react";
import "../styles/Jobs.css";
const ipcRenderer = window.require("electron").ipcRenderer;

const JobView = (props) => {
  const { activeJob } = props;
  const [data, setData] = useState();

  useEffect(() => {
    ipcRenderer.send("Request:JobInfo", [activeJob]);
    console.log(activeJob);
    let event = ipcRenderer.on("Return:JobInfo", (event, message) => {
      console.log(message);
      if (message[0] === activeJob) {
        setData(message[1]);
      }
    });
    return () => {
      event.removeAllListeners("Return:JobInfo");
    };
  }, []);

  return (
    <>
      {data && (
        <>
          <div className="job-view">
            <h3>{`Contract: ${data.address}`}</h3>
            <h3>{`ABI: ${data.abi}`}</h3>
            <h3>{`Params: ${data.params}`}</h3>
            <h3>{`Cron: ${data.expression}`}</h3>
          </div>
          <div className="job-submit-button">Stop Job</div>
        </>
      )}
    </>
  );
};

export default JobView;
