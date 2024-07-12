import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../common/NavBar";

function Municipios() {
  const [idMunicipio, setIdMunicipio] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [editar, setEditar] = useState(false);
  const [municipioList, setMunicipioList] = useState([]);

  const obtenerUltimoIdMunicipio = useCallback(() => {
    const ultimoId =
      municipioList.length > 0
        ? Math.max(...municipioList.map((v) => v.id))
        : 0;
    setIdMunicipio(ultimoId + 1);
  }, [municipioList]);

  const validateInput = () => {
    if (!municipio.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Municipio no puede estar vacío.",
      });
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(municipio)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Municipio solo puede contener letras y espacios.",
      });
      return false;
    }

    if (
      municipioList.some(
        (m) =>
          m.nombre.toLowerCase() === municipio.trim().toLowerCase() &&
          m.id !== idMunicipio
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El municipio ya existe.",
      });
      return false;
    }

    return true;
  };

  const registrar = () => {
    if (!validateInput()) return;

    const nuevoMunicipio = { id: idMunicipio, nombre: municipio };
    setMunicipioList([...municipioList, nuevoMunicipio]);
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Municipio " + municipio + " registrado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const update = () => {
    if (!validateInput()) return;

    setMunicipioList(
      municipioList.map((m) =>
        m.id === idMunicipio ? { id: idMunicipio, nombre: municipio } : m
      )
    );
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Municipio " + municipio + " actualizado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el municipio?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMunicipioList(municipioList.filter((m) => m.id !== val.id));
        limpiar();
        Swal.fire(
          "Eliminado!",
          `El municipio ${val.nombre} fue eliminado.`,
          "success"
        );
      }
    });
  };

  const editarMunicipio = (val) => {
    setEditar(true);
    setIdMunicipio(val.id);
    setMunicipio(val.nombre);
  };

  const limpiar = () => {
    setIdMunicipio("");
    setMunicipio("");
    setEditar(false);
    obtenerUltimoIdMunicipio();
  };

  useEffect(() => {
    obtenerUltimoIdMunicipio();
  }, [municipioList, obtenerUltimoIdMunicipio]);

  return (
    <div className="container">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>MUNICIPIOS</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Id Municipio:</span>
              <input
                type="text"
                className="form-control"
                value={idMunicipio}
                readOnly
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Municipio:</span>
              <input
                type="text"
                className="form-control"
                value={municipio}
                onChange={(event) => setMunicipio(event.target.value)}
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
              <th>Municipio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {municipioList.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.nombre}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => editarMunicipio(val)}
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

export default Municipios;
