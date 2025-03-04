import React, { useState } from "react";
import RegistrationImage from "../Images/RegistrationImages/RegistrationImage";
import InputFieldReg from "../Components/InputFieldReg";
import Button from "../Components/Button";
import { toast, Slide } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link } from "react-router";

const Login = () => {
  const auth = getAuth();
  const database = getDatabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field) => {
    if (field === "email") setEmail(e.target.value);
    if (field === "password") setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

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
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        })
        .catch((err) => {
          console.log(`Error from signInWithEmailAndPassword: ${err}`);
          toast.error("⚠️ Invalid email or password", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        set(ref(database, "users"), {
          username: "ChatApp By React JS",
          email: "someEmail123@gmail.com",
          profile_picture:
            "https://lh3.googleusercontent.com/a/ACg8ocLZVXUzP_XmlNRvHQpPIJL4EJkF-O6v1VORACZcYX6JhQLOBQk=s96-c",
        });
      })
      .catch((err) => {
        console.log("error from signInWithPopup ,", err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="wrapper flex justify-between items-center gap-[300px]">
        <div className="registrationBox flex flex-col gap-[55px] justify-between items-start">
          <div className="registerHeading">
            <h1 className="font-nunito font-bold text-[34.4px] text-[#11175D] mb-[30px]">
              Login to your account!
            </h1>
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
          <InputFieldReg
            title={"Email Address"}
            type={"text"}
            loginClass={"login"}
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors.email}
          />
          <InputFieldReg
            title={"Password"}
            type={"password"}
            loginClass={"login"}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors.password}
          />
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
          <div className="font-open text-[13.3px] text-[#03014C] font-normal">
            Don't have an account ?{" "}
            <Link to={"/registration"} className="font-bold text-[#EA6C00]">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="registrationImage h-screen flex justify-center items-center">
          <RegistrationImage />
        </div>
      </div>
    </div>
  );
};

export default Login;
