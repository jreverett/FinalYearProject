import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { userService } from '../../services';
import '../../common.css';
import './UserAdminRow.css';

class UserAdminRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStateText: this.props.user.suspended ? 'SUSPENDED' : 'ACTIVE',
      hover: false,
    };
  }

  onMouseEnter = (suspended) => {
    const prompt = suspended ? 'UNSUSPEND?' : 'SUSPEND?';
    this.setState({ hover: true, userStateText: prompt });
  };

  onMouseLeave = (suspended) => {
    const prompt = suspended ? 'SUSPENDED' : 'ACTIVE';
    this.setState({ hover: false, userStateText: prompt });
  };

  toggleSuspension = (userID, suspended, fullname) => {
    suspended = !suspended;
    userService.update(userID, { suspended: suspended }).then(() => {
      this.props.updateUserSuspension(this.props.userRowIndex, suspended);

      // update to get the new state text prop (this.userStateText)
      this.forceUpdate();

      if (suspended) {
        toast.success(
          <p>
            <AiOutlineUserDelete className="form-icon" />
            {`Suspended ${fullname}`}
          </p>
        );
      } else {
        toast.success(
          <p>
            <AiOutlineUserAdd className="form-icon" />
            {`Unsuspended ${fullname}`}
          </p>
        );
      }
    });
  };

  // deleteUser = (userID, fullname) => {
  //   userService.deleteUser(userID).then(
  //     () => {
  //       this.setState({ removed: true });
  //       toast.success(
  //         <p>
  //           <AiOutlineUserDelete className="form-icon" />
  //           {`Removed ${fullname}`}
  //         </p>
  //       );
  //     },
  //     (error) => {
  //       toast.error(error);
  //     }
  //   );
  // };

  render() {
    const { removed, hover } = this.state;
    const {
      _id,
      firstname,
      lastname,
      email,
      verified,
      suspended,
    } = this.props.user;
    const fullname = `${firstname} ${lastname}`;
    return (
      <div className={`table-item-container ${removed ? 'hidden' : null}`}>
        <div>
          <span className="text-bold">{`${lastname}`}</span>
          {`, ${firstname} | ${email} | `}
          <span className={verified ? 'admin-verified' : ''}>
            {verified ? 'verified user' : 'standard user'}
          </span>
        </div>

        <button
          className={`admin-status-button ${
            hover
              ? 'admin-status-button-hover'
              : suspended
              ? 'admin-status-button-suspended'
              : 'admin-status-button-active'
          }`}
          onClick={() => this.toggleSuspension(_id, suspended, fullname)}
          onMouseEnter={() => this.onMouseEnter(suspended)}
          onMouseLeave={() => this.onMouseLeave(suspended)}
        >
          {this.state.userStateText}
        </button>
        {/* )} */}
      </div>
    );
  }
}

export default UserAdminRow;
