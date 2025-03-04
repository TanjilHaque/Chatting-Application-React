import React from "react";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Layout from "./Layout";
import Title from "./Pages/Title";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Title />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
