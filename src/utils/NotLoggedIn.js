import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import axios from "../Axios/axios";
import { useState } from "react";
import { Box } from "@mui/system";

const NotLoggedIn = () => {
  //let auth = {authtoken:localStorage.getItem('userToken')}
//  let auth={authtoken:true}
  const [auth,setAuth]=useState({
    authtoken:"loading"
  })
  useEffect(()=>{
    axios.get('/authCheck',{headers:{token:localStorage.getItem('userToken')}}).then((response)=>{
      if(response.data.status){
        console.log(response);
        
        setAuth({authtoken:true})
      }else{
        localStorage.removeItem('userToken')
        setAuth({authtoken:false})
      }
    })
  },[])

  if(auth.authtoken=="loading"){
    return(
      <Box>loading</Box>
    )
  }else{
    return(
      auth.authtoken==true?<Navigate to='/home'/>:<Outlet/>
  )
  }
    
};

export default NotLoggedIn
