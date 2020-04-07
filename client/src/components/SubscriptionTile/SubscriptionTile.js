import React, { Component } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaCalendarTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { eventService, userService } from '../../services';
import { formatDateTime } from '../../utilities';
import './SubscriptionTile.css';

class SubscriptionTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: '',
      removed: false
    };
  }

  componentDidMount() {
    eventService.getEvent(this.props.eventID).then(event => {
      event = event.data;
      this.setState({ title: event.title, start: event.start });
    });
  }

  unsubscribe = () => {
    userService.unsubscribe(this.props.userID, this.props.eventID).then(
      () => {
        this.setState({ removed: true });
        toast.success(
          <p>
            <FaCalendarTimes className="form-icon" />
            Unsubscribed from {this.state.title}
          </p>
        );
      },
      error => {
        toast.error(error);
      }
    );
  };

  render() {
    const { title, start, removed } = this.state;
    return (
      <div
        className={`subscription-tile-container ${removed ? 'hidden' : null}`}
      >
        <div className="subscription-tile-text-container">
          <p className="subscription-tile-text">{`${title} @ ${formatDateTime(
            start
          )}`}</p>
        </div>
        <div className="subscription-tile-button-container">
          <button
            className="button-cancel-subscription"
            onClick={this.unsubscribe}
          >
            <MdDeleteForever
              className="subscription-tile-icon"
              size={'1.5em'}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default SubscriptionTile;
