import React, { useCallback, useEffect, useState } from "react";
import Popup from "./Popup";
import { useNavigate, useParams } from "react-router";
import { Member } from "../Model/Member.model";
import GroupNavBar from "./GroupNavBar";
import { Container, Flex, Paper, Button } from "@mantine/core";
import { IconCheck, IconTrash, IconUser } from "@tabler/icons-react";
import { API } from "../api/requests";
import axios from "axios";
import { error } from "console";

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

  // const onSettle = (id: string) => {
  //   axios
  //     .put<Member>(`http://localhost:5257/api/Member/${id}`)
  //     .then((response) => {
  //       fetchMembers();
  //       alert("Settled");
  //     })
  //     .catch(() => {});
  // };

  const onDelete = async (id: string) => {
    // try {
    //   await API.MemberService.deleteMember(id);
    //   setMembers((member) => member.filter((m) => m.id !== id));
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response?.data?.message) {
    //     alert(error.response.data.message);
    //   }
    // }
    API.MemberService.deleteMember(id)
      .then(() => setMembers((member) => member.filter((m) => m.id !== id)))
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    API.MemberService.getMembers(groupId).then((member) => {
      setMembers(member);
    });
  }, [groupId]);

  const onCreateMember = (value: string) => {
    API.MemberService.postMember({ name: value }, groupId).then(
      (member: Member) => {
        const oldMembers = members.map((m) => ({ ...m }));
        setMembers([...oldMembers, member]);
      }
    );
  };
  return (
    <>
      <Paper>
        <GroupNavBar handlePopup={handleOpenPopup} title="Add new member" />
      </Paper>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        title="Enter new member name"
        onSubmit={(name) => onCreateMember(name)}
      />
      <Container size="lg" w="90%">
        <Flex
          bg="white"
          align="center"
          justify="center"
          pt="md"
          pb="md"
          px="lg"
          direction="column"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
          mt="md"
        >
          <h2
            style={{
              fontWeight: "700",
              fontSize: "1.5rem",
              letterSpacing: "0.5px",
              margin: 0,
              color: "#1a1a1a",
            }}
          >
            {Array.isArray(members) &&
              members
                .find((x) => x.group.id === groupId)
                ?.group.name.toUpperCase()}
            <span style={{ color: "#555", fontWeight: "400" }}>
              {" "}
              group members
            </span>
          </h2>
          <div
            style={{
              height: "3px",
              width: "60px",
              backgroundColor: "#007bff",
              borderRadius: "2px",
              marginTop: "8px",
            }}
          />
        </Flex>
        {/* Group section */}
        {Array.isArray(members) &&
          members.map((member) => (
            <Flex
              id="group"
              key={member.id}
              align="center"
              justify="space-between"
              p="sm"
              className="shadow"
            >
              <span className="fw-semibold">
                <IconUser color="blue" />
                {member.name}
                <Flex direction="column" align="start" ms="1.5rem">
                  <div>
                    <span className="text-danger small">Owe: {member.owe}</span>
                  </div>
                  <div>
                    <span className="text-success small">
                      Owed: {member.owed}
                    </span>
                  </div>
                </Flex>
              </span>

              <Flex gap="sm">
                <Button
                  justify="center"
                  size="compact-md"
                  color="red"
                  leftSection={<IconTrash />}
                  variant="filled"
                  onClick={() => onDelete(member.id)}
                >
                  Delete
                </Button>
                {member.owe !== 0 && (
                  <Button
                    justify="center"
                    size="compact-md"
                    color="green"
                    leftSection={<IconCheck />}
                    variant="filled"
                  >
                    Settle
                  </Button>
                )}
              </Flex>
            </Flex>
          ))}
      </Container>
    </>
  );
}

export default Group;
