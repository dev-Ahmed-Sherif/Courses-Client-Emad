import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user_reducer";

import Navbar from "../components/Navbar";
import AuthNav from "../components/AuthNav";
import HeroSection from "../components/HeroSection";

import "../styles/Main.css";

function Main() {
  // useEffect(() => {
  //   dispatch(setUser({ name: "", _id: "", role: "" }));
  // }, []);

  const dispatch = useDispatch();

  // dispatch(setUser({ name: "", _id: "", role: "" }));

  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <AuthNav user={user.userId} />
      <Navbar user={user.userName} />
      <HeroSection />
      {/* <Stack className="container">
        <img src="./logo.jpeg" alt="" />
        <p style={{ color: "#5a8eff" }}> يقدم لكم تطبيق أختبارات للطلبة </p>
        <img src="./exams.png" alt="" />
        <Button
          sx={{
            color: "blue",
            backgroundColor: "#b9b0b0",
            padding: "14px",
            marginTop: "14px",
            fontSize: "large",
            fontWeight: 500,
          }}
          onClick={() => {
            navigate(LOGIN_PAGE);
          }}
        >
          الذهاب لصفحة تسجيل الدخول
        </Button>
      </Stack> */}
    </>
  );
}

export default Main;
