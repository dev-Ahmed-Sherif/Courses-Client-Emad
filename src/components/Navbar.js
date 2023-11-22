import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
      {/* <span className="nav-logo">كورساتى</span> */}
      <img className="nav-logo" src="./logo.jfif" alt="" />
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link to="/home">الرئيسية</Link>
        <Link to="/service">الدورات</Link>
        <Link to="/about">عنا</Link>
        <Link to="/contact">اتصل بنا</Link>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
