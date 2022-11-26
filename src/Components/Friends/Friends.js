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
          src="data:image/jpeg;base64,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"
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
