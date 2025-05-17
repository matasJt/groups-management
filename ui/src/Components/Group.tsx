import React, { useState } from "react";
import Popup from "./Popup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Group() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
   const navigate = useNavigate();

    const openTransaction=()=>{
        navigate('transaction');
    }

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="table-responsive container py-3">
      <Button onClick={handleOpenPopup} className="btn btn-success mb-2">
        Add new member
      </Button>
      <button className="btn btn-primary mb-2 mx-2" onClick={openTransaction}>New transaction</button>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="Enter new member name"
      />
      <h3>Group name</h3>
      <table className="table table-light small container table-hover table-borderless table-primary align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Member</th>
            <th scope="col">You owe</th>
            <th scope="col">Owes you</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>50$</td>
            <td>100$</td>
            <td><button className="btn btn-success btn-sm float-end me-2 ">Settle</button></td>
            <td><button className="btn btn-danger btn-sm float-end me-2 ">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Group;
