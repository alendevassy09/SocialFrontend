import { Box, CircularProgress, IconButton } from "@mui/material";
import React from "react";
import Posts from "../Posts/Post";
import { useSelector } from "react-redux";

function Saved() {
  const posts = useSelector((state) => state.post.post);
  const [value, setValue] = React.useState(0);

  console.log("this the value", value);
  const handleChange = (event, newValue) => {
    setValue(2);
    console.log("1");
    console.log(value);
  };

  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%" },
        minHeight: "100vh",
        maxHeight: "auto",
        marginTop:{md:10,xs:0}
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

export default Saved;
