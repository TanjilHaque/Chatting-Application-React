import React from 'react'
import { Outlet } from "react-router";
import Landing from './Pages/Landing';
import { BrowserRouter, Routes, Route } from "react-router";

const Layout = () => {
  return (
    <div>
        <Landing></Landing>
        <Outlet></Outlet>
    </div>
  )
}

export default Layout