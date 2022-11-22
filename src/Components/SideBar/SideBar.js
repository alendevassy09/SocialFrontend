import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Friends from "../Friends/Friends";
import { useState } from "react";
import axios from "../../Axios/axios";
import { useEffect } from "react";
import { FollowersUpdate } from "../../Redux/FollowersSlice";
import { useSelector,useDispatch } from "react-redux";
function SideBar() {
  const following = useSelector((state) => state.following.Followers);
  const dispatch=useDispatch()  
  let token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [empty,setEmpty]=useState(false)

  useEffect(() => {
    axios.get("/getFriends", { headers: { token } }).then((response) => {
      console.log(response.data,'-=-=-');
      dispatch(
        FollowersUpdate({
          Followers:response.data
        })
      )
    });
  }, []);

  const doSearch = (event) => {
    axios
      .get("/search", { headers: { name: event.target.value, token: token } })
      .then((response) => {
        if (response.data.status === false) {
          console.log(response);
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          console.log(response.data);
          if (event.target.value !== "") {
            setSearchResult(response.data);
            if(!response.data[0]){
              setEmpty(true)
             }else{
              setEmpty(false)
             }
          } else {
            setSearchResult([]);
            setEmpty(false)
          }
        }
      });
  };
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        width: "100%",
        height: "90vh",
        justifyContent: "end",
        
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e9e9e9",
          color:"black",
          width: "24%",
          height: "90%",
          position: "fixed",
          marginLeft: { lg: 3, md: 1 },
          marginTop: 1.5,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          
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
          </Box>
          
        </Box>
        {empty? <p>No Results Found</p>:""}
        {!searchResult[0] ? (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Following</Typography>
            </Box>
            <Box sx={{ width: "100%", borderTop: 1, marginTop: 2 }}>
              {following[0]
                ? following.map((obj) => {
                  
                    return <Friends key={obj._id} data={{user:obj.user}}></Friends>;
                  })
                : "You are not following anyone"}
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "80%", marginTop: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">From Search</Typography>
            </Box>
            <Box sx={{ width: "100%", borderTop: 1, marginTop: 2 }}>
              {searchResult.map((obj) => {
                
                return <Friends key={obj._id} data={{user:obj}}></Friends>;
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SideBar;

