import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Page/LoginPage";
import BackendPage from "./Page/BackendPage";
import MapPage from "./Page/MapPage";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/Backend" component={BackendPage} />
        <Route path="/MapPage" component={MapPage} />
      </div>
    </Router>
  );
};

export default App;
