import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, TextInput} from "@mantine/core";

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
      <Modal show={show} onHide={onClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text text-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput placeholder="Enter new group name" autoFocus onChange={e=> setInputValue(e.target.value)}></TextInput>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" color="lime" onClick={handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
