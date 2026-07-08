import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerProductoPorId, crearProducto, actualizarProducto } from "../../services/productosData";

function FormularioProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState({ nombre: "", categoria: "", precio: "", stock: "", imagen: "", descripcion: "", origen: "", destacado: false, oferta: false, precioOferta: "" });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (esEdicion) {
      const p = obtenerProductoPorId(id);
      if (p) setForm({ ...p, precioOferta: p.precioOferta || "" });
    }
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!form.nombre.trim() || form.nombre.length < 3) err.nombre = "Mínimo 3 caracteres";
    if (!form.categoria) err.categoria = "Requerido";
    if (form.precio === "" || Number(form.precio) < 0) err.precio = "Precio inválido";
    if (form.stock === "" || Number(form.stock) < 0) err.stock = "Stock inválido";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const datos = {
      nombre: form.nombre, categoria: form.categoria, precio: Number(form.precio), stock: Number(form.stock),
      imagen: form.imagen || "default.jpg", descripcion: form.descripcion, origen: form.origen,
      destacado: form.destacado, oferta: form.oferta, precioOferta: form.oferta ? Number(form.precioOferta) : undefined
    };

    if (esEdicion) actualizarProducto(Number(id), datos);
    else crearProducto(datos);

    navigate("/admin/productos");
  }

  return (
    <AdminLayout titulo={esEdicion ? "Editar Producto" : "Nuevo Producto"}>
      <div className="bg-white rounded-4 shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Nombre</label>
              <input name="nombre" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={form.nombre} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Categoría</label>
              <select name="categoria" className={`form-select ${errores.categoria ? "is-invalid" : ""}`} value={form.categoria} onChange={handleChange}>
                <option value="">Seleccione</option>
                <option value="verduras">Verduras</option>
                <option value="frutas">Frutas</option>
                <option value="hierbas">Hierbas</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Precio</label>
              <input name="precio" type="number" className={`form-control ${errores.precio ? "is-invalid" : ""}`} value={form.precio} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Stock</label>
              <input name="stock" type="number" className={`form-control ${errores.stock ? "is-invalid" : ""}`} value={form.stock} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Imagen (nombre de archivo)</label>
              <input name="imagen" className="form-control" value={form.imagen} onChange={handleChange} placeholder="Ej: tomate.jpg" />
            </div>
            <div className="col-md-6">
              <label>Origen</label>
              <input name="origen" className="form-control" value={form.origen} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label>Descripción</label>
              <textarea name="descripcion" className="form-control" rows="3" value={form.descripcion} onChange={handleChange}></textarea>
            </div>
            <div className="col-md-6 form-check">
              <input type="checkbox" name="destacado" className="form-check-input" checked={form.destacado} onChange={handleChange} />
              <label className="form-check-label">Mostrar en destacados</label>
            </div>
            <div className="col-md-6 form-check">
              <input type="checkbox" name="oferta" className="form-check-input" checked={form.oferta} onChange={handleChange} />
              <label className="form-check-label">Marcar como oferta</label>
            </div>
            {form.oferta && (
              <div className="col-md-6">
                <label>Precio en oferta</label>
                <input name="precioOferta" type="number" className="form-control" value={form.precioOferta} onChange={handleChange} />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/productos")}>Cancelar</button>
            <button type="submit" className="btn btn-success">Guardar Producto</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
export default FormularioProducto;