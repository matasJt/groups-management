import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Member } from "../Model/Member.model";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Transact } from "../Model/Transaction.model";

function Transaction() {
  const [members, setMembers] = useState<Member[]>([]);
  const [amount, setAmount] = useState<string>();
  const [payerId, setPayer] = useState<string>();
  const [split, setSplit] = useState<string>();
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Member[]>(`http://localhost:5257/Group/${groupId}/Member`)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const onPayerOption = () => {
    const payer: Member | undefined = members.find((x) => x.id === payerId);
    axios
      .post<Transact>(`http://localhost:5257/Group/${groupId}/Transaction`, {
        payer: payer,
        amount: amount,
        split: split
      })
      .then(() => {
        alert("Transaction completed");
        window.history.replaceState(null, "", `/group/${groupId}`);
        navigate(`/group/${groupId}`);
      })
      .catch((error) => {
        alert("Name cannot be empty");
      });
  };

  return (
    <Form className="container py-3">
      <Form.Group className="mb-3" controlId="Form.ControlPayer">
        <Form.Label>Payer</Form.Label>
        <Form.Select onChange={(e) => setPayer(e.target.value)}>
          <option>-</option>
          {members.map((member) => (
            <option value={member.id}>{member.name}</option>
          ))}
          {/* <option>Me</option> */}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlAmount">
        <Form.Label>Enter the full amount paid</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlSplit">
        <Form.Label>Select split</Form.Label>
        <Form.Select onChange={(e) => setSplit(e.target.value)}>
          <option>-</option>
          <option value="Equally">Equally</option>
          <option value="Percentage">Percentage</option>
          <option value="Dynamic">Dynamic</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={onPayerOption}>
        Create transaction
      </Button>
    </Form>
  );
}

export default Transaction;
