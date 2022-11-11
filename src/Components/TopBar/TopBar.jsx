import {
  BookmarkBorderOutlined,
  Chat,
  CircleNotifications,
  Explore,
  ExploreOutlined,
  Home,
  HomeOutlined,
  MessageOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate=useNavigate()
  return (
    <Box
      sx={{
        width: "65%",
        display: "flex",
        justifyContent: "space-evenly",
        padding: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
       
        
        backgroundColor: "#EDF2F3",
      }}
    >
      <Box>
        <IconButton onClick={()=>{navigate('/home/dash')}}>
          <HomeOutlined sx={{ color: "#1F3541" }} fontSize="medium"></HomeOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton >
          <ExploreOutlined
            sx={{ color: "#1F3541" }}
            fontSize="medium"
          ></ExploreOutlined>
        </IconButton>
      </Box>

      <Box>
        <IconButton onClick={()=>{navigate('/home/messages')}}>
          <MessageOutlined
            sx={{ color: "#1F3541" }}
            fontSize="medium"
          ></MessageOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <NotificationsNoneOutlined
            sx={{ color: "#1F3541" }}
            fontSize="medium"
          ></NotificationsNoneOutlined>
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <BookmarkBorderOutlined
            fontSize="medium"
            sx={{ color: "#1F3541" }}
          ></BookmarkBorderOutlined>
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
