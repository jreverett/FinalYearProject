import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { GoVerified, GoUnverified } from 'react-icons/go';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { userService } from '../../services';
import '../../common.css';
import './UserAdminRow.css';

class UserAdminRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAdminText: this.getAdminText(),
      adminButtonHover: false,
      userVerifyText: this.getVerifyText(),
      verifyButtonHover: false,
      userSuspendText: this.getSuspendText(),
      suspendButtonHover: false,
    };
  }

  onMouseEnter = (e, status) => {
    let prompt;

    switch (e.target.name) {
      case 'adminToggle':
        prompt = status ? 'DEMOTE?' : 'PROMOTE?';
        this.setState({ adminButtonHover: true, userAdminText: prompt });
        break;
      case 'verifyToggle':
        this.setState({ verifyButtonHover: true });
        break;
      case 'suspendToggle':
        prompt = status ? 'UNSUSPEND?' : 'SUSPEND?';
        this.setState({ suspendButtonHover: true, userSuspendText: prompt });
        break;
      default:
        return;
    }
  };

  onMouseLeave = (e) => {
    switch (e.target.name) {
      case 'adminToggle':
        this.setState({
          adminButtonHover: false,
          userAdminText: this.getAdminText(),
        });
        break;
      case 'verifyToggle':
        this.setState({ verifyButtonHover: false });
        break;
      case 'suspendToggle':
        this.setState({
          suspendButtonHover: false,
          userSuspendText: this.getSuspendText(),
        });
        break;
      default:
        return;
    }
  };

  getAdminText = () => {
    return this.props.user.type === 1 ? 'ADMIN' : 'STANDARD';
  };

  getVerifyText = () => {
    return this.props.user.verified ? (
      <GoVerified className="user-admin-verification-badge" size={'1.2em'} />
    ) : (
      <GoUnverified className="user-admin-verification-badge" size={'1.2em'} />
    );
  };

  getSuspendText = () => {
    return this.props.user.suspended ? 'SUSPENDED' : 'ACTIVE';
  };

  toggleAdmin = (userID, isAdmin, fullname) => {
    isAdmin = !isAdmin;
    const type = isAdmin ? 1 : 0;
    userService.update(userID, { type: type }).then(
      () => {
        this.props.updateUser(this.props.userRowIndex, 'type', isAdmin);
        this.forceUpdate();

        const text = `${isAdmin ? 'Promoted' : 'Demoted'} ${fullname} to ${
          isAdmin ? 'admin' : 'standard user'
        }`;
        this.toastResponse(isAdmin, text);

        this.setState({ userAdminText: this.getAdminText() });
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  toggleVerified = (userID, isVerified, fullname) => {
    isVerified = !isVerified;
    userService.update(userID, { verified: isVerified }).then(
      () => {
        this.props.updateUser(this.props.userRowIndex, 'verified', isVerified);
        this.forceUpdate();

        const text = `${isVerified ? 'Verified' : 'Unverified'} ${fullname}`;
        this.toastResponse(isVerified, text);

        this.setState({ userVerifyText: this.getVerifyText() });
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  toggleSuspension = (userID, isSuspended, fullname) => {
    isSuspended = !isSuspended;
    userService.update(userID, { suspended: isSuspended }).then(
      () => {
        this.props.updateUser(
          this.props.userRowIndex,
          'suspended',
          isSuspended
        );
        this.forceUpdate();

        const text = `${isSuspended ? 'Suspended' : 'Unsuspended'} ${fullname}`;
        this.toastResponse(isSuspended, text);

        this.setState({ userSuspendText: this.getSuspendText() });
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  toastResponse = (status, text) => {
    if (status) {
      toast.success(
        <p>
          <AiOutlineUserDelete className="form-icon" />
          {text}
        </p>
      );
    } else {
      toast.success(
        <p>
          <AiOutlineUserAdd className="form-icon" />
          {text}
        </p>
      );
    }
  };

  render() {
    const {
      adminButtonHover,
      suspendButtonHover,
      verifyButtonHover,
    } = this.state;
    const {
      _id,
      type,
      firstname,
      lastname,
      email,
      verified,
      suspended,
    } = this.props.user;
    const admin = type === 1 ? true : false;
    const fullname = `${firstname} ${lastname}`;
    return (
      <div className="table-item-container user-admin-container">
        <div className="user-admin-text-container">
          <span className="text-bold">{`${lastname}`}</span>
          {`, ${firstname} | ${email}`}
        </div>

        {/* ADMIN TOGGLE */}
        <button
          name="adminToggle"
          className={`user-admin-button ${
            adminButtonHover
              ? 'user-admin-button-hover'
              : admin
              ? 'user-admin-button-administrator'
              : 'user-admin-button-default'
          }`}
          onClick={() => this.toggleAdmin(_id, admin, fullname)}
          onMouseEnter={(e) => this.onMouseEnter(e, admin)}
          onMouseLeave={(e) => this.onMouseLeave(e)}
        >
          <span className="form-icon user-admin-icon-container">
            {this.state.userAdminText}
          </span>
        </button>

        {/* VERIFY TOGGLE */}
        <button
          name="verifyToggle"
          className={`user-admin-button ${
            verifyButtonHover
              ? 'user-admin-button-hover'
              : verified
              ? 'user-admin-button-verified'
              : 'user-admin-button-default'
          }`}
          onClick={() => this.toggleVerified(_id, verified, fullname)}
          onMouseEnter={(e) => this.onMouseEnter(e, verified)}
          onMouseLeave={(e) => this.onMouseLeave(e)}
        >
          <span className="form-icon user-admin-icon-container">
            {this.state.userVerifyText}
          </span>
        </button>

        {/* SUSPEND TOGGLE */}
        <button
          name="suspendToggle"
          className={`user-admin-button ${
            suspendButtonHover
              ? 'user-admin-button-hover'
              : suspended
              ? 'user-admin-button-suspended'
              : 'user-admin-button-active'
          }`}
          onClick={() => this.toggleSuspension(_id, suspended, fullname)}
          onMouseEnter={(e) => this.onMouseEnter(e, suspended)}
          onMouseLeave={(e) => this.onMouseLeave(e)}
        >
          {this.state.userSuspendText}
        </button>
      </div>
    );
  }
}

export default UserAdminRow;
