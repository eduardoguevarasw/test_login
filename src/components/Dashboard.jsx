import React from "react";
import axios from "axios";
import useStore from "../useStore.js";

function Dashboard() {
  const token = useStore((state) => state.token);

  function logout() {
    axios.get("https://perfectosri.software-total.com/api/v1/logout/");
    localStorage.removeItem("token");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* mostrar el token */}
        <p>{token}</p>
    </div>
  )
}

export default Dashboard;
