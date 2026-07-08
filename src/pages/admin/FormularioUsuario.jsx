import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { obtenerUsuarios, agregarUsuario, actualizarUsuario } from "../../services/usuariosData";
import { regiones } from "../../services/regionesData";

function FormularioUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", telefono: "", region: "", comuna: "", rol: "cliente", estado: "activo", password: "" });
  const comunasDisponibles = regiones.find((r) => r.nombre === form.region)?.comunas || [];

  useEffect(() => {
    if (esEdicion) {
      const u = obtenerUsuarios().find((x) => x.id === Number(id));
      if (u) setForm({ ...u, password: "" });
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value, ...(name === "region" ? { comuna: "" } : {}) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (esEdicion) {
      actualizarUsuario(Number(id), { nombre: form.nombre, apellido: form.apellido, email: form.email, telefono: form.telefono, region: form.region, comuna: form.comuna, rol: form.rol, estado: form.estado });
    } else {
      await agregarUsuario({ nombre: form.nombre, apellido: form.apellido, rut: "", email: form.email, telefono: form.telefono, region: form.region, comuna: form.comuna, rol: form.rol, estado: form.estado, password: form.password, fechaRegistro: new Date().toISOString().slice(0, 10) });
    }
    navigate("/admin/usuarios");
  }

  return (
    <AdminLayout titulo={esEdicion ? "Editar Usuario" : "Nuevo Usuario"}>
      <div className="bg-white rounded-4 shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} /></div>
            <div className="col-md-6"><label>Apellido</label><input name="apellido" className="form-control" value={form.apellido} onChange={handleChange} /></div>
            <div className="col-md-6"><label>Correo</label><input name="email" className="form-control" value={form.email} onChange={handleChange} /></div>
            <div className="col-md-6"><label>Teléfono</label><input name="telefono" className="form-control" value={form.telefono} onChange={handleChange} /></div>
            <div className="col-md-6">
              <label>Región</label>
              <select name="region" className="form-select" value={form.region} onChange={handleChange}>
                <option value="">Seleccione</option>
                {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label>Comuna</label>
              <select name="comuna" className="form-select" value={form.comuna} onChange={handleChange} disabled={!form.region}>
                <option value="">Seleccione</option>
                {comunasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label>Rol</label>
              <select name="rol" className="form-select" value={form.rol} onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Estado</label>
              <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            {!esEdicion && (
              <div className="col-12">
                <label>Contraseña</label>
                <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/usuarios")}>Cancelar</button>
            <button type="submit" className="btn btn-success">Guardar Usuario</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
export default FormularioUsuario;