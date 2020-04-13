import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { eventService, userService } from '../../services';
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
        <div>
          <p>{`${title} @ ${formatDateTime(start)}`}</p>
        </div>
        <div>
          <button
          //TODO: three dotted lines to open: SEND ACCOUNCEMENT or DELETE EVENT
          ></button>
        </div>
      </div>
    );
  }
}

export default MyEventsRow;
