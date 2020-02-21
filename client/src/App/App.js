import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callAPI() {
    fetch('http://localhost:9000/.....') // TODO: test this with a working API route
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    //this.callAPI();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/event">
            <h1>Event Page</h1> // placeholder
          </Route>
          <Route path="/event-listings">
            <h1>Events Page</h1> // placeholder
          </Route>
          <Route path="/user">
            <h1>User Page</h1> // placeholder
          </Route>
          <Route path="/send-announcement">
            <h1>Announcement Page</h1> // placeholder
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
