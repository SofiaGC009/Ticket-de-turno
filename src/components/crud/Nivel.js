import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../common/NavBar";

function Nivel() {
  const [idNivel, setIdNivel] = useState("");
  const [nivel, setNivel] = useState("");

  const [editar, setEditar] = useState(false);

  const [nivelList, setNivelList] = useState([]);

  const obtenerUltimoIdNivel = useCallback(() => {
    const ultimoId =
      nivelList.length > 0 ? Math.max(...nivelList.map((v) => v.id)) : 0;
    setIdNivel(ultimoId + 1);
  }, [nivelList]);

  const validateInput = () => {
    if (!nivel.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel no puede estar vacío.",
      });
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nivel)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel solo puede contener letras y espacios.",
      });
      return false;
    }

    if (
      nivelList.some(
        (n) =>
          n.nombre.toLowerCase() === nivel.trim().toLowerCase() &&
          n.id !== idNivel
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nivel ya existe.",
      });
      return false;
    }

    return true;
  };

  const registrar = () => {
    if (!validateInput()) return;

    const nuevoNivel = { id: idNivel, nombre: nivel };
    setNivelList([...nivelList, nuevoNivel]);
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Nivel " + nivel + " registrado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const update = () => {
    if (!validateInput()) return;

    setNivelList(
      nivelList.map((n) =>
        n.id === idNivel ? { id: idNivel, nombre: nivel } : n
      )
    );
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Nivel " + nivel + " actualizado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el nivel?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNivelList(nivelList.filter((n) => n.id !== val.id));
        limpiar();
        Swal.fire(
          "Eliminado!",
          `El nivel ${val.nombre} fue eliminado.`,
          "success"
        );
      }
    });
  };

  const editarNivel = (val) => {
    setEditar(true);
    setIdNivel(val.id);
    setNivel(val.nombre);
  };

  const limpiar = () => {
    setIdNivel("");
    setNivel("");
    setEditar(false);
    obtenerUltimoIdNivel();
  };

  useEffect(() => {
    obtenerUltimoIdNivel();
  }, [nivelList, obtenerUltimoIdNivel]);

  return (
    <div className="container">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>NIVELES</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Id Nivel:</span>
              <input
                type="text"
                className="form-control"
                value={idNivel}
                readOnly
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Nivel:</span>
              <input
                type="text"
                className="form-control"
                value={nivel}
                onChange={(event) => setNivel(event.target.value)}
              />
            </div>
          </div>
          {editar ? (
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-danger m-2" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button className="btn btn-success m-2" onClick={registrar}>
                Registrar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {nivelList.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.nombre}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => editarNivel(val)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminar(val)}
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

export default Nivel;
