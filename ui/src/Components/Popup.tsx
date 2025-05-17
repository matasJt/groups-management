import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Popup(props:any) {
  return (
    <>
      <Modal show={props.show} onHide={props.onCLose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
