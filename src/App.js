import { BrowserRouter, Routes, Route } from "react-router-dom";
import _Signin from "./components/_Signin";
import React from 'react';
import _Login from './components/_Login';
import Home from './components/_Home';
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<_Login />} />
        <Route path="/signin" element={<_Signin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
