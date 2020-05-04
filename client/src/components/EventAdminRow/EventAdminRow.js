import React, { Component } from 'react';
import { userService } from '../../services';
import { formatDateTime } from '../../utilities';
import '../../common.css';
import './EventAdminRow.css';

class EventAdminRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerFullName: '',
    };
  }

  componentDidMount() {
    userService.get(this.props.event.owner).then((user) => {
      user = user.data;
      this.setState({ ownerFullName: `${user.firstname} ${user.lastname}` });
    });
  }

  render() {
    const { title, start } = this.props.event;
    return (
      <div className="table-item-container">
        <p>
          <span className="text-bold">{`${title}`}</span>
          {` | by: ${this.state.ownerFullName} | ${formatDateTime(start)}`}
        </p>
      </div>
    );
  }
}

export default EventAdminRow;
