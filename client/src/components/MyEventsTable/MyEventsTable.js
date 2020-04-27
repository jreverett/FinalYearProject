import React, { Component } from 'react';
import { MyEventsRow } from '..';
import '../../common.css';
import './MyEventsTable.css';

class MyEvents extends Component {
  render() {
    var ownedEvents = this.props.loggedInUser.ownedEvents;
    var ownedEventItems = [];

    if (ownedEvents) {
      ownedEventItems = ownedEvents.map((event, index) => {
        return (
          <MyEventsRow
            key={index}
            userID={this.props.loggedInUser._id}
            eventID={event}
          />
        );
      });
    }
    return (
      <div className="table-container">
        <div>{ownedEventItems}</div>
      </div>
    );
  }
}

export default MyEvents;
