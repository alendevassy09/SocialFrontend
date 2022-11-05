import { Box, Typography } from "@mui/material";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Messages from "../Messages/Messages";
import { useNavigate,Route,Routes } from "react-router-dom";
import { Chat, CircleNotifications, Explore, Home } from "@mui/icons-material";
function SideBar() {
  const navigate=useNavigate()
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position={"fixed"}>

      <List>
        <ListItem>
          <ListItemButton LinkComponent={"a"} onClick={()=>{navigate('/home/dash')}}>
            <ListItemIcon >
              <Home fontSize="large"></Home>
            </ListItemIcon>
            <ListItemText sx={{display:{xs:"none",md:"block"}}}><Typography variant="h6">Homepage</Typography></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Explore fontSize="large"></Explore>
            </ListItemIcon>
            <ListItemText sx={{display:{xs:"none",md:"block"}}}><Typography variant="h6">Explore</Typography></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Chat fontSize="large"></Chat>
            </ListItemIcon>
            <ListItemText sx={{display:{xs:"none",md:"block"}}}><Typography variant="h6">Messages</Typography></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <CircleNotifications fontSize="large"></CircleNotifications>
            </ListItemIcon>
            <ListItemText sx={{display:{xs:"none",md:"block"}}}><Typography variant="h6">Notifications</Typography></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      </Box>
    </Box>
  );
}
function RouterPath(){
  return(
    <div>
    <Routes>
      <Route path="/Messages" element={<Messages/>}></Route>
    </Routes>
    </div>
  )
}
export default SideBar;
