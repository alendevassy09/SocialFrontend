import { KeyboardBackspace, Search, Send } from "@mui/icons-material";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import io from "socket.io-client";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const ENDPOINT = "http://localhost:4000";
const socket = io.connect("http://localhost:4000");
function ChatBox() {
  let navigate = useNavigate();
  const [gotMsg, SetGotMsg] = useState([]);
  const [sentMsg, SetSentMsg] = useState([]);
  const [totalMsg, setTotalMsg] = useState([{}]);
  const [msg, SetMsg] = useState("");
  const sendMessage = async () => {
    console.log(sentMsg, "----");
    SetSentMsg([...sentMsg, msg]);
    const sendMessage = {
      message: msg,
      author: "alen",
      room: 123,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", sendMessage);
    setTotalMsg([{ sendMessage }, ...totalMsg]);
    SetMsg("")
  };
  useEffect(() => {
    let room = 123;
    socket.emit("join", room);
  }, []);

  useEffect(() => {
    const eventListener = (data) => {
      setTotalMsg((list) => [{ gotMessage: data }, ...list]);
      SetGotMsg((list) => [data.message, ...list]);
    };
    socket.on("rececive_msg", eventListener);
    return () => {
      socket.off("rececive_msg", eventListener);
    };
  }, [socket]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        padding: 2,
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <IconButton
          onClick={() => {
            navigate("messages");
          }}
        >
          <KeyboardBackspace></KeyboardBackspace>
        </IconButton>
        <Avatar sx={{ marginLeft: 1 }} />
        <Typography sx={{ marginLeft: 1, fontWeight: 300 }} variant="h6">
          Name
        </Typography>
      </Box>
      <hr />
      <Box
        sx={{
          height: "90%",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            maxHeight: "90%",
            overflow: "scroll",
            overflowX: "hidden",
            width: "100%",
            padding: 1,
            "&::-webkit-scrollbar": {
              width: "5px",
            },

            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
          }}
        >
          {totalMsg.map((obj) => {
            if (obj.sendMessage) {
              return (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "50%",
                      padding: 1,
                      borderRadius: 3,
                      backgroundColor: "whitesmoke",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box><Typography variant="h6">{obj.sendMessage.message}</Typography></Box>
                    <Box><small>{obj.sendMessage.time}</small></Box>
                  </Box>
                </Box>
              );
            } else if (obj.gotMessage) {
              return (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "50%",
                      padding: 1,
                      borderRadius: 3,
                      backgroundColor: "whitesmoke",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box><Typography variant="h6">{obj.gotMessage.message}</Typography></Box>
                    <Box><small>{obj.gotMessage.time}</small></Box>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
        <Box>
          <Box
            sx={{
              height: 50,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#AFD8F2",
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <TextField
              fullWidth
              sx={{ marginLeft: 1 }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              value={msg}
              placeholder="Write Something"
              onChange={(event) => {
                SetMsg(event.target.value);
              }}
            ></TextField>
            <IconButton onClick={sendMessage} aria-label="delete">
              <Send fontSize="large"></Send>
            </IconButton>
            {/* <button onClick={join}></button> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatBox;
