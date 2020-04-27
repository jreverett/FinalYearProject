import React, { Component } from 'react';
import { SubscriptionRow } from '..';
import '../../common.css';
import './SubscriptionTable.css';

class SubscriptionTable extends Component {
  render() {
    var subscriptions = this.props.loggedInUser.subscriptions;
    var subscriptionRows = [];

    if (subscriptions) {
      subscriptionRows = subscriptions.map((sub, index) => {
        return (
          <SubscriptionRow
            key={index}
            userID={this.props.loggedInUser._id}
            eventID={sub}
          />
        );
      });
    }

    return (
      <div className="table-container">
        <div>{subscriptionRows}</div>
      </div>
    );
  }
}

export default SubscriptionTable;
