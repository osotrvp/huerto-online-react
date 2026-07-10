import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerOrdenes } from "../../services/ordenesData";

function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setOrdenes(obtenerOrdenes().reverse());
  }, []);

  return (
    <AdminLayout titulo="Órdenes / Boletas">
      <div className="bg-white rounded-4 shadow-sm p-4">
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>N° Orden</th><th>Cliente</th><th>Correo</th><th>Total</th><th>Fecha</th><th>Acciones</th></tr></thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.numeroOrden}>
                  <td>#{o.numeroOrden}</td>
                  <td>{o.nombre} {o.apellidos}</td>
                  <td>{o.correo}</td>
                  <td>${o.total.toLocaleString("es-CL")}</td>
                  <td>{new Date(o.fechaCompra).toLocaleDateString("es-CL")}</td>
                  <td><Link to={`/admin/ordenes/${o.numeroOrden}`} className="btn btn-sm btn-outline-secondary">Mostrar Boleta</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {ordenes.length === 0 && <p className="text-muted text-center">No hay órdenes registradas.</p>}
      </div>
    </AdminLayout>
  );
}
export default AdminOrdenes;