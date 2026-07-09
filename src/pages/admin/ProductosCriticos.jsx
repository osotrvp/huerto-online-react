import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerProductos } from "../../services/productosData";

function ProductosCriticos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos().filter((p) => p.stock <= 10));
  }, []);

  return (
    <AdminLayout titulo="Listado de Productos Críticos">
      <div className="bg-white rounded-4 shadow-sm p-4">
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Acciones</th></tr></thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td>
                <td><span className="badge bg-danger">{p.stock}</span></td>
                <td><Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-secondary">Editar stock</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {productos.length === 0 && <p className="text-muted text-center">Sin productos con stock crítico.</p>}
      </div>
    </AdminLayout>
  );
}
export default ProductosCriticos;