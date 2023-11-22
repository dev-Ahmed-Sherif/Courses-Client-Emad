import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import { setUser } from "../redux/user_reducer";
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
    window.localStorage.removeItem("academicYear");
    window.localStorage.removeItem("quizzesResult");
  });

  const QUIZ_URI_LOGIN_BACK = "/api/users/login";
  const QUIZ_URI_HOME = "/quizzes-student";
  const DASH_URI_HOME = "/users-dashboard";

  // const userNameRef = useRef(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(undefined);
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    // console.log("clicked");
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${QUIZ_URI_LOGIN_BACK}`,
        {
          name: values.username,
          password: values.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);

      // Check res Message
      if (res.data.message) {
        setErrorMsg(res.data.message);
      }

      // Set Token In LocalStorage

      window.localStorage.setItem("token", JSON.stringify(res.data.token));

      // Check User Role
      const role = res.data.user.role;
      // console.log(role);

      if (role === "admin") {
        dispatch(setUser(res.data.user));
        window.localStorage.setItem("Name", JSON.stringify(res.data.user.name));
        navigate(DASH_URI_HOME);
      } else if (role === "student") {
        dispatch(setUser(res.data.user));
        window.localStorage.setItem("id", JSON.stringify(res.data.user._id));
        window.localStorage.setItem("Name", JSON.stringify(res.data.user.name));
        window.localStorage.setItem(
          "academicYear",
          JSON.stringify(res.data.user._id)
        );
        window.localStorage.setItem(
          "quizzesResult",
          JSON.stringify(res.data.user.result)
        );
        window.localStorage.setItem("result", JSON.stringify([]));
        navigate(QUIZ_URI_HOME);
      }
    } catch (error) {}
  };

  const onChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <img className="nav-logo" src="./logo.jfif" alt="" />
        <form id="form" className="form-grid start" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              className="userid"
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="btn">تسجيل الدخول</button>
        </form>
        <div className="reg">
          <p> لأول مرة هنا </p>
          <Link to="/register" className="">
            {" "}
            إنشاء حساب{" "}
          </Link>
        </div>
        {errorMsg !== undefined ? (
          <p style={{ color: "red", fontSize: "2em", fontWeight: "bold" }}>
            {errorMsg}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
