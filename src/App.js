import _Signin from "./components/_Signin";

import React from 'react';
import Login from './components/_Login';
import Home from './components/_Home';
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
=======
    <>
      <div>
        <_Signin/>
      </div>
    </>
>>>>>>> refs/remotes/origin/main
  );
}

export default App;
