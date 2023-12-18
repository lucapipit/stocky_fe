import _Signin from "./components/_Signin";

import React from 'react';
import Login from './components/_Login';
import Home from './components/_Home';
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
