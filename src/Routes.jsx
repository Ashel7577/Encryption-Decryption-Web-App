import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ui/ScrollToTop";
import ErrorBoundary from "components/ui/ErrorBoundary";
import UserLogin from 'pages/user-login/index.jsx';
import MainDashboard from 'pages/main-dashboard/index.jsx';
import FileEncryption from 'pages/file-encryption/index.jsx';
import TextEncryption from 'pages/text-encryption/index.jsx';
import UserRegistration from 'pages/user-registration/index.jsx';
import DecryptionCenter from 'pages/decryption-center/index.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/file-encryption" element={<FileEncryption />} />
        <Route path="/text-encryption" element={<TextEncryption />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/decryption-center" element={<DecryptionCenter />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;