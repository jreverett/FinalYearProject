import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { UserAdminRow, EventAdminRow } from '../../components';
import { userService, eventService } from '../../services';
import '../../common.css';
import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabKey: 'users',
      users: [],
      events: [],
    };
  }

  componentDidMount() {
    this.getUserRows();
    this.getEventRows();
  }

  getUserRows() {
    let userRows = [];
    userService.get().then((users) => {
      users = users.data.sort((a, b) => a.lastname.localeCompare(b.lastname));
      userRows = users.map((user, index) => {
        return (
          <UserAdminRow
            key={index}
            userRowIndex={index}
            user={user}
            updateUserSuspension={this.handleUserSuspensionUpdate}
          />
        );
      });
      this.setState({ users: userRows });
    });
  }

  getEventRows() {
    let eventRows = [];
    eventService.get().then((events) => {
      events = events.data.sort((a, b) => a.title.localeCompare(b.title));
      eventRows = events.map((event, index) => {
        return (
          <EventAdminRow key={index} eventRowIndex={index} event={event} />
        );
      });
      this.setState({ events: eventRows });
    });
  }

  handleUserSuspensionUpdate = (userRowID, suspended) => {
    // update user state
    let newUsers = this.state.users;
    newUsers[userRowID].props.user.suspended = suspended;

    // set new user state
    this.setState({ users: newUsers });
  };

  render() {
    return (
      <div id="admin-container" className="form-container col-md-6 offset-md-3">
        <p className="text-header">Upvent Admin Panel</p>
        <div style={{ height: 'auto' }}>
          <Tabs
            activeKey={this.state.tabKey}
            onSelect={(tabKey) => this.setState({ tabKey })}
          >
            <Tab eventKey="users" title="Users" className="admin-tab">
              {/* user table */}
              <div className="table-container">
                <div>{this.state.users}</div>
              </div>
            </Tab>
            <Tab eventKey="events" title="Events" className="admin-tab">
              {/* event table */}
              <div className="table-container">
                <div>{this.state.events}</div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Admin;
