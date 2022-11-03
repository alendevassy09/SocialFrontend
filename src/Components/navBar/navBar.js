import { styled } from "@mui/material/styles";
import { ChildCare, Notifications } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import { InputBase, Badge, Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width:"35%" ,
  justifyContent:"end"
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
  function logout() {
    localStorage.removeItem("auth");
    navigate("/");
  }
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          alen
        </Typography>
        <ChildCare sx={{ display: { xs: "block", sm: "none" } }}></ChildCare>
        <SearchBar>
          <InputBase></InputBase>
        </SearchBar>
        <Icons>
          <Badge badgeContent={4} color="error">
            <MailIcon color="action" />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications color="action" />
          </Badge>
          <Avatar onClick={(e) => setOpen(true)} sx={{ width: 30, height: 30 }}>
            A
          </Avatar>
        </Icons>
        <UserBox>
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
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default navBar;
