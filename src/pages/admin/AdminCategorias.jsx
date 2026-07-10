import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from "../../services/categoriasData";

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", valor: "", icono: "" });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.valor.trim()) return;

    if (editandoId) {
      setCategorias(actualizarCategoria(editandoId, form));
      setEditandoId(null);
    } else {
      setCategorias(crearCategoria(form));
    }
    setForm({ nombre: "", valor: "", icono: "" });
  }

  function handleEditar(cat) {
    setEditandoId(cat.id);
    setForm({ nombre: cat.nombre, valor: cat.valor, icono: cat.icono });
  }

  function handleEliminar(id) {
    setCategorias(eliminarCategoria(id));
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setForm({ nombre: "", valor: "", icono: "" });
  }

  return (
    <AdminLayout titulo="Categorías">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5>{editandoId ? "Editar categoría" : "Nueva categoría"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre</label>
                <input className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="mb-3">
                <label>Valor (sin espacios, ej: verduras)</label>
                <input className="form-control" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value.toLowerCase() })} />
              </div>
              <div className="mb-3">
                <label>Icono (emoji)</label>
                <input className="form-control" value={form.icono} onChange={(e) => setForm({ ...form, icono: e.target.value })} />
              </div>
              <div className="d-flex gap-2">
                {editandoId && <button type="button" className="btn btn-secondary w-100" onClick={cancelarEdicion}>Cancelar</button>}
                <button type="submit" className="btn btn-success w-100">{editandoId ? "Guardar cambios" : "Guardar categoría"}</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5>Categorías actuales</h5>
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>Icono</th><th>Nombre</th><th>Valor</th><th></th></tr></thead>
                <tbody>
                  {categorias.map((c) => (
                    <tr key={c.id}>
                      <td>{c.icono}</td>
                      <td>{c.nombre}</td>
                      <td>{c.valor}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEditar(c)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(c.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminCategorias;