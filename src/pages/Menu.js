import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="container mt-4">
        <h1>Menú Principal</h1>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleNavigateTo("/municipios")}
        >
          Municipios
        </button>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleNavigateTo("/asuntos")}
        >
          Asuntos
        </button>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleNavigateTo("/nivel")}
        >
          Niveles
        </button>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleNavigateTo("/admin-tickets")}
        >
          Administrar Tickets
        </button>
        <button
          className="btn btn-primary mt-3"
          onClick={() => handleNavigateTo("/dashboard")}
        >
          Dashboard
        </button>

        <button className="btn btn-secondary mt-3" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default Menu;
