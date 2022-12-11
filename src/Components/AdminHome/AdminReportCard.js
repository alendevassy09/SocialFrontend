import { Report } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "../../Axios/axios";
function AdminReportCard(props) {
    let [display,setDisplay]=useState(true)
  function deletePost(id) {

    axios.patch("/admin/removePost", { post: id }).then((response)=>{
        setDisplay(false)
    })
  }
  function ignore(id){
    axios.patch("/admin/ignore", { id: id }).then((response)=>{
        setDisplay(false)
    })
  }

  let data = props.data;
  return (
    <Box sx={{ width: "70%", display: display?"flex":"none" }}>
      <Box sx={{ width: "50%", padding: 2 }}>
        <Card sx={{ maxWidth: "100%" }}>
          <CardMedia
            component="img"
            image={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.postId.postId}.png`}
            alt="green iguana"
          />
        </Card>
      </Box>
      <Box
        sx={{
          width: "50%",
          padding: 2,
          diaplay: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: { md: 36, lg: 56 },
              height: { md: 36, lg: 56 },
              //border: "solid",
              // borderWidth: "large",
              // borderColor: "#fd1d1d",
              position: "relative",
              marginRight: 1,
            }}
            aria-label="recipe"
            src={
              !data.postId.user.profile
                ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.postId.user.profile}.png`
            }
          >
            R
          </Avatar>
          <Box>
            {data.postId.user.firstName.toUpperCase() +
              " " +
              data.postId.user.LastName.toUpperCase()}
          </Box>
        </Box>
        <Divider sx={{ marginY: 1 }}></Divider>
        {data.type1 && (
          <Box display={"flex"}>
            <Typography>
              <Report color="warning"></Report>
            </Typography>
            <Typography>Its a Spam</Typography>
          </Box>
        )}
        {data.type2 && (
          <Box display={"flex"}>
            <Typography>
              <Report color="warning"></Report>
            </Typography>
            <Typography>Hate Speech or Symbol</Typography>
          </Box>
        )}
        {data.type3 && (
          <Box display={"flex"}>
            <Typography>
              <Report color="warning"></Report>
            </Typography>
            <Typography>False Information</Typography>
          </Box>
        )}
        {data.type4 && (
          <Box display={"flex"}>
            <Typography>
              <Report color="warning"></Report>
            </Typography>
            <Typography>I Just Don't Like It</Typography>
          </Box>
        )}
        <Box>
          <Button
            onClick={() => {
              deletePost(data.postId);
            }}
            sx={{ marginTop: "auto" }}
            variant="outlined"
            color="warning"
          >
            Remove Post
          </Button>
          <Button
          onClick={() => {
            ignore(data._id);
          }}
            sx={{ marginTop: "auto", marginLeft: 1 }}
            variant="outlined"
            color="success"
          >
            Ignore
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default AdminReportCard;
