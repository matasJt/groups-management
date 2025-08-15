import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { Group } from "../Model/Group.model";
import "./styles/Groups.scss";
import "@mantine/notifications/styles.css";
import GroupNavBar from "./GroupNavBar";
import {
  Button,
  Checkbox,
  Container,
  createTheme,
  Flex,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { IconCheck, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import { API } from "../api/requests";
import { notifications, Notifications } from "@mantine/notifications";

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState(false);
  const [DeleteAll, setDeleteAll] = useState(false);

  const theme = createTheme({
    cursorType: "pointer",
  });

  useEffect(() => {
    API.GroupService.getGroup().then((group) => {
      setGroups(group);
    });
  }, []);

  const deleteSelected = () => {
    const selectedGroups = groups.filter((x) => x.isChecked).map((x) => x.id);
    setGroups((prev) => prev.filter((g) => !selectedGroups.includes(g.id)));
    API.GroupService.deleteGroup(selectedGroups);
    setDeleteAll(false);
    setShowDelete(false);
    notifications.show({
      autoClose: 1200,
      message: "Deleted",
      withCloseButton: false,
      radius: "xl",
      icon: <IconCheck size={20} />,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.red?.[5],
        },
        icon: {
          backgroundColor: theme.colors.red[5],
          color: theme.white,
        },
        description: {
          color: theme.white,
          fontWeight: "bold",
          fontSize: "15px",
        },
      }),
    });
  };

  const openGroup = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onCreate = (value: string) => {
    if (value.trim().length === 0) {
      return;
    }
    API.GroupService.postGroup({ name: value }).then((group: Group) => {
      const oldGroups = groups.map((g) => ({
        ...g,
        isChecked: false,
      }));
      group.isChecked = false;
      setGroups([...oldGroups, group]);
    });
  };

  const checkHandler = (idToUpdate: string, checked: boolean) => {
    const group = groups.find((x) => x.id === idToUpdate);
    if (group != null) {
      const updatedGroups = groups.map((x) =>
        x.id === idToUpdate ? { ...x, isChecked: checked } : x
      );

      setGroups(updatedGroups);
      const count = updatedGroups.filter((x) => x.isChecked).length;
      setShowDelete(count > 0);
      setDeleteAll(count === updatedGroups.length);
    }
  };
  const checkAll = (state: boolean) => {
    const updatedGroups = groups.map((group) => ({
      ...group,
      isChecked: state,
    }));

    setGroups(updatedGroups);
    const count = updatedGroups.filter((x) => x.isChecked).length;
    setShowDelete(count > 0);
    setDeleteAll(count === updatedGroups.length);
  };
  return (
    <>
      <Notifications position="top-right" />
      <Paper shadow="xs">
        <GroupNavBar handlePopup={handleOpenPopup} title="Create new group" />
      </Paper>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="New group"
        onSubmit={(name) => onCreate(name)}
      />
      <Container size="lg" w="90%">
        <Flex
          bg="white"
          justify="space-between"
          align="center"
          pt="xs"
          pb="xs"
          p="sm"
          style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
          mt="md"
        >
          <MantineProvider theme={theme}>
            <Checkbox
              size="sm"
              me="sm"
              label="Select All"
              checked={DeleteAll}
              onChange={(e) => checkAll(e.target.checked)}
            ></Checkbox>
          </MantineProvider>

          <Button
            onClick={deleteSelected}
            color="red"
            radius="20px"
            className={showDelete ? "button show" : "button"}
          >
            <IconTrash size="20" className="me-1" />
            Delete Selected
          </Button>
        </Flex>
        {/* Group section */}
        {Array.isArray(groups) &&
          groups.map((group) => (
            <Flex
              id="group"
              key={group.id}
              align="flex-start"
              p="sm"
              className="shadow"
            >
              <MantineProvider theme={theme}>
                <Checkbox
                  size="sm"
                  me="sm"
                  checked={group.isChecked}
                  onChange={(e) => checkHandler(group.id, e.target.checked)}
                ></Checkbox>
              </MantineProvider>
              <IconUsersGroup className="me-3" />

              <Flex direction="column" justify="space-between" align="start">
                <span
                  onClick={() => openGroup(group.id)}
                  className="fw-semibold"
                  style={{ cursor: "pointer" }}
                >
                  {group.name}
                </span>
                <div className="small text-muted">
                  24 members •
                  <span className="text-danger">Owe: {group.totalOwe}</span> •
                  <span className="text-success">Owed: {group.totalOwed}</span>{" "}
                  • Created
                </div>
              </Flex>
            </Flex>
          ))}
      </Container>
    </>
  );
}

export default Groups;
