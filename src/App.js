import React, { Component } from "react";

import './App.css';
import About from './components/pages/about/about'
import Images from './components/pages/images/images'
import Weather from './components/pages/weather/weather'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <Router>

      <Switch>
      <Route exact path="/">
      <About />
      </Route>
      <Route path="/images">
        <Images />
      </Route>
      <Route path="/weather">
        <Weather />
      </Route>
    </Switch>
    </Router>

    );
  }
}
