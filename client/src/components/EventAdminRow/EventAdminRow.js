import React, { Component } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { userService, eventService } from '../../services';
import { formatDateTime } from '../../utilities';
import '../../common.css';
import './EventAdminRow.css';

class EventAdminRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerFullName: '',
      removed: false,
    };
  }

  componentDidMount() {
    userService.get(this.props.event.owner).then((user) => {
      user = user.data;
      this.setState({ ownerFullName: `${user.firstname} ${user.lastname}` });
    });
  }

  deleteEvent = (eventID, title) => {
    eventService.deleteEvent(eventID).then(
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
    const { removed } = this.state;
    const { _id, title, start } = this.props.event;
    return (
      <>
        <div className={`table-item-container ${removed ? 'hidden' : null}`}>
          <div className="event-admin-text-container">
            <p>
              <span className="text-bold">{`${title}`}</span>
              {` | by: ${this.state.ownerFullName} | ${formatDateTime(start)}`}
            </p>
          </div>

          {/* DELETE EVENT */}
          <div>
            <button
              name="deleteEvent"
              className="icon-button"
              onClick={() => this.deleteEvent(_id, title)}
            >
              <MdDeleteForever className="row-delete-icon" size={'1.5em'} />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default EventAdminRow;
