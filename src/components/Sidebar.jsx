import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaUserMd,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen, closeMobileSidebar }) {
  const menuItems = [
    { name: "Dashboard", icon: <FaBars />, path: "/dashboard" },
    { name: "Patients", icon: <FaUser />, path: "/patients" },
    { name: "Appointments", icon: <FaCalendarAlt />, path: "/appointments" },
    { name: "Doctors", icon: <FaUserMd />, path: "/doctors" },
  ];

  return (
    <>
      <div
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "menu-link active-link" : "menu-link"
                  }
                  onClick={closeMobileSidebar} // close overlay on mobile link click
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="toggle-btn" onClick={toggleCollapse}>
          <FaBars />
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={closeMobileSidebar}></div>}
    </>
  );
}

export default Sidebar;
