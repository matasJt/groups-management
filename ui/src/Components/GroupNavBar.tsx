import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button, Text } from "@mantine/core";
import { IconHexagonPlus, IconUsersGroup } from "@tabler/icons-react";
import "./styles/Groups.scss";

function GroupNavBar({ handlePopup,title }: any) {
  return (
    <div
      id="group-bar"
      className="bg-white rounded-3 d-flex p-3 justify-content-between mb-4 container"
    >
      <h3 className="fw-semibold">Groups management</h3>
      <Text size="sm" className="m-2">
        <a
          id="groups-list"
          href="/group"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          {" "}
          <IconUsersGroup /> Groups list
        </a>
      </Text>
      <Button
        onClick={handlePopup}
        id="create-button"
        variant="filled"
        color="violet"
        radius="20px"
      >
        <IconHexagonPlus id="icon" stroke={2} className="m-1" />
        {title}
      </Button>
    </div>
  );
}

export default GroupNavBar;
