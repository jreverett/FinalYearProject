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
  };

  onSuggestChange = (e) => {
    // location box cleared so fetch all events
    if (e === '') {
      return this.props.updateSearch(null, 'All');
    }
  };

  onDropdownSelect = (e) => {
    const topic = e.target.innerText;
    this.props.updateSearch(topic, null);
  };

  componentDidUpdate(prevProps) {
    const geocoder = new google.maps.Geocoder();
    const events = this.props.events.data;
    const { searchTopic, searchLocation } = this.props;
    let filteredEvents = events;

    // if filters haven't changed, just return
    if (
      prevProps.searchTopic === searchTopic &&
      prevProps.searchLocation === searchLocation
    )
      return;

    // FILTER BY TOPIC
    if (searchTopic) {
      // no filtering should be performed if 'ALL' is selected
      if (searchTopic !== 'All') {
        filteredEvents = events.filter((event) => event.topic === searchTopic);
      }
    }

    // FILTER BY LOCATION
    if (searchLocation) {
      if (searchLocation !== 'All') {
        geocoder.geocode(
          { address: searchLocation.description },
          (res, status) => {
            if (status === 'OK') {
              // return events inside the location bounds
              filteredEvents = filteredEvents.filter((event) => {
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
          }
        );
      }
    }

    return this.props.updateEvents({ data: filteredEvents });
  }

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
        <p id="filtering-showing-text" className="filtering-text">
          Showing
        </p>

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
          onChange={this.onSuggestChange}
          onSuggestSelect={this.onSuggestSelect}
        />
      </div>
    );
  }
}

export default EventFilter;
