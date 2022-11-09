import { Box } from "@mui/material";
import React from "react";
import ChatBox from "./ChatBox";
import UserText from "./UserText";

function Messages() {
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          width: "80%",
          heigth: "85vh",
          borderRadius:3
        }}
      >
        <UserText></UserText>
        <ChatBox></ChatBox>
      </Box>
    </Box>
  );
}

export default Messages;
