
import { BrowserRouter, Routes, Route } from "react-router-dom";
import _Signin from "./components/_Signin";
import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import SigninPage from './pages/SigninPage';
import StorePage from './pages/StorePage';
import ErrorPage from "./pages/ErrorPage";
import FormAnnouncementPage from './pages/FormAnnouncementPage'
import PaymentAnnouncement from "./components/PaymentAnnouncement";
import PaypalPaymentPage from "./pages/PaypalPaymentPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AnnounceCreatedSuccessPage from "./pages/AnnounceCreatedSuccessPage";
import PendingAnnouncementsPage from "./pages/PendingAnnouncementsPage";
import RejectedAnnouncementsPage from "./pages/RejectedAnnouncementsPage";



function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createannouncement" element={<FormAnnouncementPage />} />
        <Route path="/paymentmethods/:price" element={<PaymentMethodsPage />} />
        <Route path="/payment" element={<PaymentAnnouncement />} />
        <Route path="/paypalpayment" element={<PaypalPaymentPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/announcecreatesuccess" element={<AnnounceCreatedSuccessPage />} />
        <Route path="/pendingannouncements" element={<PendingAnnouncementsPage />} />
        <Route path="/rejectedannouncements" element={<RejectedAnnouncementsPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
