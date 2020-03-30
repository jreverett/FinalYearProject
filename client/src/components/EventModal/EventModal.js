import React, { Component } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { FaRegClock, FaFlagCheckered, FaMoneyBillWave } from 'react-icons/fa';
import { formatDateTime } from '../../utilities';
import { userService } from '../../services';
import './EventModal.css';

class EventModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: ''
    };
  }

  componentDidMount() {
    userService.get(this.props.eventDetails.owner).then(user => {
      this.setState({ owner: `${user.data.firstname} ${user.data.lastname}` });
    });
  }

  render() {
    let event = this.props.eventDetails;

    let startDate = formatDateTime(event.start);
    let endDate = formatDateTime(event.end);

    var images = event.images[0]
      ? formatImages(event.images)
      : [
          {
            original: require('../../images/event-thumb-placeholder.png'),
            thumbnail: require('../../images/event-thumb-placeholder.png')
          }
        ];

    return (
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
              <p className="text-subtext">hosted by {this.state.owner}</p>
            </Col>
            <Col>
              <button
                id="subscribe-button"
                className="btn btn-primary button-green"
              >
                Subscribe
              </button>
            </Col>
          </Row>
          <p className={'cost-label ' + (!event.cost ? 'free-event' : null)}>
            <FaMoneyBillWave className="modal-icon" size={'1.5em'} />
            {event.cost ? '£' + event.cost : 'FREE!'}
          </p>
          <Row>
            <Col>
              <p>
                <FaRegClock className="modal-icon" size={'1.3em'} />
                {startDate}
              </p>
            </Col>
            {endDate !== 'Invalid date' && (
              <Col>
                <p>
                  <FaFlagCheckered className="modal-icon" size={'1.3em'} />
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
    );
  }
}

function formatImages(images) {
  var formattedImages = [];

  images.forEach(img => {
    img = 'data:image/png;base64,' + img;
    formattedImages.push({ original: img, thumbnail: img });
  });

  return formattedImages;
}

export default EventModal;
