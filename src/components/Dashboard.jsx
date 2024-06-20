import React from "react";
import axios from "axios";
import useStore from "../useStore.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  function logout() {
    axios.get("https://perfectosri.software-total.com/api/v1/logout/");
    localStorage.removeItem("token");
    useStore.getState().clearUser();
    navigate("/");


  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* mostrar el token */}
        <p>{token}</p>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard;
