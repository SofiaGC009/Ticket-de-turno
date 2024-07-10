import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Menu = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Menu</h1>
      <button onClick={logout}>Logout</button>
      {/* Agrega el contenido del menú aquí */}
    </div>
  );
};

export default Menu;
