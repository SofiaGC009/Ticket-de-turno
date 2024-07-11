import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../common/NavBar";

function Municipios() {
  const [idMunicipio, setIdMunicipio] = useState("");
  const [municipio, setMunicipio] = useState("");

  const [editar, setEditar] = useState(false);

  const [municipioList, setMunicipioList] = useState([]);

  const obtenerUltimoIdMunicipio = useCallback(() => {
    const ultimoId = municipioList.length > 0 ? Math.max(...municipioList.map(v => v.id)) : 0;
    setIdMunicipio(ultimoId + 1);
  }, [municipioList]);

  const registrar = () => {
    const nuevoMunicipio = { id: idMunicipio, nombre: municipio };
    setMunicipioList([...municipioList, nuevoMunicipio]);
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Municipio " + municipio + " registrado",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const update = () => {
    setMunicipioList(municipioList.map(m => (m.id === idMunicipio ? { id: idMunicipio, nombre: municipio } : m)));
    limpiar();
    Swal.fire({
      icon: "success",
      title: "Municipio " + municipio + " actualizado",
      showConfirmButton: false,
      timer: 1500
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
        setMunicipioList(municipioList.filter(m => m.id !== val.id));
        limpiar();
        Swal.fire("Eliminado!", `El municipio ${val.nombre} fue eliminado.`, "success");
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
      <div className="card text-center">
        <div className="card-header">
          <h1>MUNICIPIOS</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Id Municipio:</span>
            <input
              onChange={(event) => {
                setIdMunicipio(event.target.value);
              }}
              type="text"
              className="form-control"
              value={idMunicipio}
              readOnly
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Municipio:</span>
            <input
              onChange={(event) => {
                setMunicipio(event.target.value);
              }}
              type="text"
              className="form-control"
              value={municipio}
            />
          </div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-danger m-2" onClick={limpiar}>Cancelar</button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={registrar}>Registrar</button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Municipio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {municipioList.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => editarMunicipio(val)}
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

export default Municipios;
