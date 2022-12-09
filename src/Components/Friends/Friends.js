import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import axios from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { singleProfileUpdate } from "../../Redux/SingleProfileSlice";
import { openUpdate } from "../../Redux/profileModalSlice";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
function Friends(props) {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const data = props.data.user;
  const token = localStorage.getItem("userToken");
  const [followStatus, SetFollowStatus] = useState(
    data.status === true || data.status === false ? data.status : true
  );
  const follow = () => {
    axios
      .post("/follow", { userId: data._id }, { headers: { token } })
      .then((response) => {
        SetFollowStatus(response.data.status);
      });
  };
  function profielModal(open, id) {
    console.log(id);
    localStorage.setItem("profileModal", JSON.stringify(id));

    dispatch(
      openUpdate({
        open: open,
      })
    );
    dispatch(
      singleProfileUpdate({
        singleProfile: { user: id },
      })
    );
  }
  function session(call) {
    axios
      .get("/authCheck", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        if (!response.data.status) {
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          // likePost()
          call()
        }
      });
  }

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          sx={{
            width: { md: 36, lg: 56 },
            height: { md: 36, lg: 56 },
            border: "solid",
            borderWidth: "large",
            borderColor: "#9c89b8",
          }}
          alt="Remy Sharp"
          src={
            !data.profile
              ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
              : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.profile}.png`
          }
        />
      </StyledBadge>
      <Typography
        onClick={() => {
          profielModal(true, data);
        }}
        sx={{ marginLeft: 1, cursor: "pointer" }}
      >
        {data.firstName.toUpperCase()}{" "}
      </Typography>
      {/* {followStatus ? (
        <Button
          color="secondary"
          disabled={false}
          size="small"
          variant="elevated"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          color="secondary"
          disabled={false}
          size="small"
          variant="elevated"
        >
          Follow
        </Button>
      )} */}
      <Typography
        onClick={()=>session(follow)}
        sx={{
          color: "#14213d",
          borderRadius: 2,
          backgroundColor: "#a594f9",
          padding: 1,
          fontSize: 11,
          cursor: "pointer",
          marginLeft: "auto",
          width:"19%",
          textAlign:"center"
        }}
      >
        {followStatus ? "Unfollow" : "Follow"}
      </Typography>
    </Box>
  );
}

export default Friends;
