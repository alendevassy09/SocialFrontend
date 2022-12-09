import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function BasicSpeedDial() {
  let navigate = useNavigate();
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 90,
        right: 21,
        zIndex: 7,
        width: 33,
        heigth: 33,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{}}
        icon={<AccountCircle fontSize="large" />}
      >
        <SpeedDialAction
          onClick={() => {
            console.log("profile");
            navigate("/home/profile");
          }}
          icon={<AccountCircle />}
        ></SpeedDialAction>
        <SpeedDialAction
          onClick={() => {
            localStorage.removeItem("userToken");
            navigate("/");
          }}
          icon={<Logout />}
        ></SpeedDialAction>
      </SpeedDial>
    </Box>
  );
}

export default BasicSpeedDial;
