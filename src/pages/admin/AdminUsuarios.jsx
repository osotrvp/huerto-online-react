import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerUsuarios, eliminarUsuario } from "../../services/usuariosData";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    setUsuarios(obtenerUsuarios());
  }, []);

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  function confirmarEliminar() {
    setUsuarios(eliminarUsuario(idAEliminar));
    setIdAEliminar(null);
  }

  return (
    <AdminLayout titulo="Gestión de Usuarios">
      <div className="d-flex flex-wrap gap-2 mb-3">
        <input className="form-control" style={{ minWidth: "180px", flex: "1 1 200px" }} placeholder="Buscar por nombre o correo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <Link to="/admin/usuarios/nuevo" className="btn btn-success text-nowrap">➕ Nuevo Usuario</Link>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Región</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.email}</td>
                  <td>{u.region}</td>
                  <td className="text-capitalize">{u.rol}</td>
                  <td><span className={`badge ${u.estado === "activo" ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}>{u.estado}</span></td>
                  <td>
                    <Link to={`/admin/usuarios/${u.id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
                    <Link to={`/admin/usuarios/editar/${u.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => setIdAEliminar(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {idAEliminar && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              <h5>¿Eliminar usuario?</h5>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={() => setIdAEliminar(null)}>Cancelar</button>
                <button className="btn btn-danger" onClick={confirmarEliminar}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
export default AdminUsuarios;