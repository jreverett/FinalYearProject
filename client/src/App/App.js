import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Signup } from '../pages/index';
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
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
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
