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
import { Link, useNavigate } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";

const db = getDatabase();

const Registration = () => {
  // Initialize Firebase authentication
  const auth = getAuth();

  // State variables for user inputs and error handling
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Stores validation errors
  const [loading, setLoading] = useState(false); // Loading state for button

  const navigate = useNavigate();

  // Handles input changes and clears errors when the user types
  const handleInputChange = (e, field) => {
    if (field === "email") setEmail(e.target.value);
    if (field === "fullName") setFullName(e.target.value);
    if (field === "password") setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Reset error message
  };

  // Handles the Sign-Up button click
  const handleButton = () => {
    let newErrors = {};

    // Input validation
    if (!email.trim()) newErrors.email = "Email is required";
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update error messages
    } else {
      console.log(email, fullName, password); // Debugging log
      setLoading(true); // Show loading spinner

      // Firebase authentication: Create a new user
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Update user profile with full name and a default profile image
          return updateProfile(auth.currentUser, {
            displayName: fullName ? fullName : "Mike",
            photoURL: "Some URL", // Replace with actual profile image URL
          });
        })
        .then(() => {
          // Show success message using react-toastify
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
          return sendEmailVerification(auth.currentUser); // Send email verification
        })
        .then((mailInfo) => {
          let userRef = push(ref(db, "users/"))
          set(userRef, {
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture: `https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg`,
            userUid: auth.currentUser.uid
          });
          console.log(`Verification email sent: ${mailInfo}`);

        })
        .catch((err) => {
          console.error(`Error during registration: ${err.message}`);
        })
        .finally(() => {
          // Reset form fields and loading state
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
        {/* Left Side - Registration Form */}
        <div className="registrationBox flex flex-col gap-[55px] justify-between items-start">
          {/* Registration Heading */}
          <div className="registerHeading">
            <h1 className="font-nunito font-bold text-[34.4px] text-[#11175D] mb-[13px]">
              Get started with easily register
            </h1>
            <p className="font-nunito font-normal text-[20.64px] text-[#d7d7d7]">
              Free register and you can enjoy it
            </p>
          </div>

          {/* Input Fields */}
          <InputFieldReg
            title="Email Address"
            type="text"
            loginClass="inputField"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors.email}
          />
          <InputFieldReg
            title="Full Name"
            type="text"
            loginClass="inputField"
            value={fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            error={errors.fullName}
          />
          <InputFieldReg
            title="Password"
            type="password"
            loginClass="inputField"
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors.password}
          />

          {/* Sign-Up Button with Loading State */}
          {loading ? (
            <Button
              title={<SyncLoader color="#fff" size={10} />}
              px="px-[135px]"
              py="py-[20px]"
              bRadius="rounded-[86px]"
              bg="bg-blue-500"
            />
          ) : (
            <Button
              onClick={handleButton}
              title="Sign Up"
              px="px-[135px]"
              py="py-[20px]"
              bRadius="rounded-[86px]"
            />
          )}

          {/* Navigation to Login Page */}
          <div className="font-open text-[13.3px] text-[#03014C] font-normal ml-[55px]">
            Already have an account?{" "}
            <span className="font-bold text-[#EA6C00]">
              <Link to="/login">Sign In</Link>
            </span>
          </div>
        </div>

        {/* Right Side - Illustration Image */}
        <div className="registrationImage h-screen flex justify-center items-center">
          <ChattingImage />
        </div>
      </div>
    </div>
  );
};

export default Registration;
