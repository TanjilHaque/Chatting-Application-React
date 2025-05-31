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
// *** FIX 1: Import from react-router-dom ***
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database"; // Removed unused 'push'

const db = getDatabase();
const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Correct hook usage

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field) => {
    if (field === "email") setEmail(e.target.value);
    if (field === "fullName") setFullName(e.target.value);
    if (field === "password") setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleButton = () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    // Optional: Add more robust email validation (e.g., regex)
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!password.trim()) newErrors.password = "Password is required";
    // Optional: Add password strength requirements

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User created successfully
          const user = userCredential.user;
          console.log("User created:", user.uid);
          // Update profile
          return updateProfile(user, {
            displayName: fullName,
            // TODO: Replace with a real or default profile picture URL
            photoURL: "https://www.example.com/default-profile.png",
          }).then(() => user); // Pass user object down the chain
        })
        .then((user) => {
          // Profile updated, send verification email
          console.log("Profile updated for:", user.displayName);
          return sendEmailVerification(user).then(() => user); // Pass user object
        })
        .then((user) => {
          // Verification email sent, now save to Realtime Database
          console.log("Verification email sending process initiated for:", user.email);
          // Use the user's UID as the key in the database for direct lookup
          const userRef = ref(db, `users/${user.uid}`); // Store under user's UID
          return set(userRef, {
            username: user.displayName, // Get from auth profile
            email: user.email,         // Get from auth profile
            // Use the same photoURL set in the profile
            profile_picture: user.photoURL,
            userUid: user.uid,
          }).then(() => {
             // Database write successful
             console.log("User data saved to database for UID:", user.uid);
             // Show success toast
             toast(
                `🎉 Congratulations ${fullName}, Your Registration is Complete! Please check your email to verify your account.`,
                { /* Toast options */ }
              );
             // *** FIX 2: Reset state and navigate on SUCCESS ***
             setEmail("");
             setFullName("");
             setPassword("");
             navigate("/login");
          });
        })
        .catch((err) => {
          // Handle specific Firebase errors for better UX
          console.error(`Registration Error: ${err.code} - ${err.message}`);
          let errorMessage = "Registration failed. Please try again.";
          if (err.code === "auth/email-already-in-use") {
            errorMessage = "This email address is already registered. Please Sign In.";
            setErrors({ email: errorMessage }); // Show error on email field
          } else if (err.code === "auth/weak-password") {
             errorMessage = "Password is too weak. It should be at least 6 characters.";
             setErrors({ password: errorMessage }); // Show error on password field
          } else {
            // General error toast
            toast.error(errorMessage, { /* Toast options */ });
          }
        })
        .finally(() => {
          // Runs after .then() or .catch() finishes
          setLoading(false); // Stop loading indicator regardless of outcome
          // *** navigate() and state resets moved to the success path ***
        });
    }
  };

  // --- Rest of the JSX return statement remains the same ---
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="wrapper flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[100px] lg:gap-[200px] xl:gap-[300px] p-4"> {/* Added padding and responsive adjustments */}
        {/* Left Side - Registration Form */}
        <div className="registrationBox flex flex-col gap-[30px] md:gap-[40px] lg:gap-[55px] justify-center items-center md:items-start w-full max-w-md"> {/* Responsive width and centering */}
          {/* Registration Heading */}
          <div className="registerHeading text-center md:text-left">
            <h1 className="font-nunito font-bold text-[28px] sm:text-[34.4px] text-[#11175D] mb-[10px] md:mb-[13px]">
              Get started with easily register
            </h1>
            <p className="font-nunito font-normal text-[18px] sm:text-[20.64px] text-gray-500"> {/* Adjusted color */}
              Free register and you can enjoy it
            </p>
          </div>

          {/* Input Fields */}
          <InputFieldReg
            title="Email Address"
            type="email" // Use type="email" for better semantics/validation
            loginClass="inputField w-full" // Ensure full width
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors.email}
          />
          <InputFieldReg
            title="Full Name"
            type="text"
            loginClass="inputField w-full" // Ensure full width
            value={fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            error={errors.fullName}
          />
          <InputFieldReg
            title="Password"
            type="password"
            loginClass="inputField w-full" // Ensure full width
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors.password}
          />

          {/* Sign-Up Button with Loading State */}
          <div className="w-full flex justify-center md:justify-start"> {/* Center button on small screens */}
            {loading ? (
               <Button
                 title={<SyncLoader color="#fff" size={10} />}
                 px="px-[40px] sm:px-[100px] md:px-[135px]" // Responsive padding
                 py="py-[15px] md:py-[20px]" // Responsive padding
                 bRadius="rounded-[86px]"
                 bg="bg-blue-500 opacity-75" // Indicate disabled state
                 disabled={true} // Disable button when loading
                 fullWidth={true} // Make button take full width container allows
               />
             ) : (
               <Button
                 onClick={handleButton}
                 title="Sign Up"
                 px="px-[40px] sm:px-[100px] md:px-[135px]" // Responsive padding
                 py="py-[15px] md:py-[20px]" // Responsive padding
                 bRadius="rounded-[86px]"
                 fullWidth={true} // Make button take full width container allows
              />
            )}
          </div>


          {/* Navigation to Login Page */}
          <div className="font-open text-[13.3px] text-[#03014C] font-normal mt-4 w-full text-center md:text-left md:ml-[55px]"> {/* Margin/text align adjustments */}
            Already have an account?{" "}
            <span className="font-bold text-[#EA6C00] hover:underline"> {/* Added hover effect */}
              <Link to="/login">Sign In</Link>
            </span>
          </div>
        </div>

        {/* Right Side - Illustration Image */}
        {/* Hide image on smaller screens for better form focus */}
        <div className="registrationImage hidden md:flex h-screen justify-center items-center">
           <ChattingImage />
        </div>
      </div>
    </div>
  );
};

export default Registration;