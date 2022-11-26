import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React from "react";
import Posts from "../Posts/Post";
import { useSelector } from "react-redux";
import {} from "../../Redux/PostSlice";
import Test from "./test";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AddCircle, Badge } from "@mui/icons-material";
import { style } from "@mui/system";
const SmallAvatar = style(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
function feeds() {
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
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 70,
          backgroundColor: "#e9e9e9",
          marginTop: 1,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",

          overflowY: "hidden",
          "&::-webkit-scrollbar ": {
            display: "none",
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          indicator="none"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
            gap: 1,
            "& .MuiTabs-indicator": {
              display: "none",
              //backgroundColor: "orange"
            },
            scrollBehavior: "smooth",
          }}
          ScrollButtonComponent={(props) => {
            console.log("this is the props", props);
            if (props.direction === "left" && !props.disabled) {
              return (
                <IconButton
                  {...props}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e9e9e9",
                    },
                  }}
                >
                  <ChevronLeftIcon fontSize="small"></ChevronLeftIcon>
                </IconButton>
              );
            } else if (props.direction === "right" && !props.disabled) {
              return (
                <IconButton
                  {...props}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e9e9e9",
                    },
                  }}
                >
                  <ChevronRightIcon fontSize="small"></ChevronRightIcon>
                </IconButton>
              );
            } else {
              return null;
            }
          }}
        >
          
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
          <Test></Test>
        </Tabs>
      </Box>

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
