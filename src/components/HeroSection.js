import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/HeroSection.css";

function HeroSection() {
  const REGISTER_PAGE = "/register";

  const navigate = useNavigate();

  return (
    <div className="con">
      <div className="left">
        <img src="./hero.jpg" alt="" />
      </div>
      <div className="right">
        <p> تعلم معنا وكن من افضل المتفوقين فى مجالك </p>
        <p> كن دوما الاول دائما فى الطليعة </p>
        <button
          onClick={() => {
            navigate(REGISTER_PAGE);
          }}
        >
          أنضم لنا
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
