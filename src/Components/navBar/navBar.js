import { styled } from "@mui/material/styles";
import { ChildCare, Search } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import React from "react";
import { InputBase, Avatar, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "3px",
  borderRadius: "16px",
  width: "32%",
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
function navBar() {
  const navigate = useNavigate();
  const [openMenu, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const doSearch = (event) => {
    let token=localStorage.getItem('userToken') 
    axios
      .get("/search", { headers: { name: event.target.value,token:token} })
      .then((response) => {
        if(response.data.status===false){
          console.log(response);
          localStorage.removeItem("userToken")
          navigate('/')
        }else{
          console.log(response);
          setSearchResult(response.data);
        }
        
      });
  };

  const name = useSelector((state) => state.user.fname);
  console.log(name);

  return (
    <AppBar position="sticky" sx={{backgroundColor:"#ff5252"}}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          {name}
        </Typography>
        <ChildCare sx={{ display: { xs: "block", sm: "none" } }}></ChildCare>
        <SearchBar sx={{ display: { md: "block", xs: "none" } }}>
          <InputBase
            onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}
            onChange={doSearch}
            sx={{ width: "90%"}}
            placeholder="Search"
          ></InputBase>

          <Box
            display={search ? "block" : "none"}
            sx={{
              width: "31.50%",
              overflowY: "scroll",
              msScrollRails: "none",
              maxHeight: 300,
              backgroundColor: "white",
              boxShadow: 2,
              position: "absolute",
              top: "90%",
              borderRadius: 3,
            }}
          >
            {searchResult.map((obj) => {
              return (
                <Box
                  p={3}
                  display={"flex"}
                  color="black"
                  gap={2}
                  flexDirection={"column"}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: 1 }}>
                        <Avatar
                          sx={{ bgcolor: "yellow" }}
                          alt="Remy Sharp"
                          src="/broken-image.jpg"
                        >
                          B
                        </Avatar>
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={100}>
                          {obj.firstName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography fontSize={14} color="skyblue">
                        Follow
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </SearchBar>

        <Icons>
          <Avatar onClick={(e) => setOpen(true)} sx={{ width: 30, height: 30 }}>
            A
          </Avatar>
        </Icons>
        <UserBox>
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            aria-label="search"
          >
            <Search />
          </IconButton>
          <Avatar onClick={(e) => setOpen(true)} sx={{ width: 30, height: 30 }}>
            A
          </Avatar>
          <Typography variant="span">Alen</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openMenu}
        onClick={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("userToken");
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      {/* <Box p={3} position={"absolute"} zIndex={1}  sx={{left:{md:"35%",xs:"4%"},right:{md:"35%",xs:"4%"},top:"80%",marginTop:2,borderRadius:3,width:{xs:"84%",md:"30%"}}}  bgcolor={"coral"} color={"black"} height={"40%"} maxHeight="50%">asfsafsadfasfd</Box> */}
    </AppBar>
  );
}

export default navBar;
