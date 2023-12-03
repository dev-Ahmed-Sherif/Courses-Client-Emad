import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user_reducer";

import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";
import ResponsiveAppBar from "../components/NavbarMui";

import "../styles/Main.css";

export default function Register() {
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

  // Back-End
  const RegRoute = "/register";

  // Front-End
  const homePage = "/";

  // const userNameRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState({});

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  // console.log(errors);

  const inputs = [
    {
      id: "Name",
      type: "text",
      placeholder: "الأسم",
      reg: "Name",
      pattern: "^[A-Za-z\\s\u0600-\u06FF]{3,20}$",
      errorMsg: "الأسم يجب الإ يقل عن أربعه احرف ولا يحتوى على رموز",
      message: "هذا الحقل مطلوب",
    },
    {
      id: "Phone",
      type: "text",
      placeholder: "رقم الهاتف",
      reg: "Phone",
      pattern: `^[0-9]{3,20}$`,
      errorMsg: "رقم الهاتف لا يجب ان يحتوى على احرف",
      message: "هذا الحقل مطلوب",
    },
    {
      id: "Email",
      type: "email",
      placeholder: "البريد الألكترونى",
      reg: "Email",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الإيميل غير متوافق",
      message: "هذا الحقل مطلوب",
    },
    {
      id: "Password",
      type: "password",
      placeholder: "كلمة المرور",
      reg: "Password",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      message: "هذا الحقل مطلوب",
    },
    {
      id: "RepeatPassword",
      type: "password",
      placeholder: "تاكيد كلمة المرور",
      reg: "RepeatPassword",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      message: "هذا الحقل مطلوب",
    },
  ];

  const onSubmit = async (data) => {
    setErrorMsg({});
    console.log(data);
    const { name, email, password, repeatPassword, tel } = data;

    if (password !== repeatPassword) {
      setErrorMsg({ msgFront: "كلمة المرور غير مطابقة" });
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}${RegRoute}`,
          {
            name: name,
            email: email,
            pwd: password,
            tel: tel,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(res);

        // Check res Message
        if (res.data.message) {
          setErrorMsg({ msgBack: res.data.message });
        }

        // Set Token In LocalStorage

        window.localStorage.setItem("token", JSON.stringify(res.data.token));

        // Check User Role
        const role = res.data.roles;
        // console.log(role);
        if (role !== undefined) {
          navigate(homePage);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <ResponsiveAppBar />
      <div className="container">
        <img className="nav-logo" src="./logo.jfif" alt="" />
        {/* <form
          id="form"
          className="form-grid start"
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              id={input.id}
              className="input"
              type={input.type}
              pattern={input.pattern}
              placeholder={input.placeholder}
              {...register(`${input.reg}`, {
                required: {
                  value: true,
                  message: "هذا الحقل مطلوب",
                },
                pattern: {
                  value: `/${input.pattern}/`,
                  message: "البيانات غير مطابقة للمعاير",
                },
              })}
              errorMsg={errors}
            />
          ))}
          <button type="submit" className="btn">
            إنشاء حساب
          </button>
        </form> */}
        <form
          id="form"
          className="form-grid start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            id="name"
            className="input"
            type="text"
            placeholder="الأسم"
            {...register("name", {
              required: {
                value: true,
                message: "هذا الحقل مطلوب",
              },
              minLength: {
                value: 4,
                message: "يرجى إدخال الأسم ثلاثى",
              },
              maxLength: 50,
            })}
          />
          <p> {errors.name?.message} </p>
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
            {errorMsg?.msgBack !== undefined
              ? errorMsg?.msgBack
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
          <p> {errors.password?.message} </p>
          <input
            id="repeatPassword"
            className="input"
            type="password"
            placeholder="تأكيد كلمة المرور"
            {...register("repeatPassword", {
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
            {errorMsg?.msgFront !== undefined
              ? errorMsg?.msgFront
              : errors.repeatPassword?.message}
          </p>
          <input
            id="tel"
            className="input"
            type="tel"
            placeholder="رقم الهاتف"
            {...register("tel", {
              required: {
                value: true,
                message: "هذا الحقل مطلوب",
              },
              minLength: {
                value: 6,
                message: "رقم الهاتف غير صالح",
              },
              maxLength: {
                value: 11,
                message: "رقم الهاتف غير صالح",
              },
              pattern: {
                value: /^[0-9]{3,12}$/i,
                message: "رقم الهاتف غير صالح",
              },
            })}
          />
          <p> {errors.tel?.message} </p>
          <button type="submit" className="btn">
            إنشاء حساب
          </button>
          {/* <input type="submit" /> */}
        </form>
        <div className="footer-auth">
          هل لديك حساب ؟ <Link to="/login"> تسجيل الدخول </Link>
        </div>
      </div>
    </>
  );
}
