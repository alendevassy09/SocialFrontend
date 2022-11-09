import React from "react";
// import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import NavBar from "../navBar/navBar";
import { Box, Stack } from "@mui/material";
import Add from "../Add/Add";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUpdate } from "../../Redux/PostSlice";
import { useEffect } from "react";
import axios from '../../Axios/axios'
function Home() {
  const dispatch=useDispatch()
  useEffect(() => {
    axios.get("/getPost").then((response) => {
      //SetPost(response.data);
      console.log(response);
      dispatch(
        postUpdate({
          post: response.data,
        })
      )
    })
  }, []);
  return (
    <div>
      <Box sx={{ backgroundColor: "#f9fbe7" }}>
        <NavBar></NavBar>

        <Stack direction="row" spacing={{ md: 3 }}>
          <Box sx={{ display: { xs: "none", md: "block" } }} width="27%">
            <SideBar></SideBar>
          </Box>
          <Box sx={{ width: { md: "73%", xs: "100%" } }}>
            <Outlet></Outlet>
          </Box>
        </Stack>
        <Add></Add>
      </Box>
    </div>
  );
}

export default Home;
