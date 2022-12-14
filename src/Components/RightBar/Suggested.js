import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import axios from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { singleProfileUpdate } from "../../Redux/SingleProfileSlice";
import { openUpdate } from "../../Redux/profileModalSlice";
import { useNavigate } from "react-router-dom";
function Suggested(props) {
  let navigate=useNavigate()
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const [follow, setFollow] = useState(false);
  //let[data,setData]=useState(data = props.data)
  let data = props.data;

  const  followUser=(id)=> {
    axios.post("/follow", { userId: id }, { headers: { token } });
  }
  function profielModal(open, id) {
    console.log(id);
    localStorage.setItem("profileModal", JSON.stringify(id));

    dispatch(
      singleProfileUpdate({
        singleProfile: id,
      })
    );
    dispatch(
      openUpdate({
        open: open,
      })
    );
  }
  function session(call,id) {
    axios
      .get("/authCheck", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        if (!response.data.status) {
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          // likePost()
          call(id)
        }
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
      {console.log(data.user, "00000=--0-0")}
      <Box
        sx={{
          width: "80%",
          display: "flex",
          //justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Avatar
        onClick={() => {
          profielModal(true, data);
        }}
          sx={{
            width: { md: 30, lg: 50 },
            height: { md: 30, lg: 50 },
            border: "solid",
            borderWidth: "large",
            borderColor: "#9c89b8",
            marginLeft:3,
            cursor:"pointer"
          }}
          alt="Remy Sharp"
          src={
            !data.user.profile
              ? `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png`
              : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.user.profile}.png`
          }
        />
        <Typography
          onClick={() => {
            profielModal(true, data);
          }}
          variant="h6"
          sx={{ cursor: "pointer",marginLeft:4 }}
        >
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
            
            session(followUser,data.user._id)
            setFollow(true)
          }}
          sx={{ marginBottom: 1, borderRadius: 2 }}
          variant="text"
        >
          follow
        </Button>
      ) : (
        <Button
          onClick={() => {
            session(followUser,data.user._id)
            setFollow(false)
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
