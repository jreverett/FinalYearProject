import React, { Component } from 'react';
import { EventSearch } from '../../components';
import { eventService } from '../../services';
import '../../common.css';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numEvents: '',
    };
  }

  componentDidMount() {
    eventService.getEventCount().then((count) => {
      if (Number.isInteger(count.data))
        this.setState({ numEvents: count.data });
    });
  }

  render() {
    const { numEvents } = this.state;
    return (
      <div id="home-container">
        <div id="home-search-container">
          <p id="home-upper-text">Discover an amazing...</p>
          <EventSearch updateSearchTitle={this.props.updateSearchTitle} />
          {numEvents && (
            <p id="home-event-count">{numEvents} events and counting</p>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
