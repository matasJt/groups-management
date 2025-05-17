import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import Popup from './Popup';
import Button from "react-bootstrap/Button";

function Groups() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const openGroup=()=>{
    navigate('/group');
  }
   const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="table-responsive container py-3">
      <Button onClick={handleOpenPopup} className="btn btn-success mb-2">Create new group</Button>
      <Popup show={showPopup} onClose={handleClosePopup} title="Enter new group name" />

      <table className="table table-striped table-hover table-borderless table-primary align-middle">
        <thead className="table-dark">
          <tr>
            <th>Group</th>
            <th>You owe</th>
            <th>You are owed</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr className="table-primary" onClick={openGroup}>
            <td>Item</td>
            <td>Item</td>
            <td>Item</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Groups;
