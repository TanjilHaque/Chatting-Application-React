import React, { useState } from "react";
import InputFieldReg from "../Components/InputFieldReg";
import Button from "../Components/Button";
import ChattingImage from "../Images/RegistrationImages/ChattingImage";
import { toast, Slide } from "react-toastify";
import { SyncLoader } from "react-spinners";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      console.log(email, fullName, password); // Replace with actual registration logic
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          updateProfile(auth.currentUser, {
            displayName: fullName ? fullName : "Mike",
            photoURL: "Some URl",
          });
        })
        .then(() => {
          toast(
            `🎉 Congratulations ${fullName}, Your Registration is Complete!`,
            {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            }
          );
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailInfo) => {
          console.log(`mail send by ${mailInfo}`);
        })
        .catch((err) => {
          console.log(`Error from createUserWithEmailAndPassword is ${err}`);
        })
        .finally(() => {
          setEmail("");
          setFullName("");
          setPassword("");
          setLoading(false);
        });
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
          {loading ? (
            <Button
              title={<SyncLoader color="#fff" size={10} />}
              px="px-[135px]"
              py="py-[20px]"
              bRadius="rounded-[86px]"
              bg="bg-blue-500" // Optional: Ensure background color is visible
            />
          ) : (
            <Button
              onClick={handleButton}
              title={"Sign Up"}
              px={"px-[135px]"}
              py={"py-[20px]"}
              bRadius={"rounded-[86px]"}
            />
          )}
          <div className="font-open text-[13.3px] text-[#03014C] font-normal ml-[55px]">
            Already have an account?{" "}
            <span className="font-bold text-[#EA6C00]">
              {" "}
              <a href="./Login.jsx">Sign In</a>{" "}
            </span>
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
