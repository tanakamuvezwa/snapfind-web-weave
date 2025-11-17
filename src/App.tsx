import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase.ts";
import { Navigation } from "./components/Navigation";
import { ThemeProvider } from "./components/ThemeProvider";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Results from "./pages/Results";
import Listing from "./pages/Listing";
import Chat from "./pages/Chat";
import Wanted from "./pages/Wanted";
import Categories from "./pages/Categories";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useBreakpoint } from "./hooks/useBreakpoint";

const App: React.FC = () => {
  const [user] = useAuthState(auth);
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  return (
    <ThemeProvider>
      <Navigation />
      <div className={isDesktop ? "ml-64" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/camera"
            element={
              <PrivateRoute>
                <Camera />
              </PrivateRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <PrivateRoute>
                <Sell />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy"
            element={
              <PrivateRoute>
                <Buy />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            }
          />
          <Route
            path="/listing"
            element={
              <PrivateRoute>
                <Listing />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/wanted"
            element={
              <PrivateRoute>
                <Wanted />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route path="/admin-login" element={<AdminLogin onLogin={() => {}} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
