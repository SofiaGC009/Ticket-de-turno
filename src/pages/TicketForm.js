import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

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
  const [turno, setTurno] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

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
    const curpPattern = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]{1}\d{1}$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombreCompleto.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nombre Completo no puede estar vacío.",
      });
      return false;
    }
    if (!curp.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo CURP no puede estar vacío.",
      });
      return false;
    }
    if (!nombre.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nombre no puede estar vacío.",
      });
      return false;
    }
    if (!paterno.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Paterno no puede estar vacío.",
      });
      return false;
    }
    if (!materno.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Materno no puede estar vacío.",
      });
      return false;
    }
    if (!telefono.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Teléfono no puede estar vacío.",
      });
      return false;
    }
    if (!celular.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Celular no puede estar vacío.",
      });
      return false;
    }
    if (!correo.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Correo no puede estar vacío.",
      });
      return false;
    }
    if (!nivel.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel no puede estar vacío.",
      });
      return false;
    }
    if (!municipio.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Municipio no puede estar vacío.",
      });
      return false;
    }
    if (!asunto.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Asunto no puede estar vacío.",
      });
      return false;
    }
    if (!curpPattern.test(curp)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "CURP no es válido.",
      });
      return false;
    }
    if (!phonePattern.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Teléfono no es válido. Debe tener 10 dígitos.",
      });
      return false;
    }
    if (!phonePattern.test(celular)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Celular no es válido. Debe tener 10 dígitos.",
      });
      return false;
    }
    if (!emailPattern.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo no es válido.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const nuevoTurno = isEditing ? parseInt(turno) : obtenerTurno(municipio);

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
      turno: nuevoTurno,
    };

    const index = ticketList.findIndex(
      (ticket) => ticket.curp === curp && ticket.turno === nuevoTurno
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

    const qrCanvas = document.getElementById("qrCode");
    const qrDataURL = qrCanvas.toDataURL("image/png");
    doc.addImage(qrDataURL, "PNG", 20, 150, 50, 50);

    doc.save(`Ticket_${ticket.curp}.pdf`);
  };

  const buscarTicket = () => {
    if (!curp.trim() || !turno.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "CURP y número de turno son obligatorios para buscar un ticket.",
      });
      return;
    }

    const ticket = ticketList.find(
      (ticket) => ticket.curp === curp && ticket.turno === parseInt(turno)
    );

    if (ticket) {
      setNombreCompleto(ticket.nombreCompleto);
      setNombre(ticket.nombre);
      setPaterno(ticket.paterno);
      setMaterno(ticket.materno);
      setTelefono(ticket.telefono);
      setCelular(ticket.celular);
      setCorreo(ticket.correo);
      setNivel(ticket.nivel);
      setMunicipio(ticket.municipio);
      setAsunto(ticket.asunto);
      setIsEditing(true);
      Swal.fire({
        icon: "success",
        title: "Ticket encontrado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ticket no encontrado. Verifique CURP y número de turno.",
      });
    }
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
    setTurno("");
    setIsEditing(false);
  };

  const regresarInicio = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card text-center mt-4">
        <div className="card-header">
          <h1>Solicitud de Ticket</h1>
        </div>
        <div className="card-body">
          <p>
            Complete los siguientes campos para registrar un nuevo ticket o
            para modificar un ticket existente. No rellene el campo de numero de turno 
            si desea generar un nuevo ticket.
          </p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">CURP:</label>
              <input
                onChange={(event) => setCurp(event.target.value)}
                type="text"
                className="form-control"
                value={curp}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Número de Turno:</label>
              <input
                onChange={(event) => setTurno(event.target.value)}
                type="text"
                className="form-control"
                value={turno}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre Completo:</label>
              <input
                onChange={(event) => setNombreCompleto(event.target.value)}
                type="text"
                className="form-control"
                value={nombreCompleto}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre:</label>
              <input
                onChange={(event) => setNombre(event.target.value)}
                type="text"
                className="form-control"
                value={nombre}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Paterno:</label>
              <input
                onChange={(event) => setPaterno(event.target.value)}
                type="text"
                className="form-control"
                value={paterno}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Materno:</label>
              <input
                onChange={(event) => setMaterno(event.target.value)}
                type="text"
                className="form-control"
                value={materno}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono:</label>
              <input
                onChange={(event) => setTelefono(event.target.value)}
                type="text"
                className="form-control"
                value={telefono}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Celular:</label>
              <input
                onChange={(event) => setCelular(event.target.value)}
                type="text"
                className="form-control"
                value={celular}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo:</label>
              <input
                onChange={(event) => setCorreo(event.target.value)}
                type="text"
                className="form-control"
                value={correo}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nivel:</label>
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Municipio:</label>
              <select
                onChange={(event) => setMunicipio(event.target.value)}
                className="form-control"
                value={municipio}
              >
                <option value="">Selecciona Municipio</option>
                <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                <option value="Nuevo Leon">Nuevo Leon</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Durango">Durango</option>
                <option value="Zacatecas">Zacatecas</option>
                <option value="San Luis Potosi">San Luis Potosi</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Colima">Colima</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Asunto:</label>
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
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success m-2" onClick={handleSubmit}>
              {isEditing ? "Modificar Ticket" : "Generar Turno"}
            </button>
            <button className="btn btn-info m-2" onClick={buscarTicket}>
              Buscar Ticket
            </button>
            <button className="btn btn-secondary m-2" onClick={regresarInicio}>
              Regresar al Inicio
            </button>
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
