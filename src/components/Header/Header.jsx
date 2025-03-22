import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Hamburger from "../Hamburger/Hamburger";
import "./Header.scss";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Define logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Do not show the menu on the LandingPage ("/")
  if (location.pathname === "/") {
    return (
      <header className="header">
        <div className="logo"></div>
      </header>
    );
  }

  // Function to determine which menu items to show based on the current route
  const renderMenuItems = () => {
    const { pathname } = location;
    const items = [];

    // For Login and Registration pages: show back option to the landing page
    if (pathname === "/login" || pathname === "/register") {
      items.push({ label: "Back", link: "/" });
    }
    // For Client Dashboard
    else if (pathname === "/client-dashboard") {
      items.push({ label: "Exercise Catalog", link: "/exercises" });
      items.push({ label: "Client Workout", link: "/client-workout" });
      items.push({ label: "Secure Messaging", link: "/messaging" });
      items.push({ label: "Logout", action: handleLogout });
    }
    // For Physio Dashboard
    else if (pathname === "/physio-dashboard") {
      items.push({ label: "Exercise Catalog", link: "/exercises" });
      items.push({ label: "Assignment Manager", link: "/assignment-manager" });
      items.push({ label: "Feedback", link: "/physio-feedback" });
      items.push({ label: "Secure Messaging", link: "/messaging" });
      items.push({ label: "Logout", action: handleLogout });
    }
    // For Exercise Catalog Page
    else if (pathname === "/exercises") {
      items.push({ label: "Dashboard", link: "/dashboard" });
      items.push({ label: "Back", action: () => navigate(-1) });
      items.push({ label: "Logout", action: handleLogout });
    }
    // For Exercise Details, Physiotherapist Feedback, and Secure Messaging pages
    else if (
      pathname.startsWith("/exercise/") ||
      pathname === "/physio-feedback" ||
      pathname === "/messaging"
    ) {
      items.push({ label: "Back", action: () => navigate(-1) });
      items.push({ label: "Logout", action: handleLogout });
    }
    // Fallback (if needed)
    else {
      items.push({ label: "Back", action: () => navigate(-1) });
      items.push({ label: "Logout", action: handleLogout });
    }

    return items.map((item, index) => {
      if (item.link) {
        return (
          <li key={index}>
            <a href={item.link} onClick={() => setDropdownOpen(false)}>
              {item.label}
            </a>
          </li>
        );
      } else if (item.action) {
        return (
          <li key={index}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(false);
                item.action();
              }}
            >
              {item.label}
            </a>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="menu-container">
        <Hamburger isOpen={dropdownOpen} toggle={toggleDropdown} />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>{renderMenuItems()}</ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
