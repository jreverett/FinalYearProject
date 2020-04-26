import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Typist from 'react-typist';
import { getRandomNoRepeats } from '../../utilities';
import '../../../node_modules/react-typist/dist/Typist.css';
import '../../common.css';
import './EventSearch.css';

class EventSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTitleValue: '',
      searchFocused: false,
      submitted: false,
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTitleValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateSearchTitle(this.state.searchTitleValue.trim());
    this.setState({ submitted: true });
  };

  handleSearchFocus = () => {
    this.setState({ searchFocused: true });
  };

  handleSearchBlur = () => {
    if (!this.state.searchTitleValue) {
      this.setState({ searchFocused: false });
    }
  };

  render() {
    const { searchTitleValue, searchFocused, submitted } = this.state;

    const exampleSearches = [
      'Pub Quiz',
      'Music Event',
      'Game Night',
      'Dance Class',
      'Art Class',
      'Movie Night',
      'Football Match',
    ];

    var selectSearch = getRandomNoRepeats(exampleSearches);
    var searches = [];

    for (let i = 0; i < exampleSearches.length; i++) {
      const search = selectSearch();
      searches.push(search);
      searches.push(
        <Typist.Backspace key={i} count={search.length} delay={2000} />
      );
    }

    return (
      <>
        <form id="event-search-container" onSubmit={this.handleSubmit}>
          <label id="event-search-label">
            <input
              id="event-search-input"
              className="event-search-text"
              value={searchTitleValue}
              onChange={this.handleSearchChange}
              onFocus={this.handleSearchFocus}
              onBlur={this.handleSearchBlur}
            />

            {/* Overlay should only be visible before the textboxt is focused */}
            {!searchFocused && (
              <span
                id="event-search-input-overlay"
                className="event-search-text"
              >
                <Typist>
                  {searches}
                  Upvent Event
                </Typist>
              </span>
            )}
          </label>
        </form>

        {submitted && (
          <Redirect
            to={{
              pathname: '/event-listings',
              state: { from: '/' },
            }}
          />
        )}
      </>
    );
  }
}

export default EventSearch;
