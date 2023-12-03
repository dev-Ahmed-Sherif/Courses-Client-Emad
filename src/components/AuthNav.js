import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthNav.css";

function AuthNav({ user }) {
  const LOGIN_PAGE = "/login";
  const REGISTER_PAGE = "/register";

  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (user) {
      setDisplay("none");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="parent" style={{ display: display }}>
      <div className="buttons">
        <button
          onClick={() => {
            navigate(LOGIN_PAGE);
          }}
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => {
            navigate(REGISTER_PAGE);
          }}
        >
          {" "}
          أنضم لنا{" "}
        </button>
      </div>
    </div>
  );
}

export default AuthNav;
