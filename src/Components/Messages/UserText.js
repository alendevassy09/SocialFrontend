import { Search } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
function UserText() {
  let navigate = useNavigate();
  const [users, SetUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [empty, setEmpty] = useState(false);
  const [loading,setLoading]=useState(true)
  function chatBox(user) {
    localStorage.setItem("chatTo", JSON.stringify(user));
    console.log(user);
    navigate("chat");
  }
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    axios.get("/getChats", { headers: { token } }).then((response) => {
      setLoading(false)
      console.log(response.data.chats, "-=+++-=-");
      SetUsers(response.data.chats);
      // dispatch(
      //   FollowersUpdate({
      //     Followers:response.data
      //   })
      // )
    });
  }, []);

  const doSearch = (event) => {
    setSearchBar(event.target.value);
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
            // setSearchResult(response.data);
            setSearch(response.data);
            if (!response.data[0]) {
              setEmpty(true);
            } else {
              setEmpty(false);
            }
          } else {
            // setSearchResult([]);
            setSearch([]);
            setEmpty(false);
          }
        }
      });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        padding: 2,
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#e5d9f2",
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Search fontSize="large"></Search>
        <TextField
          value={searchBar}
          variant="standard"
          onChange={doSearch}
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="Search"
        ></TextField>
      </Box>
      <Box
        sx={{
          padding: 1,
          borderRadius: 3,
          height: "70vh",
          width: "95%",
        }}
      >
        {empty ? <p>No Results Found</p> : ""}
        {search[0] ? (
          search.map((obj) => {
            return (
              <Button
                key={obj._id}
                variant="text"
                onClick={() => chatBox(obj)}
                sx={{
                  width: "95%",
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Avatar
                    src={
                      obj.profile
                        ? `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${obj.profile}.png`
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png`
                    }
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography
                    sx={{ marginLeft: 1, fontWeight: 300 }}
                    variant="h6"
                  >
                    {obj.firstName + " " + obj.LastName}
                  </Typography>
                </Box>
              </Button>
            );
          })
        ) : users[0] !== undefined ? (
          users.map((obj) => {
            return (
              <Button
                key={obj._id}
                variant="text"
                onClick={() => chatBox(obj)}
                sx={{
                  width: "95%",
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Avatar
                    src={
                      obj.profile
                        ? `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${obj.profile}.png`
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png`
                    }
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography
                    sx={{ marginLeft: 1, fontWeight: 300 }}
                    variant="h6"
                  >
                    {obj.firstName + " " + obj.LastName}
                  </Typography>
                </Box>
              </Button>
            );
          })
        ) : (
          <Button
            variant="text"
            sx={{
              width: "95%",
              marginTop: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              color: "black",
            }}
          >
            <Box
              sx={{
                width: "95%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {loading ? (
                <CircularProgress
                  sx={{ marginLeft: "48%", marginTop: "10%" }}
                />
              ) : (
                <Typography
                  sx={{ marginLeft: 1, fontWeight: 300 }}
                  variant="h6"
                >
                  No Conversations
                </Typography>
              )}
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default UserText;
