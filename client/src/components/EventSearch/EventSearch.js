import React, { Component } from 'react';
import Typist from 'react-typist';
import { getRandomNoRepeats } from '../../utilities';
import '../../../node_modules/react-typist/dist/Typist.css';
import '../../common.css';
import './EventSearch.css';

class EventSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchFocused: false,
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearchFocus = () => {
    this.setState({ searchFocused: true });
  };

  handleSearchBlur = () => {
    this.setState({ searchFocused: false });
  };

  render() {
    const { searchValue, searchFocused } = this.state;

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
      searches.push(<Typist.Backspace count={search.length} delay={2000} />);
    }

    return (
      <div id="event-search-container">
        <label id="event-search-label">
          <input
            id="event-search-input"
            className="event-search-text"
            value={searchValue}
            onChange={this.handleSearchChange}
            onFocus={this.handleSearchFocus}
            onBlur={this.handleSearchBlur}
          />

          {/* Overlay should only be visible before the textboxt is focused */}
          {!searchFocused && (
            <span id="event-search-input-overlay" className="event-search-text">
              <Typist
                cursor={{
                  hideWhenDone: true,
                }}
              >
                {searches}
              </Typist>
            </span>
          )}
        </label>
      </div>
    );
  }
}

export default EventSearch;
