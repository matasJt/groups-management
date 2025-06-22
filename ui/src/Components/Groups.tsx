import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Group } from "../Model/Group.model";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Groups.scss";

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

  const openGroup = (event: any, groupId: string) => {
    event?.stopPropagation();
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
      .post<Group>("http://localhost:5257/api/Group", { name: value })
      .then((response) => {
        setGroups((old) => [...old, response.data]);
      })
      .catch((error) => {
        alert("Name cannot be empty");
      });
  };

  const checkHandler = (idToUpdate: string, checked: boolean) => {
    const group = groups.find((x) => x.id === idToUpdate);
    if (group != null) {
      setGroups((group) =>
        group.map((x) =>
          x.id === idToUpdate ? { ...x, isChecked: !checked } : x
        )
      );
    }
  };
  return (
    <div
      className="table-responsive border rounded-4 bg-body-tertiary mt-5 shadow mb-5 container-fluid"
      id="table-div"
      
    >
      <Button
        onClick={handleOpenPopup}
        className="my-3 float-end"
        id="group-button"
      >
        <AddIcon fontSize="small" />
        <span className="p-2 fs-5 fw-bold">Add New Group</span>
      </Button>

      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="Enter new group name"
        onSubmit={(name) => onCreate(name)}
      />
      <span className="fw-bold float-start" style={{fontSize:"50px"}}>Groups</span>
      <table className="rounded-4 table table-hover table-borderless table-primary align-middle table-responsive">
        <thead className="table-success">
          <tr>
            <th></th>
            <th className="fw-semibold align-middle" >NAME</th>
            <th className="fw-semibold align-middle">MEMBERS</th>
            <th className="fw-semibold align-middle ">YOU OWE</th>
            <th className="fw-semibold align-middle">OWES YOU</th>
            <th className="fw-semibold align-middle">CREATED</th>
            <th className="fw-semibold align-middle">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr
              key={group.name}
              className="table-secondary"
              onClick={() => checkHandler(group.id, group.isChecked)}
            >
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={group.id}
                  checked={group.isChecked}
                />
              </td>
              <td>{group.name}</td>
              <td>{group.totalOwe.toFixed(2)} $</td>
              <td>{group.totalOwed.toFixed(2)} $</td>
              <td></td>
              <td></td>
              <td>
                <a href={group.id} onClick={(e) => openGroup(e, group.id)}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="float-end my-3" id="delete-button">
        <DeleteIcon />
        <span className="p-2 fs-5 fw-bold">Delete Selected</span>
      </Button>
    </div>
  );
}

export default Groups;
