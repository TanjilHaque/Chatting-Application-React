import React, { useState } from "react";
import InputFieldReg from "../Components/InputFieldReg";
import Button from "../Components/Button";
import ChattingImage from "../Images/RegistrationImages/ChattingImage";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, field) => {
    if (field === "email") setEmail(e.target.value);
    if (field === "fullName") setFullName(e.target.value);
    if (field === "password") setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

  const handleButton = () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form Submitted!"); // Replace with actual registration logic
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="wrapper flex justify-between items-center gap-[300px]">
        <div className="registrationBox flex flex-col gap-[55px] justify-between items-start">
          <div className="registerHeading">
            <h1 className="font-nunito font-bold text-[34.4px] text-[#11175D] mb-[13px]">
              Get started with easily register
            </h1>
            <p className="font-nunito font-normal text-[20.64px] text-[#d7d7d7]">
              Free register and you can enjoy it
            </p>
          </div>
          <InputFieldReg
            title={"Email Address"}
            type={"text"}
            loginClass={"inputField"}
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors.email}
          />
          <InputFieldReg
            title={"Full Name"}
            type={"text"}
            loginClass={"inputField"}
            value={fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            error={errors.fullName}
          />
          <InputFieldReg
            title={"Password"}
            type={"password"}
            loginClass={"inputField"}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors.password}
          />
          <Button
            onClick={handleButton}
            title={"Sign Up"}
            px={"px-[135px]"}
            py={"py-[20px]"}
            bRadius={"rounded-[86px]"}
          />
          <div className="font-open text-[13.3px] text-[#03014C] font-normal ml-[55px]">
            Already have an account? <span className="font-bold text-[#EA6C00]"> <a href="#">Sign In</a> </span>
          </div>
        </div>
        <div className="registrationImage h-screen flex justify-center items-center">
          <ChattingImage />
        </div>
      </div>
    </div>
  );
};

export default Registration;
