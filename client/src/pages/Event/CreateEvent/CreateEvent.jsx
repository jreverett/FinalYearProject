import React, { Component, Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { eventService } from '../../../services/event';
import '../../../common.css';
import './CreateEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      start: Date,
      end: Date,
      cost: Number,
      images: Array,
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDateChange = key => newDate => {
    if (newDate !== 'Invalid date') {
      this.setState({ [key]: newDate / 1000 });
    }
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { title, description, start, end, cost, images } = this.state;

    if (!(title && description && start && end && cost && images)) return;

    this.setState({ loading: true });
    // eventService.createEvent(this.props.loggedInUser, title, description, start, end, cost, images) // TODO: implement this when loggedInUser is implemented
    eventService
      .createEvent(
        'placeholder@gmail.com',
        title,
        description,
        start,
        end,
        cost,
        images
      )
      .then(
        event => {
          this.setState({ loading: false });
          window.location.href = '/event-listings';
        },
        error => this.setState({ error, loading: false })
      );
  }

  render() {
    const {
      title,
      description,
      start,
      cost,
      images,
      submitted,
      loading,
      error
    } = this.state;

    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div id="form-container" className="col-md-6 offset-md-3">
          <Form name="form" onSubmit={this.handleSubmit}>
            {/* TITLE */}
            <Form.Group
              controlId="formTitle"
              className={submitted && !title ? ' has-error' : ''}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Enter title"
              ></Form.Control>
              {submitted && !title && (
                <div className="help-block">Title is required</div>
              )}
            </Form.Group>

            {/* DESCRIPTION */}
            <Form.Group
              controlId="formDescription"
              className={submitted && !description ? ' has-error' : ''}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Enter description"
              ></Form.Control>
              {submitted && !description && (
                <div className="help-block">Description is required</div>
              )}
              <Form.Text className="text-muted">
                This should contain any other important details for the event
              </Form.Text>
            </Form.Group>

            <Row>
              <Col>
                {/* START DATETIME */}
                <Form.Group
                  controlId="formStartDate"
                  className={submitted && !start ? ' has-error' : ''}
                >
                  <p className="dateLabel">Start Date/Time</p>
                  <DateTime
                    onChange={this.handleDateChange('start')}
                    dateFormat="DD-MM-YYYY"
                  />
                  {submitted && !start && (
                    <div className="help-block">
                      Start date and time is required
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {/* END DATETIME */}
                <Form.Group controlId="formEndDate">
                  <p className="dateLabel">End Date/Time</p>
                  <DateTime
                    onChange={this.handleDateChange('end')}
                    dateFormat="DD-MM-YYYY"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* COST */}
            <Form.Group controlId="formCost">
              <Form.Label>Cost</Form.Label>
              <div className="input-icon">
                <Form.Control
                  type="text" // not number as React bug with number inputs
                  pattern="[0-9]*"
                  name="cost"
                  value={cost}
                  onChange={this.handleChange.bind(this)}
                  placeholder="Enter cost (leave empty if free)"
                ></Form.Control>
                <i>£</i>
              </div>
            </Form.Group>

            {/* IMAGES */}
            <Form.Group id="imagesContainer" controlId="formImages">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                name="images"
                value={images}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="create-button-container">
              <button className="btn btn-primary" disabled={loading}>
                Create
              </button>
              {loading && (
                <img
                  id="loading-wheel"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )}
            </Form.Group>

            {error && <div className={'alert alert-danger'}>{error}</div>}
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default CreateEvent;
