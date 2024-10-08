import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Books</Link>
      <Link to="/add" className="nav-link">Add</Link>
      <Link to="/update" className="nav-link">Update</Link>
    </nav>
  );
};

export default Navbar;
