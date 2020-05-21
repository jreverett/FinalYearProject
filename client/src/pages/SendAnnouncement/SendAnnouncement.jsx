import React, { Component } from 'react';
import DateTime from 'react-datetime';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { eventService } from '../../services';
import { formatDateTime } from '../../utilities';
import '../../common.css';
import './SendAnnouncement.css';

class SendAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      immediateSend: true,
      scheduleSend: false,
      scheduleSendDateTime: '',
      body: '',
      requestCopy: true,
      submitted: false,
      loading: false,
      error: '',
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.name === 'requestCopy' ? target.checked : target.value;
    const name = target.name;

    if (name === 'immediateSend') {
      this.setState({ scheduleSend: false });
      this.setState({ scheduleSendDateTime: '' });
    }
    if (name === 'scheduleSend') {
      this.setState({ immediateSend: false });
    }

    this.setState({ [name]: value });
  };

  handleDateChange = (e) => {
    this.setState({ scheduleSendDateTime: e });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const {
      immediateSend,
      scheduleSendDateTime,
      subject,
      body,
      requestCopy,
      error,
    } = this.state;

    if (!subject || !body || error) return;

    this.setState({ loading: true });
    eventService
      .sendAnnouncement(
        this.props.location.state.eventID,
        scheduleSendDateTime,
        subject,
        body,
        requestCopy
      )
      .then(
        () => {
          this.setState({ loading: false });
          if (immediateSend) {
            toast.success(
              <p>
                <MdEmail className="form-icon" size={'1.5em'} /> Your
                announcement is being broadcast
              </p>
            );
          } else {
            toast.success(
              <p>
                <MdEmail className="form-icon" size={'1.5em'} /> Your
                annoucement has been scheduled for{' '}
                {formatDateTime(scheduleSendDateTime)}
              </p>
            );
          }
        },
        (error) => {
          toast.error(error);
        }
      );
  };

  render() {
    const {
      subject,
      immediateSend,
      scheduleSend,
      body,
      requestCopy,
      submitted,
      loading,
      error,
    } = this.state;
    return (
      <>
        {loading && <div id="loading-fade" />}

        <div className="form-container col-md-8 offset-md-2">
          <div>
            <p className="text-header">Send Announcement</p>
          </div>
          <form name="send-announcement-form" onSubmit={this.handleSubmit}>
            {/* SUBJECT */}
            <div
              className={
                'form-group' + (submitted && !subject ? ' has-error' : '')
              }
            >
              <label htmlFor="subject" className="text-small">
                Subject<p className="compulsory-asterisk">*</p>
              </label>
              <input
                id="announcement-subject"
                type="text"
                className="form-control"
                name="subject"
                value={subject}
                onChange={this.handleChange}
              />
              {submitted && !subject && (
                <div className="help-block">Subject cannot be blank</div>
              )}
            </div>

            {/* IMMEDIATE SEND */}
            <div className="announcement-inline-container">
              <input
                type="radio"
                className="form-control announcement-inline-radio"
                name="immediateSend"
                checked={immediateSend}
                onChange={this.handleChange}
              />
              <label
                htmlFor="immediateSend"
                className="text-small announcement-inline-label"
              >
                Send Immediately
              </label>
            </div>

            {/* SCHEDULED SEND */}
            <div
              id="announcement-inline-container"
              className="announcement-inline-container"
            >
              <input
                type="radio"
                className="form-control announcement-inline-radio"
                name="scheduleSend"
                checked={scheduleSend}
                onChange={this.handleChange}
              />
              <label
                htmlFor="scheduleSend"
                className="text-small announcement-inline-label"
              >
                Schedule Release
              </label>

              {/* SCHEDULED SEND - DATE PICKER */}
              {scheduleSend && (
                <DateTime
                  className="announcement-inline-picker"
                  onChange={this.handleDateChange}
                  dateFormat="DD-MM-YYYY"
                  inputProps={{ placeholder: 'Select a date and time...' }}
                />
              )}
            </div>

            {/* MESSAGE BODY */}
            <div
              className={
                'form-group' + (submitted && !body ? ' has-error' : '')
              }
            >
              <label htmlFor="body" className="text-small">
                Message Body<p className="compulsory-asterisk">*</p>
              </label>
              <textarea
                form="send-announcement-form"
                className="form-control"
                name="body"
                value={body}
                onChange={this.handleChange}
              />
              {submitted && !body && (
                <div className="help-block">Message body cannot be blank</div>
              )}
            </div>

            {/* REQUEST COPY */}
            <div className="announcement-inline-container">
              <input
                type="checkbox"
                className="form-control announcement-inline-radio"
                name="requestCopy"
                checked={requestCopy}
                onChange={this.handleChange}
              />
              <label
                htmlFor="requestCopy"
                className="text-small announcement-inline-label"
              >
                Send a copy to my email
              </label>
            </div>

            {/* SEND */}
            <div id="form-group" className="announcement-send-button-container">
              <button
                className="btn btn-primary button-green announcement-send-button"
                disabled={loading}
              >
                Send
              </button>
              {loading && (
                <img
                  id="loading-wheel"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  alt="loading wheel"
                />
              )}
            </div>

            {error && <div className={'alert alert-danger'}>{error}</div>}
          </form>
        </div>
      </>
    );
  }
}

export default SendAnnouncement;
