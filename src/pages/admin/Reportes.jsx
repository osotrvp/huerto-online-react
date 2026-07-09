import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { obtenerProductos } from "../../services/productosData";
import { obtenerUsuarios } from "../../services/usuariosData";
import { obtenerOrdenes } from "../../services/ordenesData";

function Reportes() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
    setUsuarios(obtenerUsuarios());
    setOrdenes(obtenerOrdenes());
  }, []);

  const totalVentas = ordenes.reduce((t, o) => t + o.total, 0);

  return (
    <AdminLayout titulo="Reportes">
      <div className="row g-3">
        <div className="col-md-3"><div className="bg-white rounded-4 shadow-sm p-4 text-center"><h3>{ordenes.length}</h3><p className="text-muted mb-0">Órdenes totales</p></div></div>
        <div className="col-md-3"><div className="bg-white rounded-4 shadow-sm p-4 text-center"><h3>${totalVentas.toLocaleString("es-CL")}</h3><p className="text-muted mb-0">Ventas totales</p></div></div>
        <div className="col-md-3"><div className="bg-white rounded-4 shadow-sm p-4 text-center"><h3>{productos.length}</h3><p className="text-muted mb-0">Productos activos</p></div></div>
        <div className="col-md-3"><div className="bg-white rounded-4 shadow-sm p-4 text-center"><h3>{usuarios.length}</h3><p className="text-muted mb-0">Usuarios registrados</p></div></div>
      </div>
    </AdminLayout>
  );
}
export default Reportes;