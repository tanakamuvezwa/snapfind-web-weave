import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase.ts";
import { Navigation } from "./components/Navigation";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Results from "./pages/Results";
import Listing from "./pages/Listing";
import Chat from "./pages/Chat";
import Wanted from "./pages/Wanted";
import Categories from "./pages/Categories";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useBreakpoint } from "./hooks/useBreakpoint";

const App: React.FC = () => {
  const [user] = useAuthState(auth);
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  return (
    <>
      <Navigation />
      <div className={isDesktop ? "ml-64" : ""}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/results" element={<Results />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wanted" element={<Wanted />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin-login" element={<AdminLogin onLogin={() => {}} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
