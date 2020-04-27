import React, { Component } from 'react';

import { EventTile } from '../index';
import './EventGallery.css';

class EventGallery extends Component {
  render() {
    var events = this.props.events.data;
    var eventTiles = [];

    if (events) {
      eventTiles = events.map((event, index) => {
        return (
          <EventTile
            key={index}
            eventDetails={event}
            loggedInUser={this.props.loggedInUser}
          />
        );
      });
    }

    return <div className="event-gallery-masonry">{eventTiles}</div>;
  }
}

export default EventGallery;
