import React, { Component } from 'react';
import { EventGallery, EventFiltering, EventSorting } from '../../components';

import { eventService } from '../../services';
import './EventListings.css';

export class EventListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {},
      modifiedEvents: {}, // stores any active filtering/sorting
    };
  }

  componentDidMount() {
    let events = eventService.get();
    events.then((eventObj) => {
      this.setState({ events: eventObj, modifiedEvents: eventObj });
    });
  }

  updateEvents = (eventData) => {
    this.setState({ modifiedEvents: eventData });
  };

  render() {
    return (
      <>
        <EventFiltering
          events={this.state.events}
          updateEvents={this.updateEvents}
          topics={this.props.topics}
          searchTitle={this.props.searchTitle}
          updateSearchTitle={this.props.updateSearchTitle}
        />
        <EventSorting
          events={this.state.modifiedEvents}
          updateEvents={this.updateEvents}
          loggedInUser={this.props.loggedInUser}
        />
        <EventGallery
          events={this.state.modifiedEvents}
          loggedInUser={this.props.loggedInUser}
        />
      </>
    );
  }
}

export default EventListings;
