import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Group } from "../Model/Group.model";

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Group[]>(`http://localhost:5257/api/Group/`)
      .then((response) => {
        setGroups(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openGroup = (groupId:string) => {
    navigate(`/group/${groupId}`);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onCreate = (value: string) => {
    axios
      .post<Group>("http://localhost:5257/api/Group", { name:value })
      .then((response) => {
        setGroups(old => [...old, response.data])
      }).catch(error=>{
        alert("Name cannot be empty")
      })
  };
  return (
    <div className="table-responsive container py-3">
      <Button onClick={handleOpenPopup} className="btn btn-success mb-2">
        Create new group
      </Button>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="Enter new group name"
        onSubmit={(name) => onCreate(name)}
      />

      <table className="table table-striped table-hover table-borderless table-primary align-middle">
        <thead className="table-dark">
          <tr>
            <th>Group</th>
            <th>You owe</th>
            <th>Owes you</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {groups.map((group) => (
            <tr key={group.name} className="table-primary" onClick={()=>openGroup(group.id)}>
              <td>{group.name}</td>
              <td>{group.totalOwe.toFixed(2)} $</td>
              <td>{group.totalOwed.toFixed(2)} $</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Groups;
