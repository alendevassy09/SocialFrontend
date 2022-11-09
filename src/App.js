import Login from "./Components/Login/Login";

import React from "react";
import Home from "./Components/Home/Home";
import Contents from "./Components/Contents/Contents";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoggedIn from "./utils/loggedIn";
import NotLoggedIn from "./utils/NotLoggedIn";
import Messages from "./Components/Messages/Messages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path="/"  element={<Login />} />
          </Route>

          <Route element={<LoggedIn />}>
            <Route element={<Home />} path="/home">
              <Route index element={<Navigate to="dash" />}></Route>

              <Route path="dash" index element={<Contents />} />
              <Route path="messages" index element={<Messages />} />
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
