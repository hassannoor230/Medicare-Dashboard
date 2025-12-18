import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const authRoutes = ["/login", "/signup"];
  const hideLayout = authRoutes.includes(location.pathname.toLowerCase());

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  // Close mobile sidebar on window resize if desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileOpen]);

  return (
    <>
      {/* HEADER */}
      {!hideLayout && (
        <Header onMenuClick={toggleMobile} />
      )}

      {/* SIDEBAR */}
      {!hideLayout && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleCollapse}
          isMobileOpen={isMobileOpen}
          closeMobileSidebar={() => setIsMobileOpen(false)}
        />
      )}

      {/* OVERLAY (MOBILE ONLY) */}
      {!hideLayout && isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          marginTop: hideLayout ? 0 : "70px",
          padding: hideLayout ? 0 : "20px",
          background: "#f4f7fb",
          minHeight: "100vh",

          /* 🔴 RESPONSIVE MARGIN */
          marginLeft:
            hideLayout
              ? 0
              : window.innerWidth <= 768
              ? 0
              : isSidebarCollapsed
              ? "70px"
              : "250px",

          transition: "margin-left 0.3s",
        }}
      >
        <Routes>
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>

        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

export default App;
