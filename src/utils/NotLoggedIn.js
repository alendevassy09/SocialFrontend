import { Outlet, Navigate } from "react-router-dom";
import React from "react";
const NotLoggedIn = () => {
  let auth = {authtoken:localStorage.getItem('auth')}
    return(
        auth.authtoken?<Navigate to='/home'/>:<Outlet/>
    )
};

export default NotLoggedIn
