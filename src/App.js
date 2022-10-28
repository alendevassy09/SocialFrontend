import Login from './Components/Login/Login'

import React from 'react';
import Home from './Components/Home/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>

      </BrowserRouter>
       
      
    </div>
  );
}

export default App;
