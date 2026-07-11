import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerUsuarios } from "../../services/usuariosData";
import { obtenerOrdenes } from "../../services/ordenesData";

function DetalleUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const u = obtenerUsuarios().find((x) => x.id === Number(id));
    setUsuario(u);
    if (u) setOrdenes(obtenerOrdenes().filter((o) => o.correo.toLowerCase() === u.email.toLowerCase()));
  }, [id]);

  if (!usuario) return <AdminLayout titulo="Usuario"><p>Usuario no encontrado.</p></AdminLayout>;

  return (
    <AdminLayout titulo={`${usuario.nombre} ${usuario.apellido}`}>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <p><strong>Correo:</strong> {usuario.email}</p>
            <p><strong>Región:</strong> {usuario.region}</p>
            <p><strong>Comuna:</strong> {usuario.comuna}</p>
            <p><strong>Rol:</strong> <span className="text-capitalize">{usuario.rol}</span></p>
            <p><strong>Estado:</strong> {usuario.estado}</p>
            <Link to={`/admin/usuarios/editar/${usuario.id}`} className="btn btn-outline-secondary w-100 mt-2">Editar usuario</Link>
          </div>
        </div>
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5>Historial de Compras</h5>
            {ordenes.length === 0 ? (
              <p className="text-muted">Este usuario no tiene compras registradas.</p>
            ) : (
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>N° Orden</th><th>Total</th><th>Fecha</th><th></th></tr></thead>
                <tbody>
                  {ordenes.map((o) => (
                    <tr key={o.numeroOrden}>
                      <td>#{o.numeroOrden}</td>
                      <td>${o.total.toLocaleString("es-CL")}</td>
                      <td>{new Date(o.fechaCompra).toLocaleDateString("es-CL")}</td>
                      <td><Link to={`/admin/ordenes/${o.numeroOrden}`} className="btn btn-sm btn-outline-secondary">Ver boleta</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
export default DetalleUsuario;