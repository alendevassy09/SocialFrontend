import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Friends from "../Friends/Friends";
import { useState } from "react";
import axios from "../../Axios/axios";
import { useEffect } from "react";
import { FollowersUpdate } from "../../Redux/FollowersSlice";
import { useSelector,useDispatch } from "react-redux";
function SideBar() {
  const following = useSelector((state) => state.following.Followers);
  const dispatch=useDispatch()  
  let token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get("/getFriends", { headers: { token } }).then((response) => {
      console.log(response.data,'-=-=-');
      dispatch(
        FollowersUpdate({
          Followers:response.data
        })
      )
    });
  }, []);

  const doSearch = (event) => {
    axios
      .get("/search", { headers: { name: event.target.value, token: token } })
      .then((response) => {
        if (response.data.status === false) {
          console.log(response);
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          console.log(response.data);
          if (event.target.value != "") {
            setSearchResult(response.data);
          } else {
            setSearchResult([]);
          }
        }
      });
  };
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        width: "100%",
        height: "90vh",
        justifyContent: "end",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EDF2F3",

          width: "24%",
          height: "90%",
          position: "fixed",
          marginLeft: { lg: 3, md: 1 },
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
            minHeight: 50,
            borderRadius: 5,
            boxShadow: 2,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            flexDirection: "column",
          }}
        >
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <Search fontSize="large"></Search>
            <TextField
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="Search"
              onChange={doSearch}
            ></TextField>
          </Box>
        </Box>
        {!searchResult[0] ? (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Following</Typography>
            </Box>
            <Box sx={{ width: "100%", borderTop: 1, marginTop: 2 }}>
              {following[0]
                ? following.map((obj) => {
                  
                    return <Friends key={obj._id} data={{user:obj.user}}></Friends>;
                  })
                : "You are not following anyone"}
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">From Search</Typography>
            </Box>
            <Box sx={{ width: "100%", borderTop: 1, marginTop: 2 }}>
              {searchResult.map((obj) => {
                
                return <Friends key={obj._id} data={{user:obj}}></Friends>;
              })}
            </Box>
          </Box>
        )}
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
