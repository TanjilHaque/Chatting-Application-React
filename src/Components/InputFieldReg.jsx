import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputFieldReg = ({ title, type, loginClass }) => {
  const [eye, setEye] = useState(false);
  const [passtype, setPassType] = useState(type); // Initialize with prop type

  const handleEye = () => {
    setEye(!eye);
    setPassType(passtype === "password" ? "text" : "password");
  };

  return (
    <div>
      {type === "password" ? (
        <div className="inputContainer">
          <input className={`${loginClass}`} placeholder={title} type={passtype} id="box" />
          <label className="inputLabel" htmlFor="box">
            {title ? title : "Input Box"}
          </label>
          <span className="absolute eyeToggle" onClick={handleEye}>
            {eye ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
      ) : (
        <div className="inputContainer">
          <input className={`${loginClass}`} placeholder={title} type={type ? type : "text"} id="box" />
          <label className="inputLabel" htmlFor="box">
            {title ? title : "Input Box"}
          </label>
        </div>
      )}
    </div>
  );
};

export default InputFieldReg;
