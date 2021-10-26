import React from "react";
import HomePage from "./home/HomePage";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
