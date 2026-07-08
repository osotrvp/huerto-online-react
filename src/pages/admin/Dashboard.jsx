import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { obtenerProductos } from "../../services/productosData";
import { obtenerUsuarios } from "../../services/usuariosData";

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
    setUsuarios(obtenerUsuarios());
  }, []);

  const stockBajo = productos.filter((p) => p.stock <= 10).length;
  const categorias = new Set(productos.map((p) => p.categoria)).size;
  const ultimos = productos.slice(-5).reverse();

  return (
    <AdminLayout titulo="Dashboard">
      <div className="row g-3 mb-4">
        <div className="col-3">
          <div className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-center gap-3">
            <span style={{ fontSize: "1.8rem" }}>🥦</span>
            <div><strong className="fs-4 d-block">{productos.length}</strong><small className="text-muted">Productos</small></div>
          </div>
        </div>
        <div className="col-3">
          <div className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-center gap-3">
            <span style={{ fontSize: "1.8rem" }}>👤</span>
            <div><strong className="fs-4 d-block">{usuarios.length}</strong><small className="text-muted">Usuarios</small></div>
          </div>
        </div>
        <div className="col-3">
          <div className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-center gap-3">
            <span style={{ fontSize: "1.8rem" }}>⚠️</span>
            <div><strong className="fs-4 d-block">{stockBajo}</strong><small className="text-muted">Stock bajo</small></div>
          </div>
        </div>
        <div className="col-3">
          <div className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-center gap-3">
            <span style={{ fontSize: "1.8rem" }}>📦</span>
            <div><strong className="fs-4 d-block">{categorias}</strong><small className="text-muted">Categorías</small></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-4 shadow-sm p-4">
        <h5>Últimos productos agregados</h5>
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr></thead>
          <tbody>
            {ultimos.map((p) => (
              <tr key={p.id}><td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td>${p.precio.toLocaleString("es-CL")}</td><td>{p.stock}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
export default Dashboard;