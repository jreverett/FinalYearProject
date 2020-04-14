import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../common.css';
import './ConfirmationModal.css';

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
  }

  onClose = () => {
    this.props.onClose();
  };

  onConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button
            className="confirmation-modal-confirm-button"
            onClick={this.onConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;
