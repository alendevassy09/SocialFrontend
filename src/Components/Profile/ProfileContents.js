import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Posts from "../SharedComponents/Posts/Post";
import {} from "../../Redux/PostSlice";
import { useState } from "react";
import { useEffect } from "react";
import axios from '../../Axios/axios'
function ProfileContents() {
  const token = localStorage.getItem("userToken");
  const [posts,setPost]=useState([])
  useEffect(()=>{
    axios.get('/mypost',{headers:{token}}).then((response)=>{
     setPost(response.data) 
     console.log(response.data);
    })
  },[])
  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%" },
        minHeight: "100vh",
        maxHeight: "auto",
      }}
    >
      {!posts[0] ? (
        <Box
          sx={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        posts.map((obj) => {
          return <Posts key={obj._id} id={obj._id} data={{...obj,area:"profile"}}></Posts>;
        })
      )}
    </Box>
  );
}

export default ProfileContents;
