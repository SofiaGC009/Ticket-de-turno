import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import { useAuth } from "../contexts/AuthContext";

const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigateToMunicipios = () => {
    navigate("/municipios");
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1>Menú Principal</h1>
        <button
          className="btn btn-primary mt-3"
          onClick={handleNavigateToMunicipios}
        >
          Ir a Municipios
        </button>
        <button className="btn btn-secondary mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
