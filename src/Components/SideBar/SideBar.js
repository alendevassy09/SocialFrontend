import { Box } from "@mui/material";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Home } from "@mui/icons-material";
function SideBar() {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position={"fixed"}>

      <List>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Home></Home>
            </ListItemIcon>
            <ListItemText primary="Homepage"></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Home></Home>
            </ListItemIcon>
            <ListItemText primary="Homepage"></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Home></Home>
            </ListItemIcon>
            <ListItemText primary="Homepage"></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={"a"} href="#">
            <ListItemIcon>
              <Home></Home>
            </ListItemIcon>
            <ListItemText primary="Homepage"></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      </Box>
    </Box>
  );
}

export default SideBar;
