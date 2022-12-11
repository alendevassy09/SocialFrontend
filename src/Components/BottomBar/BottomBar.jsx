import {
  BookmarkBorderOutlined,
  ExploreOutlined,
  HomeOutlined,
  MessageOutlined,
  NotificationsNoneOutlined,
  PersonSearchOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../Axios/axios'
function TopBar() {
  const navigate = useNavigate();
  let [hover, setHover] = useState(1);
  function session(url, page) {
    axios
      .get("/authCheck", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        if (!response.data.status) {
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          setHover(page);
          navigate(url);
        }
      });
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        paddingY: 1,
        backgroundColor: "#edede9",
      }}
    >
      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 1 ? "#1F3541" : "",
          }}
          onClick={() => {
            session("/home/posts", 1);
          }}
        >
          <HomeOutlined
            sx={{
              color: hover === 1 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
            fontSize="medium"
          ></HomeOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 2 ? "#1F3541" : "",
          }}
          onClick={() => {
            session("/home/trending", 2);
          }}
        >
          <ExploreOutlined
            sx={{
              color: hover === 2 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
            fontSize="medium"
          ></ExploreOutlined>
        </IconButton>
      </Box>

      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 3 ? "#1F3541" : "",
          }}
          onClick={() => {
            session("/home/search", 3);
          }}
        >
          <PersonSearchOutlined
            sx={{
              color: hover === 3 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
            fontSize="medium"
          ></PersonSearchOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            navigate("/home/messages");
          }}
        >
          <MessageOutlined
            sx={{ color: "#1F3541" }}
            fontSize="medium"
          ></MessageOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 4 ? "#1F3541" : "",
          }}
          onClick={() => {
            session("/home/messages", 4);
          }}
        >
          <MessageOutlined
            sx={{
              color: hover === 4 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
            fontSize="medium"
          ></MessageOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 5 ? "#1F3541" : "",
          }}
          onClick=
          {() => {
            // navigate("/home/notification");
            // setHover(5);
          }}
        >
          
          <NotificationsNoneOutlined
            sx={{
              color: hover === 5 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
            fontSize="medium"
          ></NotificationsNoneOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{
            "&:hover": {
              boxShadow: 2,
              color: "#1F3541",
            },
            backgroundColor: hover === 6 ? "#1F3541" : "",
          }}
          onClick={() => {
            session("/home/saved", 6);
          }}
        >
          <BookmarkBorderOutlined
            fontSize="medium"
            sx={{
              color: hover === 6 ? "white" : "#1F3541",
              "&:hover": { color: "#1F3541" },
            }}
          ></BookmarkBorderOutlined>
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
