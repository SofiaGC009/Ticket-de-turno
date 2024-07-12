import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/common/NavBar";
import tickets from "../config/tickets";

const AdminTickets = () => {
  const [searchType, setSearchType] = useState("curp");
  const [searchValue, setSearchValue] = useState("");
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    setTicketList(tickets);
  }, []);

  const validateSearchInput = () => {
    if (!searchValue.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo de búsqueda no puede estar vacío.",
      });
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!validateSearchInput()) return;

    if (searchType === "curp") {
      const result = tickets.filter((ticket) => ticket.curp === searchValue);
      if (result.length > 0) {
        setTicketList(result);
      } else {
        Swal.fire("No se encontraron resultados", "", "info");
      }
    } else if (searchType === "nombre") {
      const result = tickets.filter((ticket) => {
        const nombreCompleto = `${ticket.nombre} ${ticket.paterno} ${ticket.materno}`.toLowerCase();
        return nombreCompleto.includes(searchValue.toLowerCase());
      });
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
    Swal.fire(
      "Actualizado!",
      `El estatus del ticket ha sido actualizado a ${newStatus}.`,
      "success"
    );
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>Administrar Tickets</h1>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <select
                onChange={(e) => setSearchType(e.target.value)}
                className="form-select"
                value={searchType}
              >
                <option value="curp">Buscar por CURP</option>
                <option value="nombre">Buscar por Nombre</option>
              </select>
            </div>
            <div className="col-md-6 input-group">
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
          </div>
          <div className="table-responsive">
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
                      <div className="btn-group" role="group">
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
                          onClick={() =>
                            handleStatusChange(ticket.curp, "Resuelto")
                          }
                        >
                          Resuelto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
