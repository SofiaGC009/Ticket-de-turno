import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Municipios from "./components/crud/Municipios";
import PrivateRoute from "./routes/PrivateRoute";
import Asuntos from "./components/crud/Asuntos";
import Nivel from "./components/crud/Nivel";
import TicketForm from "./public/TicketForm";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solicitud" element={<TicketForm />} />
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/municipios"
            element={
              <PrivateRoute>
                <Municipios />
              </PrivateRoute>
            }
          />
          <Route
            path="/asuntos"
            element={
              <PrivateRoute>
                <Asuntos />
              </PrivateRoute>
            }
          />
          <Route
            path="/niveles"
            element={
              <PrivateRoute>
                <Nivel />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
