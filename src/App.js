import "./App.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light"); // Wheter dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      showAlert("Dark mode has been enabled", "success");
      document.title = 'TextUtils - Dark Mode'
    } else {
      setMode("light")
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = 'TextUtils - Light Mode'
    };
  };
  return (
    <>
      {/* <Router> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container">
        <TextForm heading="Enter the text to analyze below" mode={mode} showAlert={showAlert} />
      </div>
      {/* </Router> */}
    </>
  );
}

export default App;
