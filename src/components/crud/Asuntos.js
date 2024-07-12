import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../common/NavBar";

function Asuntos() {
  const [idAsunto, setIdAsunto] = useState("");
  const [asunto, setAsunto] = useState("");
  const [editar, setEditar] = useState(false);
  const [asuntoList, setAsuntoList] = useState([]);

  const obtenerUltimoIdAsunto = useCallback(() => {
    const ultimoId = asuntoList.length > 0 ? Math.max(...asuntoList.map(v => v.id)) : 0;
    setIdAsunto(ultimoId + 1);
  }, [asuntoList]);

  const validateInput = () => {
    if (!asunto.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Asunto no puede estar vacío.",
      });
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(asunto)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Asunto solo puede contener letras y espacios.",
      });
      return false;
    }

    if (asuntoList.some(a => a.nombre.toLowerCase() === asunto.trim().toLowerCase() && a.id !== idAsunto)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El asunto ya existe.",
      });
      return false;
    }

    return true;
  };

  const registrar = () => {
    if (!validateInput()) return;

    const nuevoAsunto = { id: idAsunto, nombre: asunto };
    setAsuntoList([...asuntoList, nuevoAsunto]);
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Asunto " + asunto + " registrado",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const update = () => {
    if (!validateInput()) return;

    setAsuntoList(asuntoList.map(a => (a.id === idAsunto ? { id: idAsunto, nombre: asunto } : a)));
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Asunto " + asunto + " actualizado",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el asunto?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAsuntoList(asuntoList.filter(a => a.id !== val.id));
        limpiar();
        Swal.fire("Eliminado!", `El asunto ${val.nombre} fue eliminado.`, "success");
      }
    });
  };

  const editarAsunto = (val) => {
    setEditar(true);
    setIdAsunto(val.id);
    setAsunto(val.nombre);
  };

  const limpiar = () => {
    setIdAsunto("");
    setAsunto("");
    setEditar(false);
    obtenerUltimoIdAsunto();
  };

  useEffect(() => {
    obtenerUltimoIdAsunto();
  }, [asuntoList, obtenerUltimoIdAsunto]);

  return (
    <div className="container">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>ASUNTOS</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Id Asunto:</span>
              <input
                type="text"
                className="form-control"
                value={idAsunto}
                readOnly
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Asunto:</span>
              <input
                type="text"
                className="form-control"
                value={asunto}
                onChange={(event) => setAsunto(event.target.value)}
              />
            </div>
          </div>
          {editar ? (
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-danger m-2" onClick={limpiar}>Cancelar</button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button className="btn btn-success m-2" onClick={registrar}>Registrar</button>
            </div>
          )}
        </div>
      </div>
      <div className="card mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Asunto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asuntoList.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.nombre}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      onClick={() => editarAsunto(val)}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminar(val)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Asuntos;
