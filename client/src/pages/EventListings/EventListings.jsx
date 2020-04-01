import React, { Component } from 'react';
import { EventGallery } from '../../components';

import { eventService } from '../../services';
import './EventListings.css';

export class EventListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {}
    };
  }

  componentDidMount() {
    let events = eventService.getEvents();
    events.then(eventData => {
      this.setState({ events: eventData });
    });
  }

  render() {
    return (
      <div>
        {/* <EventFilter> */}
        {/* <EventOrdering> */}
        <EventGallery
          events={this.state.events}
          loggedInUser={this.props.loggedInUser}
        />
      </div>
    );
  }
}

export default EventListings;
