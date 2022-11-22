import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import axios from "../../Axios/axios";
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
  const data = props.data.user;
  const token = localStorage.getItem("userToken");
  console.log(data.status);
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

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        
        width:"100%",
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
            borderColor: "#fd1d1d",
            }}
          alt="Remy Sharp"
          src="http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/01/Alone-Very-Nice-Dp.jpg"
        />
      </StyledBadge>
      <Typography sx={{ marginLeft: 1 }}>
        {data.firstName.toUpperCase()}{" "}
      </Typography>

      <Typography
        onClick={follow}
        sx={{
          
          color: "#14213d",
          borderRadius: 2,
          backgroundColor: "#a594f9",
          padding: 1,
          fontSize: 11,
          cursor: "pointer",
          marginLeft:"auto"
        }}
      >
        {followStatus ? "unfollow" : "follow"}
      </Typography>
    </Box>
  );
}

export default Friends;
