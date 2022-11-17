import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserText() {
  let navigate=useNavigate()
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        padding: 2,
        backgroundColor: "white",
        borderRadius: 3,
        backgroundColor: "#EDF2F3",
      }}
    >
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
        <Search fontSize="large"></Search>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="Search"
        ></TextField>
      </Box>
      <Box sx={{ padding: 1, borderRadius: 3, height: "70vh" }}>
        <Box
        onClick={()=>{navigate('chat')}}
          sx={{ marginTop: 1, display: "flex", flexDirection: "row", alignItems: "center" ,cursor:"pointer"}}
        >
          <Avatar sx={{ width: 56, height: 56 }}/>
          <Typography sx={{ marginLeft: 1,fontWeight:300 }}  variant="h6">Name</Typography>
        </Box>
        <Box
          sx={{marginTop: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar sx={{ width: 56, height: 56 }}/>
          <Typography sx={{ marginLeft: 1,fontWeight:300 }} variant="h6">Name</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default UserText;
