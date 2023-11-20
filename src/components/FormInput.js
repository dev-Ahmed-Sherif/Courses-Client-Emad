import React, { useState } from "react";
import "../styles/FormInput.css";

function FormInput({ className, onChange, errorMsg, id, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <input
        className={className}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      {/* {focused === true && <span>{errorMsg}</span>} */}
      <span hidden={{ focused }}> {errorMsg} </span>
    </div>
  );
}

export default FormInput;
