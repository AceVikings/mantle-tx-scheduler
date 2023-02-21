import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
function App() {
  const [activeJob, setActiveJob] = useState(-1);
  const [activeTitle, setActiveTitle] = useState();
  const onJobClickHandler = (id, title) => {
    console.log(activeJob);
    setActiveJob(id);
    setActiveTitle(title);
  };

  // const onJobNewHandler = () => {};
  return (
    <div className="app">
      <Navbar activeJob={activeJob} onJobClickHandler={onJobClickHandler} />
      <Body activeJob={activeJob} activeTitle={activeTitle} />
    </div>
  );
}

export default App;
