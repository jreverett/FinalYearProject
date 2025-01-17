import React, { Component } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaCalendarTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { eventService, userService } from '../../services';
import { formatDateTime } from '../../utilities';
import './SubscriptionRow.css';

class SubscriptionRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: '',
      removed: false,
    };
  }

  componentDidMount() {
    eventService.get(this.props.eventID).then((event) => {
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
      (error) => {
        toast.error(error);
      }
    );
  };

  render() {
    const { title, start, removed } = this.state;
    return (
      <div className={`table-item-container ${removed ? 'hidden' : null}`}>
        <div className="profile-tab-item-text-container">
          {title && start ? (
            <p>{`${title} @ ${formatDateTime(start)}`}</p>
          ) : (
            <p>loading...</p>
          )}
        </div>
        <div>
          <button className="icon-button" onClick={this.unsubscribe}>
            <MdDeleteForever className="row-delete-icon" size={'1.5em'} />
          </button>
        </div>
      </div>
    );
  }
}

export default SubscriptionRow;
