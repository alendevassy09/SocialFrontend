
import { Box } from "@mui/material";
import React from "react";
// import UserText from "./UserText";
import TrendingList from "./TrendingList";
function Trending() {
  return (
    <Box
      sx={{
        height: {md:"80vh",xs:"95vh"},
        width: "100%",
        display: "flex",
        justifyContent: "center",
        
        marginTop:{md:10},
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          width: "100%",
          heigth: "100%",
          borderRadius:3
        }}
      >
         <TrendingList></TrendingList>
        {/* <ChatBox></ChatBox> */}
        
      </Box>
    </Box>
  );
}

export default Trending;
