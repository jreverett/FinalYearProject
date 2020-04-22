import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import '../../common.css';
import './EventFiltering.css';

const google = window.google;

class EventFilter extends Component {
  constructor(props) {
    super(props);
  }

  onSuggestSelect = (suggest) => {
    this.props.updateSearch(null, suggest);

    const events = this.props.events.data;
    if (!events) return;

    // return all events (i.e. no filtering)
    if (!suggest) return;

    let filteredEvents;
    let geocoder = new google.maps.Geocoder();

    // get geocoded bounds for the selected location
    geocoder.geocode({ address: suggest.description }, (res, status) => {
      if (status === 'OK') {
        // return events inside the bounds
        filteredEvents = events.filter((event) => {
          var latLng = new google.maps.LatLng(
            event.address.location.lat,
            event.address.location.lng
          );
          return res[0].geometry.bounds.contains(latLng);
        });
      } else {
        alert('Error filtering by location');
        console.log(
          'Geocode was not successful for the following reason: ' + status
        );
      }

      return this.props.updateEvents({ data: filteredEvents });
    });
  };

  onDropdownSelect = (e) => {
    const topic = e.target.innerText;
    this.props.updateSearch(topic, null);

    const events = this.props.events.data;
    if (!events) return;

    // return all events (i.e. no filtering)
    if (topic === 'All') {
      return this.props.updateEvents({ data: events });
    }

    // else return filtered events by topic
    const filteredEvents = events.filter((event) => event.topic === topic);

    this.props.updateEvents({ data: filteredEvents });
  };

  createSelectItems = () => {
    const topics = this.props.topics;
    let options = [];

    for (let i = 0; i < topics.length; i++) {
      options.push(
        <Dropdown.Item key={topics[i]._id} onClick={this.onDropdownSelect}>
          {topics[i].name}
        </Dropdown.Item>
      );
    }

    return options;
  };

  render() {
    const topic = this.props.searchTopic;
    return (
      <div id="filtering-container">
        <p className="filtering-text">Showing</p>

        <DropdownButton
          id="filtering-topic-input"
          title={topic ? topic : 'All'}
        >
          <Dropdown.Item onClick={this.onDropdownSelect}>All</Dropdown.Item>
          {this.createSelectItems()}
        </DropdownButton>

        <p className="filtering-text">events in</p>

        <Geosuggest
          id="filtering-location-input"
          // initialValue="London" // TODO: this.props.location if set
          placeholder="Anywhere"
          onSuggestSelect={this.onSuggestSelect}
        />
      </div>
    );
  }
}

export default EventFilter;
