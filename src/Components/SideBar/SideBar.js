import { Box, Typography } from "@mui/material";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Friends from "../Friends/Friends";
function SideBar() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        width: "100%",
        height: "90vh",
        justifyContent:"end"
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EDF2F3",

          width: "24%",
          height: "90%",
          position: "fixed",
          marginLeft:{lg:3,md:1},
          marginTop: 1.5,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Box
          sx={{
            width: "80%",
            backgroundColor: "#AFD8F2",
            height: 50,
            borderRadius: 5,
            boxShadow: 2,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Search fontSize="large"></Search>
          <Box>Search</Box>
        </Box>
        <Box sx={{ width: "80%", marginTop: 2 }}>
          <Typography variant="h5">Friends</Typography>
        </Box>
        <Box sx={{ width: "80%", borderTop: 1, marginTop: 2 }}>
          <Friends></Friends>
          <Friends></Friends>
          <Friends></Friends>
          <Friends></Friends>
          <Friends></Friends>
          <Friends></Friends>
        </Box>
        <Box>
        
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;

{
  /* <Box position={"fixed"}  sx={{boxShadow:5,width:"25%" ,borderRadius:3,marginTop:2,marginLeft:4}}>

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
    <ListItemButton LinkComponent={"a"} href="#" onClick={()=>{navigate('/home/messages')}}>
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
</Box> */
}
