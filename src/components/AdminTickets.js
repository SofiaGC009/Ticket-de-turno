import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/common/NavBar";
import tickets from "../config/tickets";

const AdminTickets = () => {
  const [searchType, setSearchType] = useState("curp");
  const [searchValue, setSearchValue] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [status, setStatus] = useState("Pendiente");

  useEffect(() => {
    setTicketList(tickets);
  }, []);

  const handleSearch = () => {
    if (searchType === "curp") {
      const result = tickets.filter((ticket) => ticket.curp === searchValue);
      if (result.length > 0) {
        setTicketList(result);
      } else {
        Swal.fire("No se encontraron resultados", "", "info");
      }
    } else if (searchType === "nombre") {
      const result = tickets.filter(
        (ticket) =>
          ticket.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
          ticket.paterno.toLowerCase().includes(searchValue.toLowerCase()) ||
          ticket.materno.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (result.length > 0) {
        setTicketList(result);
      } else {
        Swal.fire("No se encontraron resultados", "", "info");
      }
    }
  };

  const handleDelete = (curp) => {
    const updatedTickets = ticketList.filter((ticket) => ticket.curp !== curp);
    setTicketList(updatedTickets);
    Swal.fire("Eliminado!", "El ticket ha sido eliminado.", "success");
  };

  const handleStatusChange = (curp, newStatus) => {
    const updatedTickets = ticketList.map((ticket) =>
      ticket.curp === curp ? { ...ticket, status: newStatus } : ticket
    );
    setTicketList(updatedTickets);
    setStatus(newStatus); // Actualiza el estado del estatus
    Swal.fire(
      "Actualizado!",
      `El estatus del ticket ha sido actualizado a ${newStatus}.`,
      "success"
    );
  };

  return (
    <div className="container">
      <NavBar />
      <div className="card text-center">
        <div className="card-header">
          <h1>Administrar Tickets</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <select
              onChange={(e) => setSearchType(e.target.value)}
              className="form-select"
              value={searchType}
            >
              <option value="curp">Buscar por CURP</option>
              <option value="nombre">Buscar por Nombre</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              className="form-control"
              placeholder={`Ingrese ${searchType}`}
              value={searchValue}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>CURP</th>
                <th>Teléfono</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Municipio</th>
                <th>Asunto</th>
                <th>Turno</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ticketList.map((ticket) => (
                <tr key={ticket.curp}>
                  <td>{ticket.nombreCompleto}</td>
                  <td>{ticket.curp}</td>
                  <td>{ticket.telefono}</td>
                  <td>{ticket.celular}</td>
                  <td>{ticket.correo}</td>
                  <td>{ticket.municipio}</td>
                  <td>{ticket.asunto}</td>
                  <td>{ticket.turno}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(ticket.curp)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        handleStatusChange(ticket.curp, "Pendiente")
                      }
                    >
                      Pendiente
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatusChange(ticket.curp, "Resuelto")}
                    >
                      Resuelto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
