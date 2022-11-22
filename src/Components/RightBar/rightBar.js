import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Suggested from "./Suggested";
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
        
        justifyContent: "start",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e9e9e9",
          width: "24%",
          height: "90%",
          position: "fixed",
          marginRight: { lg: 3, md: 1 },
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
            <Box onClick={(e) => setOpen(true)}>Alen Devassy</Box>
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
        <Box sx={{ width: "80%", borderTop: 1, marginTop: 2 }}>
            <Suggested></Suggested>
            <Suggested></Suggested>
            <Suggested></Suggested>
        </Box>
      </Box>
    </Box>
  );
}

export default rightBar;
