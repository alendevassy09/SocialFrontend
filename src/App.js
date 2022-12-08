import Login from "./Components/Login/Login";

import React from "react";
import Home from "./Components/Home/Home";
import Contents from "./Components/Contents/Contents";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoggedIn from "./Utils/LoggedIn";
import NotLoggedIn from "./Utils/NotLoggedIn";
import Messages from "./Components/Messages/Messages";
import UserChats from "./Components/Messages/UserChats";
import Trending from "./Components/Trending/Trending";
import Profile from "./Components/Profile/Profile";
import Saved from "./Components/Saved/Saved"
import SideBar from "./Components/SharedComponents/SideBar/SideBar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<LoggedIn />}>
            <Route element={<Home />} path="/home">
              <Route index element={<Navigate to="dash" />}></Route>

              <Route path="dash" index element={<Contents />} />
              <Route path="trending" index element={<Trending />} />
              <Route path="messages" index element={<Messages />} />
              <Route path="chat" index element={<UserChats />} /> 
              <Route path="profile" index element={<Profile />} />
              <Route path="saved" index element={<Saved />} />
              <Route path="search" index element={<SideBar data={{home:false}} />} />
            </Route>
          </Route>
        </Routes>

        {/* <Routes>  
                
        </Routes> */}
        {/* <Layout></Layout>  */}
      </BrowserRouter>
    </div>
  );
}

export default App;
