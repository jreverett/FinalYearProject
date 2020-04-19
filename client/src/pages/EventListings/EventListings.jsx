import React, { Component } from 'react';
import { EventGallery, EventSorting } from '../../components';

import { eventService } from '../../services';
import './EventListings.css';

export class EventListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {},
    };
  }

  componentDidMount() {
    let events = eventService.getEvents();
    events.then((eventObj) => {
      this.setState({ events: eventObj });
    });
  }

  updateEvents = (eventData) => {
    this.setState({ events: eventData });
  };

  render() {
    return (
      <>
        {/* <EventFilter> */}
        <EventSorting
          events={this.state.events}
          updateEvents={this.updateEvents}
          loggedInUser={this.props.loggedInUser}
        />
        <EventGallery
          events={this.state.events}
          loggedInUser={this.props.loggedInUser}
        />
      </>
    );
  }
}

export default EventListings;
