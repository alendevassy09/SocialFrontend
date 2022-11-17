import { Box } from "@mui/material";
import React from "react";
import ChatBox from "./ChatBox";
import UserText from "./UserText";
import { Outlet } from "react-router-dom";

function Messages() {
  return (
    <Box
      sx={{
        height: "95vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:{md:5}
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          width: "100%",
          heigth: "90vh",
          borderRadius:3
        }}
      >
         {/* <UserText></UserText> */}
        <ChatBox></ChatBox>
        
      </Box>
    </Box>
  );
}

export default Messages;
