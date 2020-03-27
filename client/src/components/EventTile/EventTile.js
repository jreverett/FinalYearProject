import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import './EventTile.css';

class EventTile extends Component {
  render() {
    let event = this.props.eventDetails;

    let startDate = formatDateTime(event.start);

    // check if an image for this event exists, otherwise use the placeholder
    var thumbnail = event.images[0]
      ? 'data:image/png;base64,' + event.images[0]
      : require('../../images/event-thumb-placeholder.png');

    return (
      <Card border="primary">
        <Card.Img className="card-image" variant="top" src={thumbnail} />
        <Card.Body>
          <p className="start-time-label">{startDate}</p>
          <p className={'cost-label ' + (!event.cost ? 'free-event' : null)}>
            {event.cost ? '£' + event.cost : 'FREE!'}
          </p>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.address.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

function formatDateTime(time) {
  // convert ISO8601 datetime to string e.g "Fri, Jun 1, 18:00" update this
  return moment(time).format('h:mm a, ddd Do MMM, YYYY');
}

export default EventTile;
