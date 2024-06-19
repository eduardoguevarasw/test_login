import { useState } from "react";
import * as React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Forgot from "./components/Forgot";
import Dashboard from "./components/Dashboard";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
