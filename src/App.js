import { BrowserRouter, Routes, Route } from "react-router-dom";
import _Signin from "./components/_Signin";
import React from 'react';
import _Login from './components/_Login';
import Home from './components/_Home';
import ErrorPage from "./pages/ErrorPage";


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
