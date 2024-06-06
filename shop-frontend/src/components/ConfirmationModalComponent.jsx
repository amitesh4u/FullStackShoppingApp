import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModalComponent = (props) => {
  return (
      <div>
        <Modal show={props.show} onHide={props.handleClose} backdrop="static"
               keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
              <i className="fa-solid fa-triangle-exclamation app-warning-icon"></i> {props.title}
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>{props.body}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={props.handleConfirmation}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  )
}
export default ConfirmationModalComponent
