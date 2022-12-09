import { Box, CircularProgress, IconButton } from "@mui/material";
import React from "react";
import Posts from "../SharedComponents/Posts/Post";
import { useSelector } from "react-redux";
import Story from "./Stories";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function feeds() {
  const posts = useSelector((state) => state.post.post);
  console.log(posts);
  const story = useSelector((state) => state.story.story);
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
      {/* <StoryModal></StoryModal> */}
      {story[0]?
        <Box
          sx={{
            width: "100%",
            // height: 90,
            // backgroundColor: "#e9e9e9",
            marginTop: 1,
            marginBottom: 2,
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
            {story[0]
              ? story.map((obj) => {
                
                  return <Story key={obj._id} data={obj}></Story>;
                })
              : ""}
          </Tabs>
        </Box>:<Box sx={{width:"100%",height:20}}></Box>
      }
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
          
          return <Posts key={obj._id} id={obj._id} data={{...obj,area:"home"}}></Posts>;
        })
      )}
    </Box>
  );
}

export default feeds;
