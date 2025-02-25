import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputFieldReg = ({ title, type, loginClass, value, onChange, error }) => {
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
          <input
            className={`${loginClass}`}
            placeholder={title}
            type={passtype}
            id="box"
            value={value}
            onChange={onChange}
          />
          <label className="inputLabel" htmlFor="box">
            {title ? title : "Input Box"}
          </label>
          <span className="absolute eyeToggle" onClick={handleEye}>
            {eye ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
      ) : (
        <div className="inputContainer">
          <input
            className={`${loginClass}`}
            placeholder={title}
            type={type ? type : "text"}
            id="box"
            value={value}
            onChange={onChange}
          />
          <label className="inputLabel" htmlFor="box">
            {title ? title : "Input Box"}
          </label>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldReg;
