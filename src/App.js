import Login from "./Components/Login/Login";

import React from "react";
import Home from "./Components/Home/Home";
import Contents from "./Components/Contents/Contents";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoggedIn from "./utils/loggedIn";
import NotLoggedIn from "./utils/NotLoggedIn";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/home" element={<Home />}></Route> */}
          <Route element={<LoggedIn />}>
            <Route element={<Home />} path="/home">
              <Route index element={<Navigate to="dash" />}></Route>

              <Route path="dash" index element={<Contents />} />
            </Route>
          </Route>
          <Route element={<NotLoggedIn />}>
            <Route path="/" exact element={<Login />} />
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
