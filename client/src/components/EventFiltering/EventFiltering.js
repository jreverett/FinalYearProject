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
    const topic = e.target.innerText;
    this.props.updateSearch({ topic: topic });

    const events = this.props.events.data;
    if (!events) return;

    // return all events (i.e. no filtering)
    if (topic === 'All') {
      return this.props.updateEvents({ data: events });
    }

    // return filtered events by topic
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
    const topic = this.props.searchTopic.topic;
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
