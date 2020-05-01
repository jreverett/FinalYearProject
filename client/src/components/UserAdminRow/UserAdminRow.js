import React, { Component } from 'react';
import '../../common.css';
import './UserAdminRow.css';

class UserAdminRow extends Component {
  render() {
    const { firstname, lastname, email, verified } = this.props.user;
    return (
      <div className="table-item-container">
        <p>
          <span className="text-bold">{`${lastname}`}</span>
          {`, ${firstname} | ${email} | `}
          <span className={verified ? 'admin-verified' : ''}>
            {verified ? 'verified user' : 'standard user'}
          </span>
        </p>
      </div>
    );
  }
}

export default UserAdminRow;
