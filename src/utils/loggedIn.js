import { Outlet, Navigate } from "react-router-dom";
import React from "react";
const loggedIn = () => {
  let auth = {authtoken:localStorage.getItem('userToken')}
    return(
        auth.authtoken?<Outlet/>:<Navigate to='/'/>
    )
};
 
export default loggedIn
