import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/FormInput.css";

function FormInput({
  className,
  type,
  placeholder,
  errorMsg,
  message,
  id,
  pattern,
  ...inputProps
}) {
  // const [focused, setFocused] = useState(false);

  // const handleFocus = (e) => {
  //   setFocused(true);
  // };

  const { register, formState } = useForm();

  // const { errors } = formState;

  // console.log(errors);

  // console.log(register.toString());
  // console.log(register.length);
  // console.log(register.name);

  // console.log(placeholder);

  return (
    <>
      <label htmlFor={placeholder}> {placeholder} </label>
      <div className="input">
        <input className={className} type={type} placeholder={placeholder} />
        <span>{message}</span>
        <span>{errorMsg[id]?.message ? errorMsg[id]?.message : ""}</span>
        {/* <input
          className={className}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        {focused === true && <span>{errorMsg}</span>}
        <span hidden={{ focused }}> {errorMsg} </span> */}
      </div>
    </>
  );
}

export default FormInput;
