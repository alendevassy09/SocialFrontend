import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Friends from "../../Friends/Friends";
import { useState } from "react";
import axios from "../../../Axios/axios";
import { useEffect } from "react";
import { FollowersUpdate } from "../../../Redux/FollowersSlice";
import { useSelector, useDispatch } from "react-redux";
function SideBar(props) {
  let data = props.data;
  const following = useSelector((state) => state.following.Followers);
  const dispatch = useDispatch();
  let token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [loading,setLoading]=useState(false)
  const [empty, setEmpty] = useState(false);
  const [searchLoading, setsearchLoading] = useState(false);
  useEffect(() => {
    axios.get("/getFriends", { headers: { token } }).then((response) => {
      setLoading(false);
      dispatch(
        FollowersUpdate({
          Followers: response.data,
        })
      );
    });
  }, []);

  const doSearch = (event) => {
    setsearchLoading(true)
    axios
      .get("/search", {
        headers: { name: event.target.value.trim(), token: token },
      })
      .then((response) => {
        if (response.data.status === false) {
          console.log(response);
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          console.log(response.data);
          if (event.target.value !== "") {
            setSearchResult(response.data);
            setsearchLoading(false)
            if (!response.data[0]) {
              setsearchLoading(false)
              setEmpty(true);
            } else {
              setEmpty(false);
              setsearchLoading(false)
            }
          } else {
            setsearchLoading(false)
            setSearchResult([]);
            setEmpty(false);
          }
        }
      });
  };
  return (
    <Box
      sx={{
        display: data.home
          ? { xs: "none", sm: "flex" }
          : { xs: "flex", md: "none" },
        width: "100%",
        height: "90vh",
        justifyContent: "end",
      }}
    >
      {/* <ProfileModal></ProfileModal> */}
      <Box
        sx={{
          backgroundColor: "#e9e9e9",
          color: "black",
          width: data.home ? "24%" : "100%",
          height: "90%",
          position: "fixed",
          marginLeft: data.home ? { lg: 3, md: 1 } : 0,
          marginTop: data.home ? 1.5 : 0,
          borderTopLeftRadius: data.home ? 20 : 0,
          borderBottomLeftRadius: data.home ? 20 : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: data.home ? 3 : 0,
        }}
      >
        <Box
          sx={{
            width: "80%",
            backgroundColor: "#a594f9",
            minHeight: 50,
            borderRadius: 5,
            boxShadow: 2,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            flexDirection: "column",
            marginTop: data.home ? 0 : 1,
          }}
        >
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <Search fontSize="large"></Search>
            <TextField
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="Search"
              onChange={doSearch}
            ></TextField>
            {searchLoading&&<CircularProgress color="secondary" size={"1.7rem"}/>}
          </Box>
        </Box>
        {empty ? <p>No Results Found</p> : ""}
        {!searchResult[0] ? (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Following</Typography>
            </Box>
            <Box sx={{ width: "100%", borderTop: 1, marginTop: 2 }}>
              {following[0] ? (
                following.map((obj) => {
                  return (
                    <Friends key={obj._id} data={{ user: obj.user }}></Friends>
                  );
                })
              ) : loading ? (
                <CircularProgress sx={{marginLeft:"45%",marginTop:3}} />
              ) : (
                "You are not following anyone"
              )}
            </Box>
          </Box>
        ) : !searchResult.length > 6 ? (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">From Search</Typography>
            </Box>
            <Box
              sx={{ width: "100%", height: "80%", borderTop: 1, marginTop: 2 }}
            >
              {searchResult.map((obj) => {
                return <Friends key={obj._id} data={{ user: obj }}></Friends>;
              })}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "80%",
              minHeigth: "70%",
              overflowX: "hidded",
              overflow: "scroll",
              marginTop: 2,
              "&::-webkit-scrollbar": {
                width: "5px",
              },

              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">From Search</Typography>
            </Box>
            <Box
              sx={{ width: "100%", height: "80%", borderTop: 1, marginTop: 2 }}
            >
              {searchResult.map((obj) => {
                return <Friends key={obj._id} data={{ user: obj }}></Friends>;
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SideBar;
