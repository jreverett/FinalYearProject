import React, { Component } from 'react';
import { SubscriptionTile } from '../';
import '../../common.css';
import './SubscriptionGallery.css';

class SubscriptionGallery extends Component {
  render() {
    var subscriptions = this.props.loggedInUser.subscriptions;
    var subscriptionTiles = [];

    if (subscriptions) {
      subscriptionTiles = subscriptions.map((sub, index) => {
        return (
          <SubscriptionTile
            key={index}
            userID={this.props.loggedInUser._id}
            eventID={sub}
          />
        );
      });
    }

    return (
      <div id="subgallery-container">
        <div>{subscriptionTiles}</div>
      </div>
    );
  }
}

export default SubscriptionGallery;
