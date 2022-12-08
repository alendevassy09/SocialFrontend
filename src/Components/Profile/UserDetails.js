import { CheckCircle, Edit } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

function UserDetails() {
  const [data,setData]=useState(JSON.parse(localStorage.getItem("userData")));
  const [fname, setFname] = useState(true);
  const[lname,setLname]=useState(true)
  const[email,setEmail]=useState(true)
  return (
    <Box sx={{ width: "100%", height: "50%" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {fname ? (
          <Typography>First Name : {data.firstName}</Typography>
        ) : (
          <TextField id="outlined-size-small" size="small"></TextField>
        )}
        {fname ? (
          <Typography>
            <Edit
              onClick={() => {
                setFname(false);
                // setCheck(true)
              }}
              fontSize="medium"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></Edit>
          </Typography>
        ) : (
          <Typography>
            <CheckCircle
              onClick={() => {
                setFname(true);
              }}
              fontSize="large"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></CheckCircle>
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {lname ? (
          <Typography>First Name : {data.LastName}</Typography>
        ) : (
          <TextField id="outlined-size-small" size="small"></TextField>
        )}
        {lname ? (
          <Typography>
            <Edit
              onClick={() => {
                setLname(false);
                // setCheck(true)
              }}
              fontSize="medium"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></Edit>
          </Typography>
        ) : (
          <Typography>
            <CheckCircle
              onClick={() => {
                setLname(true);
              }}
              fontSize="large"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></CheckCircle>
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {email ? (
          <Typography>First Name : {data.email}</Typography>
        ) : (
          <TextField id="outlined-size-small" size="small"></TextField>
        )}
        {email ? (
          <Typography>
            <Edit
              onClick={() => {
                setEmail(false);
                // setCheck(true)
              }}
              fontSize="medium"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></Edit>
          </Typography>
        ) : (
          <Typography>
            <CheckCircle
              onClick={() => {
                setEmail(true);
              }}
              fontSize="large"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></CheckCircle>
          </Typography>
        )}
      </Box>
      
    </Box>
  );
}

export default UserDetails;
