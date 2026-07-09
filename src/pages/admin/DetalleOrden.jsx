import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerOrdenPorId } from "../../services/ordenesData";

function DetalleOrden() {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    setOrden(obtenerOrdenPorId(id));
  }, [id]);

  if (!orden) return <AdminLayout titulo="Boleta"><p>Orden no encontrada.</p></AdminLayout>;

  return (
    <AdminLayout titulo={`Boleta #${orden.numeroOrden}`}>
      <div className="bg-white rounded-4 shadow-sm p-4">
        <div className="row g-3 mb-3">
          <div className="col-md-4"><label className="small">Nombre</label><input className="form-control" disabled value={orden.nombre} /></div>
          <div className="col-md-4"><label className="small">Apellidos</label><input className="form-control" disabled value={orden.apellidos} /></div>
          <div className="col-md-4"><label className="small">Correo</label><input className="form-control" disabled value={orden.correo} /></div>
        </div>
        <p className="text-muted">{orden.calle} {orden.depto && `, Depto ${orden.depto}`} — {orden.comuna}, {orden.region}</p>
        <table className="table my-3">
          <thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
          <tbody>
            {orden.carrito.map((item) => (
              <tr key={item.id}><td>{item.nombre}</td><td>${item.precio.toLocaleString("es-CL")}</td><td>{item.cantidad}</td><td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="bg-light rounded-3 p-3 text-center fs-5 fw-bold">Total pagado: ${orden.total.toLocaleString("es-CL")}</div>
      </div>
    </AdminLayout>
  );
}
export default DetalleOrden;