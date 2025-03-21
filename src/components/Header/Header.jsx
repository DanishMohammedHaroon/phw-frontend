import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import "./Header.scss";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="menu-container">
        <Hamburger isOpen={dropdownOpen} toggle={toggleDropdown} />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              {isHomePage ? (
                <>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/register">Register</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a href="/settings">Settings</a>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
