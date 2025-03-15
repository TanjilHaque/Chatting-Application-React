import React from "react";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Layout from "./Layout";
import Title from "./Pages/Title";
import Sidebar from "./Components/Sidebar";
import RootLayout from "./Components/RootLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Title />}></Route>
          <Route path="/home" element={<Title />}></Route>
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route> */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={"This is home page"}></Route>
          <Route path="/house" element={"This is home page"}></Route>
          <Route path="/message" element={"This is message page"}></Route>
          <Route path="/settings" element={"This is settings page"}></Route>
          <Route path="/notification" element={"This is notification page"}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/sidebar" element={<Sidebar />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
