import React from "react";
import { Button, Form } from "react-bootstrap";


function Transaction(){
    return (
     <Form className="container py-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Payer</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter the full amount paid</Form.Label>
        <Form.Control type="number" />
      </Form.Group>
      <Button variant="primary">Create transaction</Button>
    </Form>
    );
}

export default Transaction;