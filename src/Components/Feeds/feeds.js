import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Post";
import { useSelector } from "react-redux";
import {} from "../../Redux/PostSlice";
function feeds() {
  const posts = useSelector((state) => state.post.post);
  return (
    <Box sx={{ width: { md: "100%", xs: "100%" } }}>
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
          return <Posts key={obj._id} id={obj._id} data={obj}></Posts>;
        })
      )}
    </Box>
  );
}

export default feeds;
