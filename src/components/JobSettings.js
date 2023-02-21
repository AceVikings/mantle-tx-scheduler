import React, { useState } from "react";
import "../styles/Jobs.css";
const ipcRenderer = window.require("electron").ipcRenderer;

const JobSettings = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    abi: "",
    params: "",
    cron: "",
    pvkey: "",
  });

  const create = () => {
    // ipcRenderer.send("Create:Job", [
    //   "0x1d594c3c5018DF2a468C97EE18d019dD85eEd614",
    //   "function name() view returns (string memory)",
    //   "* * * * *",
    // ]);
    ipcRenderer.send("Create:Job", [
      form.address,
      form.abi,
      form.cron,
      form.params,
      form.name,
      form.pvkey,
    ]);
  };

  const handleChange = (event) => {
    setForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
    console.log(form);
  };
  return (
    <>
      <h1>New Job</h1>
      <form className="new-job-form">
        <label htmlFor="name">
          Name
          <input name="name" placeholder="mint" onChange={handleChange}></input>
        </label>
        <label htmlFor="address">
          Contract
          <input
            name="address"
            placeholder="0x"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="abi">
          ABI
          <input
            name="abi"
            placeholder="function foo(address bar,uint amount)"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="params">
          Params
          <input
            name="params"
            placeholder="0x,123"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="cron">
          Cron
          <input
            name="cron"
            placeholder="* * * * *"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="pvkey">
          Private Key
          <input
            name="pvkey"
            placeholder="0x"
            onChange={handleChange}
            type="password"
          ></input>
        </label>
      </form>

      <div className="job-submit-button" onClick={create}>
        Create Job
      </div>
    </>
  );
};

export default JobSettings;
