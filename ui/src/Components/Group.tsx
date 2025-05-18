import React, { useCallback, useEffect, useState } from "react";
import Popup from "./Popup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Member } from "../Model/Member.model";
import axios from "axios";

function Group() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const openTransaction = () => {
    navigate("transaction");
  };
  const openTransactions = () => {
    navigate("transactions");
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onSettle = (id: string) => {
    axios
      .put<Member>(`http://localhost:5257/api/Member/${id}`)
      .then(response=>{
        fetchMembers();
        alert("Settled")
      })
      .catch(()=>{

      })
  };
  const onDelete = (id: string) => {
    axios
      .delete(`http://localhost:5257/api/Member/${id}`)
      .then(() => {
        setMembers((old) => old.filter((i) => i.id !== id));
        alert("Member deleted");
      })
      .catch(() => {
        alert("Member not settled");
      });
  };

   const fetchMembers = useCallback(() => {
  axios
    .get<Member[]>(`http://localhost:5257/Group/${groupId}/Member`)
    .then((response) => {
      setMembers(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, [groupId]);

 useEffect(() => {
  fetchMembers();
}, [fetchMembers]);

 

  const onCreateMember = (value: string) => {
    axios
      .post<Member>(`http://localhost:5257/Group/${groupId}`, { name: value })
      .then((response) => {
        setMembers((old) => [...old, response.data]);
      })
      .catch((error) => {
        alert("Name cannot be empty");
      });
  };
  return (
    <div className="table-responsive container py-3">
      <Button onClick={handleOpenPopup} className="btn btn-success mb-2">
        Add new member
      </Button>
      <button className="btn btn-primary mb-2 mx-2" onClick={openTransaction}>
        New transaction
      </button>
      <button className="btn btn-primary mb-2 mx-2" onClick={openTransactions}>
        View transactions
      </button>
      <button
        className="btn btn-primary mb-2 mx-2"
        onClick={() => navigate(`/group`)}
      >
        Back to group list
      </button>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="Enter new member name"
        onSubmit={(name) => onCreateMember(name)}
      />
      <h3>{members.find((x) => x.group.id === groupId)?.group.name}</h3>
      <table className="table table-light small container table-hover table-borderless table-primary align-middle">
        <thead>
          <tr>
            <th scope="col">Member</th>
            <th scope="col">You owe</th>
            <th scope="col">Owes you</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.owe.toFixed(2)} $</td>
              <td>{member.owed.toFixed(2)} $</td>
              <td>
                <button
                  className="btn btn-success btn-sm float-end"
                  onClick={() => onSettle(member.id)}
                >
                  Settle
                </button>
                <button
                  className="btn btn-danger btn-sm float-end me-2"
                  onClick={() => onDelete(member.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Group;
