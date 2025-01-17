import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { formatCost, formatDateTime } from '../../utilities';
import { EventModal } from '../index';
import './EventTile.css';

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const event = this.props.eventDetails;

    const startDate = formatDateTime(event.start);
    const cost = formatCost(event.cost);

    // check if an image for this event exists, otherwise use the placeholder
    var thumbnail = event.images[0]
      ? 'data:image/png;base64,' + event.images[0]
      : require('../../images/event-thumb-placeholder.png');

    return (
      <Fragment>
        <Card
          className="event-gallery-masonry-brick"
          border="primary"
          onClick={this.toggleModal}
        >
          <Card.Img className="card-image" variant="top" src={thumbnail} />
          <Card.Body>
            <p className="start-time-label">{startDate}</p>
            <p className={'cost-label ' + (!cost ? 'free-event' : null)}>
              {cost ? '£' + cost : 'FREE!'}
            </p>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.address.description}</Card.Text>
          </Card.Body>
        </Card>

        <EventModal
          show={this.state.show}
          toggleModal={this.toggleModal}
          eventDetails={this.props.eventDetails}
          loggedInUser={this.props.loggedInUser}
        />
      </Fragment>
    );
  }
}

export default EventTile;
