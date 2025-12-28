import React from "react";
import { Link } from "react-router-dom";
import "./../styles/auth.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">Header</div>
      <div className="header-right">
        <Link to="/">Signup</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default Header;
