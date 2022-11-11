import { Avatar, AvatarGroup, Box, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
function rightBar() {
  const [openMenu, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EDF2F3",
          width: "24%",
          height: "90%",
          position: "fixed",
          marginRight: {lg:3,md:1},
          marginTop: 1.5,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Box
          sx={{
            width: "80%",

            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            flexDirection={"row"}
            display="flex"
            alignItems={"center"}
            justifyContent="space-around"
            width={"66%"}
          >
            <Avatar
              onClick={(e) => setOpen(true)}
              
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Box onClick={(e) => setOpen(true)}>
              Alen Devassy
            </Box>
          </Box>
          

        </Box>
        <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={openMenu}
              onClick={(e) => setOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("userToken");
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
        <Box sx={{ width: "80%", marginTop: 2 }}>
          <Typography variant="h5">Suggested</Typography>
        </Box>
        <Box sx={{ width: "80%", borderTop: 1, marginTop: 2 }}>List</Box>
      </Box>
    </Box>
  );
}

export default rightBar;

{
  /* <Box width={"100%"} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position={"fixed"} width={"25%"} sx={{display:"flex",justifyContent:"end",flexDirection:"column" , padding:2 ,marginTop:2, boxShadow:5,borderRadius:3}}>
        <Typography variant="h6"   fontWeight={100}>
          Online Friends
        </Typography>
        <AvatarGroup max={7} sx={{display:"flex",justifyContent:"start"}}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100}>
          Latest Conversation
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box> */
}
