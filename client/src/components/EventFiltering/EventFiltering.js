import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import { haversineDistance } from '../../utilities';
import '../../common.css';
import './EventFiltering.css';

const google = window.google;

class EventFiltering extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: false,
      searchTopic: '',
      searchLocation: '',
      showCursor: true,
    };
  }

  componentDidMount() {
    // filter events if a title filter has been set (from EventSearch.js)
    if (this.props.searchTitle) {
      this.filterEvents();
    }

    this.interval = setInterval(
      () => this.setState({ showCursor: !this.state.showCursor }),
      600
    );
  }

  componentDidUpdate() {
    this.filterEvents();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSuggestSelect = (suggest) => {
    this.setState(
      { searchLocation: suggest, filtered: false },
      this.filterEvents
    );
  };

  handleSuggestChange = (e) => {
    // location box cleared so fetch all events
    if (e === '') {
      this.setState(
        { searchLocation: 'All', filtered: false },
        this.filterEvents
      );
    }
  };

  handleDropdownSelect = (e) => {
    const topic = e.target.innerText;
    this.setState({ searchTopic: topic, filtered: false }, this.filterEvents);
  };

  handleTitleSearchChange = (e) => {
    this.props.updateSearchTitle(e.target.value);
    this.setState({ filtered: false });
  };

  filterEvents() {
    const geocoder = new google.maps.Geocoder();
    const events = this.props.events.data;
    const searchTitle = this.props.searchTitle;
    const { searchTopic, searchLocation, filtered } = this.state;
    let filteredEvents = events;

    // return if there are no events to filter, or this set has already been filtered
    if (!events || filtered) return;

    // FILTER BY TOPIC
    if (searchTopic) {
      // no filtering should be performed if 'All' is selected
      if (searchTopic !== 'All') {
        filteredEvents = filteredEvents.filter(
          (event) => event.topic === searchTopic
        );
      }
    }

    // FILTER BY TITLE
    if (searchTitle) {
      filteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
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

                // if search location has bounds, use them...
                if (res[0].geometry.bounds) {
                  return res[0].geometry.bounds.contains(latLng);
                } else {
                  // otherwise check a 5km radius around the lat/long co-ords
                  const resLocation = res[0].geometry.location;
                  const eventLocation = event.address.location;

                  return (
                    haversineDistance(
                      resLocation.lat(),
                      resLocation.lng(),
                      eventLocation.lat,
                      eventLocation.lng
                    ) <= 5
                  );
                }
              });
            } else {
              alert('Error filtering by location');
              console.log(
                'Geocode was not successful for the following reason: ' + status
              );
            }
            this.setState({ filtered: true });
            return this.props.updateEvents({ data: filteredEvents });
          }
        );
      }
    }

    this.setState({ filtered: true });
    return this.props.updateEvents({ data: filteredEvents });
  }

  createSelectItems = () => {
    const topics = this.props.topics;
    let options = [];

    for (let i = 0; i < topics.length; i++) {
      options.push(
        <Dropdown.Item key={topics[i]._id} onClick={this.handleDropdownSelect}>
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

        {/* TOPIC FILTER */}
        <DropdownButton
          id="filtering-topic-input"
          title={topic ? topic : 'All'}
        >
          <Dropdown.Item onClick={this.handleDropdownSelect}>All</Dropdown.Item>
          {this.createSelectItems()}
        </DropdownButton>

        <p className="filtering-text">events in</p>

        {/* LOCATION FILTER */}
        <Geosuggest
          id="filtering-location-input"
          placeholder={this.state.showCursor ? 'Anywhere|' : 'Anywhere'}
          onChange={this.handleSuggestChange}
          onSuggestSelect={this.handleSuggestSelect}
        />

        <p className="filtering-text">containing</p>

        {/* TITLE FILTER */}
        <input
          id="filtering-title-input"
          type="text"
          placeholder={this.state.showCursor ? 'Anything|' : 'Anything'}
          value={this.props.searchTitle}
          onChange={this.handleTitleSearchChange}
        ></input>
      </div>
    );
  }
}

export default EventFiltering;
