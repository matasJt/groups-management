import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type PopUp ={
  show:boolean,
  title:string,
  onClose: () => void,
  onSubmit: (value:string) => void
}
function Popup({title,show, onClose, onSubmit}:PopUp) {
  const [value, setInputValue] = useState("");

  const handleSubmit =()=>{
    onSubmit(value);
    setInputValue("");
    onClose();
  }

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder="Here" onChange={e=> setInputValue(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
