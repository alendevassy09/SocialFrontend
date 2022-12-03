import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openUpdate } from "../../Redux/StoryModalSlice";
import { singleStoryUpdate } from "../../Redux/SingleStorySlice";
import axios from "../../Axios/axios";
function Story(props) {
  const token = localStorage.getItem("userToken");

  let dispatch = useDispatch();
  let data = props.data;
  let stat = useSelector((state) => state.open.open);
  const setOpen = (open) => {
    console.log(data);
    console.log(stat, open);
    dispatch(
      openUpdate({
        open: open,
      })
    );
    dispatch(
      singleStoryUpdate({
        singleStory: data,
      })
    );
    console.log(data);
    axios
      .patch("/seenStory", { storyId: data._id }, { headers: { token: token } })
      .then((response) => {});
  };
  return (
    <Box sx={{textAlign:"center"}}>
      <Avatar
        onClick={() => setOpen(true)}
        sx={{
          width: 56,
          height: 56,
          border: "solid",
          borderWidth: "large",
          borderColor: "#e63946",
          marginLeft: 1,
          "&:hover": {
            boxShadow: 6,
          },
        }}
        alt="Remy Sharp"
        src={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.user.profile}.png`}
      />
      <Typography sx={{paddingLeft:1}}>{data.user.firstName}</Typography>
    </Box>
  );
}

export default Story;
