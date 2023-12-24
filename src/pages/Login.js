import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user_reducer";

import FormInput from "../components/FormInput";
import Navbar from "./../components/Navbar";

import "../styles/Main.css";

export default function Login() {
  // Prevent Browser Back Button
  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };

    // Remove Local Storge
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("Name");
    window.localStorage.removeItem("Role");
    window.localStorage.removeItem("token");
  });

  // Back-End
  const LOGIN_BACK = "/login";

  // Front-End
  const homePage = "/";
  const adminPage = "/users-dashboard";

  // const userNameRef = useRef(null);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState({});
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const inputs = [
    {
      id: "1",
      name: "email",
      type: "email",
      placeholder: "البريد الألكترونى",
      pattern: `^[A-Za-z0-9\\s\u0600-\u06FF]{3,20}$`,
      errorMsg: "الإيميل غير متوافق",
      required: true,
    },
    {
      id: "2",
      name: "password",
      type: "password",
      placeholder: "كلمة المرور",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      required: true,
    },
  ];

  const onSubmit = async (data) => {
    const { email, password } = data;
    setErrorMsg({});
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${LOGIN_BACK}`,
        {
          email: email,
          pwd: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);

      // Check res Message
      if (res.data.messageEmail) {
        setErrorMsg({ msgBackEmail: res.data.messageEmail });
      } else if (res.data.messagePass) {
        setErrorMsg({ msgBackPass: res.data.messagePass });
      }

      // Set Token In LocalStorage

      // Check User Role
      const role = res.data.roles;
      console.log(role);

      if (role[0] === 7777 || role[0] === 777) {
        dispatch(setUser(res.data.foundUser));
        window.localStorage.setItem(
          "Name",
          JSON.stringify(res.data.foundUser.name)
        );
        window.localStorage.setItem("Role", JSON.stringify(role[0]));
        window.localStorage.setItem(
          "token",
          JSON.stringify(res.data.newRefreshToken)
        );
        navigate(adminPage);
      } else if (role[0] === 7 || role[0] === 77) {
        dispatch(setUser(res.data.foundUser));
        window.localStorage.setItem(
          "id",
          JSON.stringify(res.data.foundUser._id)
        );
        window.localStorage.setItem(
          "Name",
          JSON.stringify(res.data.foundUser.name)
        );
        window.localStorage.setItem("Role", JSON.stringify(role[0]));
        window.localStorage.setItem(
          "token",
          JSON.stringify(res.data.newRefreshToken)
        );
        navigate(homePage);
      }
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <img className="nav-logo" src="./logo.jfif" alt="" />
        <form
          id="form"
          className="form-grid start"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* {inputs.map((input) => (
            <FormInput
              key={input.id}
              className="input"
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))} */}
          <input
            id="email"
            className="input"
            type="email"
            placeholder="الإيميل"
            {...register("email", {
              required: {
                value: true,
                message: "هذا الحقل مطلوب",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "الإيميل غير متوافق",
              },
            })}
          />
          <p>
            {errorMsg?.msgBackEmail !== undefined
              ? errorMsg?.msgBackEmail
              : errors.email?.message}
          </p>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="كلمة المرور"
            {...register("password", {
              required: {
                value: true,
                message: "هذا الحقل مطلوب",
              },
              minLength: {
                value: 6,
                message: "الباسورد لا يقل عن ستة احرف او ارقام",
              },
            })}
          />
          <p>
            {errorMsg?.msgBackPass !== undefined
              ? errorMsg?.msgBackPass
              : errors.email?.message}
          </p>
          <button type="submit" className="btn">
            تسجيل الدخول
          </button>
        </form>
        <div className="footer-auth">
          لأول مرة هنا؟
          <Link to="/register"> إنشاء حساب </Link>
        </div>
        {/* {errorMsg !== undefined ? (
          <p style={{ color: "red", fontSize: "2em", fontWeight: "bold" }}>
            {errorMsg}
          </p>
        ) : (
          <p></p>
        )} */}
      </div>
    </>
  );
}
