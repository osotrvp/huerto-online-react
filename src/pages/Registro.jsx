import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { agregarUsuario, existeCorreoUsuario } from "../services/usuariosData";
import { regiones } from "../services/regionesData";

function Registro() {
  const [form, setForm] = useState({ nombre: "", apellido: "", rut: "", email: "", region: "", comuna: "", direccion: "", password: "", confirmarPassword: "", terminos: false });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const comunasDisponibles = regiones.find((r) => r.nombre === form.region)?.comunas || [];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, ...(name === "region" ? { comuna: "" } : {}) }));
  }

  function validarCorreoDominio(correo, dominios) {
    const partes = correo.split("@");
    if (partes.length !== 2) return false;
    return dominios.includes("@" + partes[1].toLowerCase());
  }

  function validarRut(rutSinFormato) {
    const rutLimpio = rutSinFormato.replace(/[^0-9kK]/g, "");
    if (rutLimpio.length < 7 || rutLimpio.length > 9) return false;
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const resto = 11 - (suma % 11);
    const dvCalculado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === dvCalculado;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = {};

    if (!form.nombre.trim()) err.nombre = "Requerido";
    else if (form.nombre.length > 50) err.nombre = "Máximo 50 caracteres";

    if (!form.apellido.trim()) err.apellido = "Requerido";
    else if (form.apellido.length > 100) err.apellido = "Máximo 100 caracteres";

    if (!form.rut.trim()) err.rut = "Requerido";
    else if (!validarRut(form.rut)) err.rut = "RUT inválido";

    if (!form.email.trim()) err.email = "Requerido";
    else if (!validarCorreoDominio(form.email, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"])) err.email = "Solo @inacap.cl, @profesor.inacap.cl o @gmail.com";

    if (!form.region) err.region = "Requerido";
    if (!form.comuna) err.comuna = "Requerido";
    if (!form.direccion.trim()) err.direccion = "Requerido";

    if (!form.password) err.password = "Requerido";
    else if (form.password.length < 4 || form.password.length > 10) err.password = "Entre 4 y 10 caracteres";

    if (form.confirmarPassword !== form.password) err.confirmarPassword = "Las contraseñas no coinciden";
    if (!form.terminos) err.terminos = "Debes aceptar los términos";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    if (existeCorreoUsuario(form.email)) {
      setErrores({ email: "Ya existe una cuenta con este correo" });
      return;
    }

    await agregarUsuario({
      nombre: form.nombre, apellido: form.apellido, rut: form.rut, email: form.email,
      password: form.password, telefono: "", region: form.region, comuna: form.comuna,
      direccion: form.direccion, rol: "cliente", estado: "activo",
      fechaRegistro: new Date().toISOString().slice(0, 10)
    });

    setMensaje("✅ Cuenta creada correctamente. Ya puedes iniciar sesión.");
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2>Crear Cuenta</h2>
          <p className="text-muted">¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Nombre</label>
                <input name="nombre" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={form.nombre} onChange={handleChange} />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label>Apellido</label>
                <input name="apellido" className={`form-control ${errores.apellido ? "is-invalid" : ""}`} value={form.apellido} onChange={handleChange} />
                {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
              </div>
              <div className="col-md-6">
                <label>RUT (sin puntos ni guión)</label>
                <input name="rut" className={`form-control ${errores.rut ? "is-invalid" : ""}`} value={form.rut} onChange={handleChange} />
                {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
              </div>
              <div className="col-md-6">
                <label>Correo</label>
                <input name="email" className={`form-control ${errores.email ? "is-invalid" : ""}`} value={form.email} onChange={handleChange} />
                {errores.email && <div className="invalid-feedback">{errores.email}</div>}
              </div>
              <div className="col-md-6">
                <label>Región</label>
                <select name="region" className={`form-select ${errores.region ? "is-invalid" : ""}`} value={form.region} onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                </select>
                {errores.region && <div className="invalid-feedback">{errores.region}</div>}
              </div>
              <div className="col-md-6">
                <label>Comuna</label>
                <select name="comuna" className={`form-select ${errores.comuna ? "is-invalid" : ""}`} value={form.comuna} onChange={handleChange} disabled={!form.region}>
                  <option value="">Seleccione</option>
                  {comunasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
              </div>
              <div className="col-12">
                <label>Dirección</label>
                <input name="direccion" className={`form-control ${errores.direccion ? "is-invalid" : ""}`} value={form.direccion} onChange={handleChange} />
                {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
              </div>
              <div className="col-md-6">
                <label>Contraseña</label>
                <input name="password" type="password" className={`form-control ${errores.password ? "is-invalid" : ""}`} value={form.password} onChange={handleChange} />
                {errores.password && <div className="invalid-feedback">{errores.password}</div>}
              </div>
              <div className="col-md-6">
                <label>Confirmar contraseña</label>
                <input name="confirmarPassword" type="password" className={`form-control ${errores.confirmarPassword ? "is-invalid" : ""}`} value={form.confirmarPassword} onChange={handleChange} />
                {errores.confirmarPassword && <div className="invalid-feedback">{errores.confirmarPassword}</div>}
              </div>
              <div className="col-12 form-check">
                <input type="checkbox" name="terminos" className="form-check-input" checked={form.terminos} onChange={handleChange} />
                <label className="form-check-label">Acepto los términos y condiciones</label>
                {errores.terminos && <div className="text-danger small">{errores.terminos}</div>}
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-4">Crear cuenta</button>
            {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default Registro;