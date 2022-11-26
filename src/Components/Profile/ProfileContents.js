import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Posts from "../Posts/Post";
import { useSelector } from "react-redux";
import {} from "../../Redux/PostSlice";

function ProfileContents() {
  const posts = useSelector((state) => state.post.post);
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
          return <Posts key={obj._id} id={obj._id} data={obj}></Posts>;
        })
      )}
    </Box>
  );
}

export default ProfileContents;
