import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user_reducer";
import { useNavigate } from "react-router-dom";
import * as Action from "../redux/link_reducer";
import axios from "axios";
import ListItem from "./ListItem";
import LogoutIcon from "@mui/icons-material/Logout";

import imageName from "../img/person.png";

function Topbar() {
  const LOGOUT_BACK = "/logout";

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let menuRef = useRef();

  let name = useSelector((state) => state.user.userName);
  console.log(name);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.setItem("link", JSON.stringify("المتدربين"));
    window.localStorage.removeItem("Name");
    window.localStorage.removeItem("Role");
    window.localStorage.removeItem("token");
    dispatch(Action.setLink("المتدربين"));
    logoutUser();
    console.log(name);
    // navigate("/");
  };

  const logoutUser = async () => {
    console.log("logout");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${LOGOUT_BACK}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 204) {
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("Name");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("Role");
        // dispatch(setUser({ name: "", _id: "", role: "" }));
        // navigate("/");
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div className="topbar">
      {/* <!-- UserImg --> */}
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img src={imageName} alt="" />
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>
            {name}
            <br />
          </h3>
          <button onClick={(e) => handleLogout(e)}>
            <h4>تسجيل الخروج</h4>
            <LogoutIcon />
          </button>
          <ul>
            <ListItem position="topbar" text={"My Profile"} />
            <ListItem position="topbar" text={"Edit Profile"} />
          </ul>
        </div>
      </div>
      {/* <div className="user">
        <img src="./person.JPG" alt="" />
      </div> */}
    </div>
  );
}

export default Topbar;
