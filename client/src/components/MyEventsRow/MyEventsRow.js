import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../';
import { eventService } from '../../services';
import { formatDateTime } from '../../utilities';
import '../../common.css';
import './MyEventsRow.css';

class MyEventsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: '',
      removed: false,
      show: false,
    };
  }

  componentDidMount() {
    eventService.get(this.props.eventID).then((event) => {
      event = event.data;
      this.setState({ title: event.title, start: event.start });
    });
  }

  toggleConfirmationModal = () => {
    this.setState({ show: !this.state.show });
  };

  sendAnnouncement = () => {
    this.props.history.push({
      pathname: '/send-announcement',
      state: {
        eventID: this.props.eventID,
      },
    });
  };

  deleteEvent = (eventID, title) => {
    this.setState({ show: false });
    eventService.deleteEvent(eventID, this.props.userID).then(
      () => {
        this.setState({ removed: true });
        toast.success(
          <p>
            <MdDeleteForever className="form-icon" />
            Deleted event: {title}
          </p>
        );
      },
      (error) => toast.error(error)
    );
  };

  render() {
    const { title, start, removed } = this.state;
    const { eventID } = this.props;
    return (
      <>
        <div
          id="eventrow-container"
          className={`table-item-container ${removed ? 'hidden' : null}`}
        >
          <div className="profile-tab-item-text-container">
            {title && start ? (
              <p>{`${title} @ ${formatDateTime(start)}`}</p>
            ) : (
              <p>loading...</p>
            )}
          </div>
          <NavDropdown
            className="eventrow-event-dropdown"
            title={<FaEllipsisH size={'1.5em'} />}
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item onClick={this.sendAnnouncement}>
              Send Announcement
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={this.toggleConfirmationModal}
              className="eventrow-event-dropdown-delete"
            >
              Delete Event
            </NavDropdown.Item>
          </NavDropdown>
        </div>

        <ConfirmationModal
          show={this.state.show}
          title="Confirm Event Deletion?"
          body="This action cannot be reversed and will result in your event being removed immediately.
          An announcement will be sent to anyone subscribed to this event notifying them of the event removal."
          onClose={this.toggleConfirmationModal}
          onConfirm={() => this.deleteEvent(eventID, title)}
        />
      </>
    );
  }
}

export default withRouter(MyEventsRow);
