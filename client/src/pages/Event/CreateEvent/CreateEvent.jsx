import React, { Component, Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import DateTime from 'react-datetime';
import Geosuggest from 'react-geosuggest';
import FileBase64 from 'react-file-base64';
import { eventService, topicService } from '../../../services';
import '../../../common.css';
import './CreateEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      topic: '',
      description: '',
      start: '',
      end: '',
      cost: '',
      address: '',
      images: [],
      topics: {},
      submitted: false,
      loading: false,
      error: '',
    };
  }

  componentDidMount() {
    topicService.get().then((topics) => {
      this.setState({ topics: topics.data });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (key) => (newDate) => {
    this.setState({ [key]: newDate });
  };

  onSuggestSelect = (suggest) => {
    this.setState({ address: suggest });
  };

  createSelectItems = () => {
    const topics = this.state.topics;
    let options = [];

    for (let i = 0; i < topics.length; i++) {
      options.push(<option key={topics[i]._id}>{topics[i].name}</option>);
    }

    return options;
  };

  getImageData(images) {
    var base64Images = [];
    var invalidType = false;

    images.forEach((img) => {
      // verify files are of type PNG
      if (img.type !== 'image/png') {
        this.setState({ error: 'Image(s) must be of type PNG' });
        invalidType = true;
      }

      images = base64Images.push(
        // remove header info and just get the base64 string
        img.base64.replace(/^data:image\/png;base64,/, '')
      );
    });

    if (!invalidType) this.setState({ error: '', images: base64Images });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const {
      title,
      topic,
      description,
      start,
      end,
      cost,
      address,
      images,
      error,
    } = this.state;

    if (!(title && topic && description && start && address && !error)) return;

    this.setState({ loading: true });
    eventService
      .createEvent(
        this.props.loggedInUser._id,
        title,
        topic,
        description,
        start,
        end,
        cost,
        address,
        images
      )
      .then(
        () => {
          this.setState({ loading: false });
          window.location.href = '/event-listings';
        },
        (error) => this.setState({ error, loading: false })
      );
  };

  render() {
    const {
      title,
      topic,
      description,
      start,
      cost,
      submitted,
      loading,
      error,
    } = this.state;

    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div className="form-container col-md-6 offset-sm-3">
          <Form name="form" onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                {/* TITLE */}
                <Form.Group
                  controlId="formTitle"
                  className={submitted && !title ? ' has-error' : ''}
                >
                  <Form.Label>
                    Title<p className="compulsory-asterisk">*</p>
                  </Form.Label>
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
              </Col>
              <Col>
                {/* TOPIC */}
                <Form.Group
                  controlId="formTopic"
                  className={submitted && !topic ? ' has-error' : ''}
                >
                  <Form.Label>
                    Topic<p className="compulsory-asterisk">*</p>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="topic"
                    onChange={this.handleChange}
                  >
                    {this.createSelectItems()}
                  </Form.Control>
                  {submitted && !topic && (
                    <div className="help-block">Topic is required</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* DESCRIPTION */}
            <Form.Group
              controlId="formDescription"
              className={submitted && !description ? ' has-error' : ''}
            >
              <Form.Label>
                Description<p className="compulsory-asterisk">*</p>
              </Form.Label>
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
                  <Form.Label className="dateLabel">
                    Start Date/Time<p className="compulsory-asterisk">*</p>
                  </Form.Label>
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
                  pattern="[0-9]+(\.[0-9]{1,2})?"
                  name="cost"
                  value={cost}
                  onChange={this.handleChange.bind(this)}
                  placeholder="Enter cost (leave empty if free)"
                ></Form.Control>
                <i>£</i>
              </div>
            </Form.Group>

            {/* ADDRESS */}
            <Form.Group controlId="formAddress">
              <Form.Label>
                Address<p className="compulsory-asterisk">*</p>
              </Form.Label>
              <Geosuggest
                className="address-search"
                placeholder="Start tying an address..."
                onSuggestSelect={this.onSuggestSelect}
              />
            </Form.Group>

            {/* IMAGES */}
            <div id="images-container">
              <FileBase64
                multiple={true}
                onDone={this.getImageData.bind(this)}
              />
              <p id="event-image-upload" className="text-muted">
                Note: there is a 50MB limit on uploads
              </p>
            </div>

            {/* SUBMIT EVENT */}
            <Form.Group id="create-button-container">
              <button className="btn btn-primary" disabled={loading}>
                Create
              </button>
              {loading && (
                <img
                  id="loading-wheel"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  alt="loading wheel"
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
