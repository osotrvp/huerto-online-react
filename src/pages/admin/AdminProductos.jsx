import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerProductos, eliminarProducto } from "../../services/productosData";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const filtrados = productos
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((p) => categoria === "todos" || p.categoria === categoria);

  function confirmarEliminar() {
    setProductos(eliminarProducto(idAEliminar));
    setIdAEliminar(null);
  }

  return (
    <AdminLayout titulo="Gestión de Productos">
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Buscar producto..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <select className="form-select" style={{ width: "200px" }} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todos">Todas las categorías</option>
          <option value="verduras">Verduras</option>
          <option value="frutas">Frutas</option>
          <option value="hierbas">Hierbas</option>
          <option value="otros">Otros</option>
        </select>
        <Link to="/admin/productos/nuevo" className="btn btn-success text-nowrap">➕ Nuevo Producto</Link>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td>{p.stock}</td>
                <td>
                  <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => setIdAEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && <p className="text-muted text-center">No se encontraron productos.</p>}
      </div>

      {idAEliminar && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              <h5>¿Eliminar producto?</h5>
              <p className="text-muted">Esta acción no se puede deshacer.</p>
              <div className="d-flex gap-2 justify-content-center">
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
export default AdminProductos;