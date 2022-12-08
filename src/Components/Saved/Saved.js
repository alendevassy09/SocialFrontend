import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Posts from "../SharedComponents/Posts/Post";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { savedUpdate } from "../../Redux/SavedSlice";
import axios from '../../Axios/axios'
import { useState } from "react";

function Saved() {
  let token = localStorage.getItem("userToken");

  let dispatch=useDispatch()
  // const saved=useSelector((state)=>state.saved.saved)
  let [saved,setSaved]=useState([])
  const [loading,setLoading]=useState(true)
  const [value] = React.useState(0);
console.log("this is saved ",saved);
  console.log("this the value", value);
  // const handleChange = (event, newValue) => {
  //   setValue(2);
  //   console.log("1");
  //   console.log(value);
  // };
  useEffect(()=>{
    axios.get("/getsaved", { headers: { token } }).then((response) => {
      console.log("this is inside saved for redux");
      console.log( response.data);
      setSaved(response.data)
      setLoading(false)
      dispatch(
        savedUpdate({
          saved:response.data
        })
      )
    })
  },[])

  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%" },
        minHeight: "100vh",
        maxHeight: "auto",
        display:"flex",
        flexDirection:saved.length>2?"column-reverse":"column",
        marginTop:{md:10,xs:0}
      }}
    >
      {!saved[0] ? (
        <Box
          sx={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading?<CircularProgress />:<Typography> No Saved Posts </Typography>}
        </Box>
      ) : (
        saved.map((obj) => {
          return <Posts key={obj._id} id={obj._id} data={{...obj,area:"saved"}}></Posts>;
        })
      )}
    </Box>
  );
}

export default Saved;
