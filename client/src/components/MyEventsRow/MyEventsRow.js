import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';
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
      removed: false
    };
  }

  componentDidMount() {
    eventService.getEvent(this.props.eventID).then(event => {
      event = event.data;
      this.setState({ title: event.title, start: event.start });
    });
  }

  render() {
    const { title, start, removed } = this.state;
    return (
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
            <NavDropdown.Item href="#action/3.1">
              Send Announcement
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" style={{ color: 'red' }}>
              Delete Event
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    );
  }
}

export default MyEventsRow;
