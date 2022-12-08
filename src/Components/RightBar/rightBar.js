import { Avatar, Box, CircularProgress, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Suggested from "./Suggested";
import { useState } from "react";
import axios from "../../Axios/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { suggestedUpdate } from "../../Redux/SuggestedSlice";
function rightBar() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("userToken");
  const [suggested, setSuggested] = useState([]);
  const [show, setShow] = useState(false);
  console.log("this is the redux suggested", suggested);
  const dispatch = useDispatch();
  const [openMenu, setOpen] = useState(false);
  const [firstName] = useState(
    userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)
  );
  const [lastName] = useState(
    userData.LastName.charAt(0).toUpperCase() + userData.LastName.slice(1)
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/notFollowed", { headers: { token: token } })
      .then((response) => {
        console.log("not followed", response.data);
        setShow(response.data.length > 0 ? true : false);
        console.log(show);
        setSuggested(response.data);
        dispatch(
          suggestedUpdate({
            suggested: response.data,
          })
        );
      });
  }, []);
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
          navigate(url);
        }
      });
  }
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
            width={"63%"}
          >
            <Box
              display={"flex"}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={(e) => setOpen(true)}
            >
              <Avatar
                sx={{ marginRight: 1 }}
                onClick={(e) => setOpen(true)}
                alt="Remy Sharp"
                src={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${userData.profile}.png`}
              />
              {firstName + " " + lastName}
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
          <MenuItem
            onClick={() => {
              console.log("profile");
              
              session("/home/profile")
            }}
          >
            Profile
          </MenuItem>
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
          {suggested && show
            ? Array.isArray(suggested) && suggested[0]
              ? suggested.map((obj) => {
                  return <Suggested data={obj}></Suggested>;
                })
              : <Box sx={{width:"100%",display:"flex",justifyContent:"center",paddingTop:1}}><CircularProgress/></Box> 
            : "Working on it"}
          {/* {Array.isArray(suggested) && suggested[0]
            ? suggested.slice(1).map((obj) => {
                return <Suggested data={obj}></Suggested>;
              })
            : "Please Wait...."} */}
        </Box>
      </Box>
    </Box>
  );
}

export default rightBar;
