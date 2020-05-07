import React, { Component, Fragment } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from 'react-image-gallery';
import {
  FaRegClock,
  FaFlagCheckered,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaCalendarTimes,
} from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { MdSupervisorAccount } from 'react-icons/md';
import { formatDateTime } from '../../utilities';
import { userService } from '../../services';
import '../../common.css';
import './EventModal.css';
import 'react-toastify/dist/ReactToastify.css';
class EventModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      verified: false,
      userIsOwner: false,
      userIsSubscribed: false,
      subscriptionButtonText: '',
      loading: false,
      error: '',
    };
  }

  componentDidMount() {
    const { eventDetails, loggedInUser } = this.props;

    // fetch event owner details
    userService.get(eventDetails.owner).then((user) => {
      const userData = user.data;
      this.setState({
        owner: `${userData.firstname} ${userData.lastname}`,
        verified: userData.verified,
      });
    });

    // check if user is the owner of this event
    if (loggedInUser?.ownedEvents.includes(eventDetails._id)) {
      this.setState({ userIsOwner: true });
    }

    // check if user is subscribed to this event
    if (loggedInUser?.subscriptions.includes(eventDetails._id)) {
      this.setState({
        userIsSubscribed: true,
        subscriptionButtonText: 'Subscribed',
      });
    }
  }

  subscribeToEvent = () => {
    this.setState({ loading: true });

    userService
      .subscribe(this.props.loggedInUser._id, this.props.eventDetails._id)
      .then(
        () => {
          this.setState({ userIsSubscribed: true, loading: false });
          toast.success(
            <p>
              <FaCalendarCheck className="form-icon" />
              Subscribed to {this.props.eventDetails.title}
            </p>
          );
        },
        (error) => {
          this.setState({ error, loading: false });
          toast.error(error);
        }
      );
  };

  unsubscribeFromEvent = () => {
    this.setState({ loading: true });

    userService
      .unsubscribe(this.props.loggedInUser._id, this.props.eventDetails._id)
      .then(
        () => {
          this.setState({ userIsSubscribed: false, loading: false });
          toast.success(
            <p>
              <FaCalendarTimes className="form-icon" />
              Unsubscribed from {this.props.eventDetails.title}
            </p>
          );
        },
        (error) => {
          this.setState({ error, loading: false });
          toast.error(error);
        }
      );
  };

  onMouseEnter = () => {
    this.setState({ hover: true, subscriptionButtonText: 'Unsubscribe?' });
  };

  onMouseLeave = () => {
    this.setState({ hover: false, subscriptionButtonText: 'Subscribed' });
  };

  render() {
    const {
      owner,
      verified,
      userIsOwner,
      userIsSubscribed,
      subscriptionButtonText,
      loading,
    } = this.state;

    let event = this.props.eventDetails;

    let startDate = formatDateTime(event.start);
    let endDate = formatDateTime(event.end);

    var images = event.images[0]
      ? formatImages(event.images)
      : [
          {
            original: require('../../images/event-thumb-placeholder.png'),
            thumbnail: require('../../images/event-thumb-placeholder.png'),
          },
        ];

    return (
      <Fragment>
        <Modal show={this.props.show} onHide={this.props.toggleModal} size="lg">
          <Modal.Header>
            <div id="modal-gallery-container">
              <ImageGallery
                items={images}
                autoPlay={true}
                showFullscreenButton={false}
                slideDuration={400}
                slideInterval={3000}
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col id="modal-col-title">
                <Modal.Title id="modal-title">{event.title}</Modal.Title>
                <p className="text-subtext">
                  hosted by {owner}{' '}
                  {verified && (
                    <span id="modal-verified-badge">
                      <GoVerified />
                    </span>
                  )}
                </p>
              </Col>
              {this.props.loggedInUser && !userIsOwner && (
                <Col>
                  {userIsSubscribed ? (
                    <Button
                      id="subscribe-button"
                      ref="subscribeButton"
                      className="btn btn-primary button-green button-subscribed"
                      onClick={!loading ? this.unsubscribeFromEvent : null}
                      onMouseEnter={this.onMouseEnter}
                      onMouseLeave={this.onMouseLeave}
                    >
                      {loading ? 'Unsubscribing...' : subscriptionButtonText}
                    </Button>
                  ) : (
                    <Button
                      id="subscribe-button"
                      className="btn btn-primary button-green"
                      onClick={!loading ? this.subscribeToEvent : null}
                      disabled={loading}
                    >
                      {loading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  )}
                  <ToastContainer />
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <p
                  className={
                    'cost-label ' + (!event.cost ? 'free-event' : null)
                  }
                >
                  <FaMoneyBillWave className="form-icon" size={'1.5em'} />
                  {event.cost ? `£${event.cost}` : 'FREE!'}
                </p>
              </Col>
              <Col>
                <p className="modal-count-label">
                  <MdSupervisorAccount className="form-icon" size={'1.5em'} />
                  {`${event.subscribers.length} ${
                    event.subscribers.length === 1
                      ? 'subscriber'
                      : 'subscribers'
                  }`}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <FaRegClock className="form-icon" size={'1.3em'} />
                  {startDate}
                </p>
              </Col>
              {endDate !== 'Invalid date' && (
                <Col>
                  <p>
                    <FaFlagCheckered className="form-icon" size={'1.3em'} />
                    {endDate}
                  </p>
                </Col>
              )}
            </Row>
            <div id="modal-description-container">
              <p id="modal-description">{event.description}</p>
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

function formatImages(images) {
  var formattedImages = [];

  images.forEach((img) => {
    img = 'data:image/png;base64,' + img;
    formattedImages.push({ original: img, thumbnail: img });
  });

  return formattedImages;
}

export default EventModal;
