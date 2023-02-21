import React from "react";

const JobBox = (props) => {
  const { title, id, onJobClickHandler } = props;
  return (
    <div
      className="jobbox"
      onClick={() => {
        console.log("Here");
        console.log(onJobClickHandler);
        onJobClickHandler(id, title);
      }}
    >
      {title}
    </div>
  );
};

export default JobBox;
