import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import '../../common.css';
import './EventFiltering.css';

class EventFilter extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   topic: '', // this.props.searchCriteria.topic
    //   location: '', // this.props.searchCriteria.location
    // };
  }

  onSuggestSelect = (suggest) => {
    this.setState({ location: suggest });
  };

  onDropdownSelect = (e) => {
    this.props.updateSearch({ topic: e.target.innerText });

    // filter to the selected topic
    const events = this.props.events.data;

    if (!events) return;

    const filteredEvents = events.filter(
      (event) => event.topic === e.target.innerText
    );

    console.log('events', filteredEvents);
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
    const topic = this.props.searchTopic.topic;
    return (
      <div id="filtering-container">
        <p className="filtering-text">Showing</p>

        <DropdownButton
          id="filtering-topic-input"
          title={topic ? topic : 'Choose a topic'}
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
