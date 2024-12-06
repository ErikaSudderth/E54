import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar-nav" role="navigation" aria-label="Main navigation">
      <ul className="navbar-list">
        <li>
          <Link to="/" aria-label="Go to Dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/summary" aria-label="Go to Summary">
            Summary
          </Link>
        </li>
        <li>
          <Link to="/reports" aria-label="Go to Reports">
            Reports
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out of your account"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
