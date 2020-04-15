import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';
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
      show: false
    };
  }

  componentDidMount() {
    eventService.getEvent(this.props.eventID).then(event => {
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
        eventID: this.props.eventID
      }
    });
  };

  deleteEvent = () => {
    this.setState({ show: false });
    // TODO: Delete event and send announcement to any subscribers (and the former event owner)
    alert('coming soon...');
  };

  render() {
    const { title, start, removed } = this.state;
    return (
      <>
        <div
          className={`profile-tab-item-container ${removed ? 'hidden' : null}`}
        >
          <div className="profile-tab-item-text-container">
            <p>{`${title} @ ${formatDateTime(start)}`}</p>
          </div>
          <div>
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
        </div>
        <ConfirmationModal
          show={this.state.show}
          title="Confirm Event Deletion?"
          body="This action cannot be reversed and will result in your event being removed immediately.
          An announcment will be sent to anyone subscribed to this event notifying them of the event removal."
          onClose={this.toggleConfirmationModal}
          onConfirm={this.deleteEvent}
        />
      </>
    );
  }
}

export default withRouter(MyEventsRow);
