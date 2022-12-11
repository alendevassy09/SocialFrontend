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
import AdminNotLoggedIn from "./Utils/AdminNotLoggedIn";
import AdminLoggedIn from "./Utils/AdminLoggedIn";
import Saved from "./Components/Saved/Saved";
import SideBar from "./Components/SharedComponents/SideBar/SideBar";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminHome from "./Components/AdminHome/AdminHome";
import AdminContents from './Components/AdminContents/AdminContents'
import AdminReports from "./Components/AdminHome/AdminReports";
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
              <Route index element={<Navigate to="posts" />}></Route>

              <Route path="posts" index element={<Contents />} />
              <Route path="trending" index element={<Trending />} />
              <Route path="messages" index element={<Messages />} />
              <Route path="chat" index element={<UserChats />} />
              <Route path="profile" index element={<Profile />} />
              <Route path="saved" index element={<Saved />} />
              <Route
                path="search"
                index
                element={<SideBar data={{ home: false }} />}
              />
            </Route>
          </Route>
          <Route element={<AdminNotLoggedIn />}>
            <Route path="/admin-login" element={<AdminLogin />} />
          </Route>
          <Route element={<AdminLoggedIn />}>
            <Route element={<AdminContents/>} path="/admin-home">
              <Route index element={<Navigate to="reports" />}></Route>

                <Route path="users" index element={<AdminHome/>} />
                <Route path="reports" index element={<AdminReports />} />
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
