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

  const registrar = () => {
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
      <div className="card text-center">
        <div className="card-header">
          <h1>ASUNTOS</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Id Asunto:</span>
            <input
              onChange={(event) => {
                setIdAsunto(event.target.value);
              }}
              type="text"
              className="form-control"
              value={idAsunto}
              readOnly
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Asunto:</span>
            <input
              onChange={(event) => {
                setAsunto(event.target.value);
              }}
              type="text"
              className="form-control"
              value={asunto}
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
            <th scope="col">Asunto</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asuntoList.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
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
  );
}

export default Asuntos;
