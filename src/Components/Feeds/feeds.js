import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Post";
import { useSelector } from "react-redux";
import {  } from "../../Redux/PostSlice";

function feeds() {
  const posts = useSelector((state) => state.post.post);
  console.log(posts);
  return (
    <Box sx={{ width: { md: "50%", xs: "100%" } }} p={{ md: 2 }}>

      {!posts[0]?<Box sx={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignContent:"center"}}><CircularProgress /></Box>:posts.map((obj) => {
        return <Posts data={obj}></Posts>;
      })}
      
    </Box>
  );
}

export default feeds;
