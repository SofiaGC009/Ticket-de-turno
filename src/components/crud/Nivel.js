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
      <div className="card text-center">
        <div className="card-header">
          <h1>NIVELES</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Id Nivel:</span>
            <input
              onChange={(event) => {
                setIdNivel(event.target.value);
              }}
              type="text"
              className="form-control"
              value={idNivel}
              readOnly
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Nivel:</span>
            <input
              onChange={(event) => {
                setNivel(event.target.value);
              }}
              type="text"
              className="form-control"
              value={nivel}
            />
          </div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-danger m-2" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={registrar}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nivel</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {nivelList.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => editarNivel(val)}
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
  );
}

export default Nivel;
