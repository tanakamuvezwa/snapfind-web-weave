import React from "react";
import { Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
import { useBreakpoint } from "./hooks/useBreakpoint";
import CreatePassword from "./pages/CreatePassword";
import Login from "./pages/Login";
import Tracking from "./pages/Tracking";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  return (
    <ThemeProvider>
      <Navigation />
      <div className={isDesktop ? "ml-64" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
           <Route path="/login" element={<Login />} />
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
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/tracking"
            element={
              <PrivateRoute>
                <Tracking />
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
          <Route path="/create-password" element={<CreatePassword />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
