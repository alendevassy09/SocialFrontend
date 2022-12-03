import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import axios from '../../Axios/axios';
function Suggested(props) {
  const token = localStorage.getItem("userToken");
  const [follow, setFollow] = useState(false);
  //let[data,setData]=useState(data = props.data) 
  let data = props.data;

  
  function followUser(id) {
    axios
    .post("/follow", { userId: id }, { headers: { token } })
    .then((response) => {
      setFollow(true)
    });
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#e1e1e1",
        marginTop: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      {console.log(data.user,"00000=--0-0")}
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Avatar
          sx={{
            width: { md: 36, lg: 56 },
            height: { md: 36, lg: 56 },
            border: "solid",
            borderWidth: "large",
            borderColor: "#023047",
          }}
          alt="Remy Sharp"
          src={
           !data.user.profile
              ?`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png` 
              : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.user.profile}.png`
              
          }
        />
        <Typography variant="h6">
          {data.user.firstName.toUpperCase()}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography>{data.postCount} Posts</Typography>
        <Typography>{data.num} Followers</Typography>
      </Box>
      {!follow ? (
        <Button
          onClick={() => {
            followUser(data.user._id);
          }}
          sx={{ marginBottom: 1, borderRadius: 2 }}
          variant="text"
        >
          follow
        </Button>
      ) : (
        <Button
          onClick={() => {
            followUser(data.user._id);
          }}
          sx={{ marginBottom: 1, borderRadius: 2 }}
          variant="text"
        >
          following
        </Button>
      )}
    </Box>
  );
}

export default Suggested;
