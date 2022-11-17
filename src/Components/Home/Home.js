import React from "react";
// import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import NavBar from "../navBar/navBar";
import TopBar from "../TopBar/TopBar";
import RightBar from "../RightBar/rightBar";
import { Box, Stack } from "@mui/material";
import Add from "../Add/Add";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUpdate } from "../../Redux/PostSlice";
import { useEffect } from "react";
import axios from "../../Axios/axios";
function Home() {
  const dispatch = useDispatch();
  let token=localStorage.getItem('userToken')
  useEffect(() => {
    axios.get("/getPost",{headers:{token}}).then((response) => {
      //SetPost(response.data);
      console.log(response);
      dispatch(
        postUpdate({
          post: response.data,
        })
      );
    });
  }, []);
  return (
    <div>
      <Box sx={{ backgroundColor: "#ced4da" }}>
        {/* <NavBar></NavBar> */}

        <Stack direction="row" spacing={{ md: 2 }}>
          <Box sx={{ display: { xs: "none", md: "block" } }} width="34%">
            <SideBar></SideBar>
          </Box>
          <Box sx={{ width: { md: "32%", xs: "100%" },display:"flex",justifyContent:"center" }}>
            <Box
              sx={{
                width: { md: "40%", xs: "100%" },
                position: "fixed",
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                zIndex:1,
                padding:1,
                
                display:"flex",
                justifyContent:"center",
                
              }}
            >
              <TopBar></TopBar>
            </Box>

            <Outlet></Outlet>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }} width="34%">
            <RightBar></RightBar>
          </Box>
        </Stack>
        <Add></Add>
      </Box>
    </div>
  );
}

export default Home;
