import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <div className="flex gap-x-4 p-3">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="w-full h-[90vh]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
