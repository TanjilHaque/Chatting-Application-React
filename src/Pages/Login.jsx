//Login.jsx
import React, { useState } from "react";
import RegistrationImage from "../Images/RegistrationImages/RegistrationImage";
import InputFieldReg from "../Components/InputFieldReg";
import Button from "../Components/Button";
import { toast, Slide } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { getDatabase, ref, set, push } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";

const Login = () => {
  // Initialize Firebase Authentication and Database
  const auth = getAuth();
  const db = getDatabase();

  const navigate = useNavigate();

  // State variables to manage form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle changes in input fields
  const handleInputChange = (e, field) => {
    if (field === "email") setEmail(e.target.value);
    if (field === "password") setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

  // Handle login with email and password
  const handleLogin = () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          toast.success(`🎉 Welcome back!`, {
            position: "bottom-center",
            autoClose: 3000,
            theme: "light",
            transition: Slide,
          });
          navigate("/home");
        })
        .catch((err) => {
          console.log(`Error from signInWithEmailAndPassword: ${err}`);
          toast.error("⚠️ Invalid email or password", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "light",
            transition: Slide,
          });
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setLoading(false);
        });
    }
  };

  // Handle login with Google Authentication
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        const { user } = userInfo;
        // Store user data in Firebase Realtime Database
        let userRef = push(ref(db, "users/"))
        set(userRef, {
          username: user.displayName || fullName,
          email: user.email || email,
          profile_picture: user.photoURL,
          userUid: user.uid,
        });
      }).then(()=>{
        navigate('/')
      })
      .catch((err) => {
        console.log("Error from signInWithPopup:", err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="wrapper flex justify-between items-center gap-[300px]">
        {/* Left Section - Login Form */}
        <div className="registrationBox flex flex-col gap-[55px] justify-between items-start">
          <div className="registerHeading">
            <h1 className="font-nunito font-bold text-[34.4px] text-[#11175D] mb-[30px]">
              Login to your account!
            </h1>
            {/* Google Login Button */}
            <div className="py-[22px] w-[220px] border flex gap-[10px] justify-center items-center rounded-[9px] googleDiv">
              <img
                src="./src/Images/RegistrationImages/google.png"
                alt="google"
              />
              <span
                onClick={loginWithGoogle}
                className="font-open text-[13.3px] text-[#03014C] font-semibold googleSpan"
              >
                Login with Google
              </span>
            </div>
          </div>
          {/* Email Input Field */}
          <InputFieldReg
            title={"Email Address"}
            type={"text"}
            loginClass={"login"}
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors.email}
          />
          {/* Password Input Field */}
          <InputFieldReg
            title={"Password"}
            type={"password"}
            loginClass={"login"}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors.password}
          />
          {/* Login Button with Loading State */}
          {loading ? (
            <Button
              title={<SyncLoader color="#fff" size={10} />}
              px="px-[135px]"
              py="py-[20px]"
              bRadius="rounded-[8px]"
              bg="bg-blue-500"
            />
          ) : (
            <Button
              onClick={handleLogin}
              title={"Login to Continue"}
              px={"px-[135px]"}
              py={"py-[20px]"}
              bRadius={"rounded-[8px]"}
            />
          )}
          {/* Registration Link */}
          <div className="font-open text-[13.3px] text-[#03014C] font-normal">
            Don't have an account ?{" "}
            <Link to={"/registration"} className="font-bold text-[#EA6C00]">
              Sign Up
            </Link>
          </div>
        </div>
        {/* Right Section - Illustration */}
        <div className="registrationImage h-screen flex justify-center items-center">
          <RegistrationImage />
        </div>
      </div>
    </div>
  );
};

export default Login;
