import React from "react";
import { makeStyles } from "@mui/styles";
import Header from "../Header/Header";
import { Drawer } from "@mui/material";
import {Typography} from "@mui/material";
const drawerWidth=240
const useStyle = makeStyles({
  page: {
    background: "#f9f9f1", 
    width: "100%",
    height: "500px",
  },
  Drawer:{
    width:drawerWidth
  }
});

function Layout({ chidren }) {
  const classes = useStyle();
  return (
    <div style={{display:'flex'}}>
        <Header></Header>
        <Drawer anchor="left" variant="permanent"  className={classes.Drawer}>
            <Typography variant='h5'>
                    hello
            </Typography>
        </Drawer>
      <div className={classes.page}>{chidren}</div>
    </div>
  ); 
}  

export default Layout;
