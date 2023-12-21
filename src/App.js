 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import _Signin from "./components/_Signin";
import React from 'react';
import _Login from './components/_Login';
import Home from './components/_Home';
import ErrorPage from "./pages/ErrorPage";
import _Navbar from "./components/_Navbar";
import _Account from "./components/_Account";
import _Footer from "./components/_Footer";
import { Container } from "react-bootstrap";


function App() {
  return (
    <BrowserRouter>
      <_Navbar />
      <Container>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<_Login />} />
        <Route path="/signin" element={<_Signin />} />
        <Route path="/account" element={<_Account />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </Container>
      <_Footer />
    </BrowserRouter>
  );
}

export default App;
