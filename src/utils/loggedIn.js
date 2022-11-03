import { Outlet, Navigate } from "react-router-dom";
import React from "react";
const loggedIn = () => {
  let auth = {authtoken:localStorage.getItem('auth')}
    return(
        auth.authtoken?<Outlet/>:<Navigate to='/'/>
    )
};
 
export default loggedIn
