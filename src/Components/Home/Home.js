import React from "react";
// import Header from "../Header/Header";
import SideBar from "../SharedComponents/SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import RightBar from "../RightBar/RightBar";
import { Box, Stack } from "@mui/material";
import Add from "../Add/Add";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUpdate } from "../../Redux/PostSlice";
import { useEffect } from "react";
import axios from "../../Axios/axios";
import BottomBar from "../BottomBar/BottomBar";
import BasicSpeedDial from "../SpeedDial/BasicSpeedDial";
import ProfileModal from "../SharedComponents/ProfileModal";
import { useState } from "react";
import ReportModal from "../SharedComponents/ReportModal"
function Home() {
  const [feed,setFeed]=useState(false)
  const dispatch = useDispatch();
  let token = localStorage.getItem("userToken");
  useEffect(() => {
    axios.get("/getPost", { headers: { token } }).then((response) => {
      dispatch(
        postUpdate({
          post: response.data,
        })
      );
      setFeed(true)
    }).catch((err)=>{
      console.log("there is an error with post loading");
    })
    // axios.get("/getStory", { headers: { token } }).then((response) => {
    //   dispatch(
    //     storyUpdate({
    //       story: response.data,
    //     })
    //   );
    // });
  }, []);

  return (
    <div>
      <Box sx={{ backgroundColor: "#f1faee" }}>
        {/* <NavBar></NavBar> */}
        <Box sx={{ display: { lg: "none", xs: "flex" } }}>
          <BasicSpeedDial></BasicSpeedDial>
        </Box>
        <Stack direction="row" spacing={{ md: 2 }}>
          <Box sx={{ display: { xs: "none", md: "block" } }} width="34%">
            <SideBar data={{ home: true }}></SideBar>
          </Box>
          <Box
            sx={{
              width: { lg: "32%", md: "66%", xs: "100%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { md: "40%", xs: "100%" },
                position: "fixed",
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                zIndex: 3,
                padding: 1,

                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <TopBar></TopBar>
            </Box>

            <Outlet></Outlet>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "none", lg: "block", width: "34%" },
            }}
          >
            <RightBar></RightBar>
          </Box>
        </Stack>
        <Add></Add>
        <ProfileModal></ProfileModal>
        <ReportModal></ReportModal>
        <Box
          sx={{
            position: "fixed",
            bottom: 1,
            width: "100%",
            backgroundColor: "#1F3541",
            zIndex: 1,
            display: { xs: "block", md: "none" },
          }}
        >
          <BottomBar></BottomBar>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
// window.onbeforeunload = function(event) {
//   axios
//     .get("/online", { headers: { token, status: false } })
//     .then((response) => {
//       (response);
//     });
// };
