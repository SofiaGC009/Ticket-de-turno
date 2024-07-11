import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";

const TicketForm = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [curp, setCurp] = useState("");
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [nivel, setNivel] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [asunto, setAsunto] = useState("");
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    const savedTickets = localStorage.getItem("ticketList");
    if (savedTickets) {
      setTicketList(JSON.parse(savedTickets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketList", JSON.stringify(ticketList));
  }, [ticketList]);

  const validateInput = () => {
    if (
      !nombreCompleto.trim() ||
      !curp.trim() ||
      !nombre.trim() ||
      !paterno.trim() ||
      !materno.trim() ||
      !telefono.trim() ||
      !celular.trim() ||
      !correo.trim() ||
      !nivel.trim() ||
      !municipio.trim() ||
      !asunto.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const turno = obtenerTurno(municipio);

    const nuevoTicket = {
      nombreCompleto,
      curp,
      nombre,
      paterno,
      materno,
      telefono,
      celular,
      correo,
      nivel,
      municipio,
      asunto,
      turno,
    };

    const index = ticketList.findIndex(
      (ticket) => ticket.curp === curp && ticket.turno === turno
    );

    if (index !== -1) {
      const updatedTickets = [...ticketList];
      updatedTickets[index] = nuevoTicket;
      setTicketList(updatedTickets);
    } else {
      setTicketList([...ticketList, nuevoTicket]);
    }

    generarPDF(nuevoTicket);
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Solicitud registrada",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const obtenerTurno = (municipio) => {
    const ticketsPorMunicipio = ticketList.filter(
      (ticket) => ticket.municipio === municipio
    );
    return ticketsPorMunicipio.length + 1;
  };

  const generarPDF = (ticket) => {
    const doc = new jsPDF();
    doc.text("Comprobante de Solicitud de Ticket", 20, 20);
    doc.text(`Nombre Completo: ${ticket.nombreCompleto}`, 20, 30);
    doc.text(`CURP: ${ticket.curp}`, 20, 40);
    doc.text(`Nombre: ${ticket.nombre}`, 20, 50);
    doc.text(`Paterno: ${ticket.paterno}`, 20, 60);
    doc.text(`Materno: ${ticket.materno}`, 20, 70);
    doc.text(`Teléfono: ${ticket.telefono}`, 20, 80);
    doc.text(`Celular: ${ticket.celular}`, 20, 90);
    doc.text(`Correo: ${ticket.correo}`, 20, 100);
    doc.text(`Nivel: ${ticket.nivel}`, 20, 110);
    doc.text(`Municipio: ${ticket.municipio}`, 20, 120);
    doc.text(`Asunto: ${ticket.asunto}`, 20, 130);
    doc.text(`Turno: ${ticket.turno}`, 20, 140);

    doc.addImage(document.querySelector("#qrCode"), "PNG", 20, 150, 50, 50);

    doc.save(`Ticket_${ticket.curp}.pdf`);
  };

  const limpiar = () => {
    setNombreCompleto("");
    setCurp("");
    setNombre("");
    setPaterno("");
    setMaterno("");
    setTelefono("");
    setCelular("");
    setCorreo("");
    setNivel("");
    setMunicipio("");
    setAsunto("");
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>Solicitud de Ticket</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre Completo:</span>
            <input
              onChange={(event) => setNombreCompleto(event.target.value)}
              type="text"
              className="form-control"
              value={nombreCompleto}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">CURP:</span>
            <input
              onChange={(event) => setCurp(event.target.value)}
              type="text"
              className="form-control"
              value={curp}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input
              onChange={(event) => setNombre(event.target.value)}
              type="text"
              className="form-control"
              value={nombre}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Paterno:</span>
            <input
              onChange={(event) => setPaterno(event.target.value)}
              type="text"
              className="form-control"
              value={paterno}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Materno:</span>
            <input
              onChange={(event) => setMaterno(event.target.value)}
              type="text"
              className="form-control"
              value={materno}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Teléfono:</span>
            <input
              onChange={(event) => setTelefono(event.target.value)}
              type="text"
              className="form-control"
              value={telefono}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Celular:</span>
            <input
              onChange={(event) => setCelular(event.target.value)}
              type="text"
              className="form-control"
              value={celular}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Correo:</span>
            <input
              onChange={(event) => setCorreo(event.target.value)}
              type="text"
              className="form-control"
              value={correo}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Nivel:</span>
            <select
              onChange={(event) => setNivel(event.target.value)}
              className="form-control"
              value={nivel}
            >
              <option value="">Selecciona Nivel</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Universidad">Universidad</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Municipio:</span>
            <select
              onChange={(event) => setMunicipio(event.target.value)}
              className="form-control"
              value={municipio}
            >
              <option value="">Selecciona Municipio</option>
              <option value="Municipio1">Coahuila de Zaragoza</option>
              <option value="Municipio2">Nuevo Leon</option>
              <option value="Municipio3">Coahuila</option>
              <option value="Municipio4">Durango</option>
              <option value="Municipio5">Zacatecas</option>
              <option value="Municipio6">San Luis Potosi</option>
              <option value="Municipio7">Aguascalientes</option>
              <option value="Municipio8">Jalisco</option>
              <option value="Municipio9">Colima</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Asunto:</span>
            <select
              onChange={(event) => setAsunto(event.target.value)}
              className="form-control"
              value={asunto}
            >
              <option value="">Selecciona el Asunto</option>
              <option value="Darse de baja">Darse de baja</option>
              <option value="Darse de alta">Darse de alta</option>
              <option value="Inscribir materias">Inscribir materias</option>
              <option value="Revalidar materias">Revalidar materias</option>
              <option value="Constancia de estudios">Constancia de estudios</option>
              <option value="Carta de pasante">Carta de pasante</option>
              <option value="Titulacion">Titulacion</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success m-2" onClick={handleSubmit}>Generar Turno</button>
          </div>
        </div>
      </div>
      <div className="d-none">
        <QRCode id="qrCode" value={`CURP: ${curp}`} />
      </div>
    </div>
  );
};

export default TicketForm;
