import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';

import { EventTile } from '../index';
import './EventGallery.css';

class EventGallery extends Component {
  render() {
    var events = this.props.events.data;
    var eventTiles = [];

    if (events) {
      eventTiles = events.map(function(event, index) {
        return <EventTile key={index} eventDetails={event} />;
      });
    }

    return <CardColumns className="card-column">{eventTiles}</CardColumns>;
  }
}

export default EventGallery;
