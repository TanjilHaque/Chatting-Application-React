import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ValidationError from "../Pages/ValidationError";

const RootLayout = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const auth = getAuth();
  let content = null;
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      setIsUserVerified(user.emailVerified)
    })
  }, [auth.currentUser]);

  if (isUserVerified) {
    content = (
      <div className="flex gap-x-4 p-3">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div className="w-full h-[90vh]">
          <Outlet></Outlet>
        </div>
      </div>
    );
  }else{
    content = (
      <ValidationError></ValidationError>
    )
  }
  return (
    <div className="">
      {content}
    </div>
  );
};

export default RootLayout;
