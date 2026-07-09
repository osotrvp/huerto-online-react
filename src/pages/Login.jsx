import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { buscarUsuarioPorCredenciales } from "../services/usuariosData";
import { iniciarSesion, obtenerSesion } from "../services/authData";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sesion = obtenerSesion();
    if (sesion) navigate(sesion.rol === "admin" || sesion.rol === "vendedor" ? "/admin" : "/");
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validarCorreoDominio(correo, dominios) {
    const partes = correo.split("@");
    if (partes.length !== 2) return false;
    return dominios.includes("@" + partes[1].toLowerCase());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = {};

    if (!form.email.trim()) nuevosErrores.email = "El correo es requerido";
    else if (!validarCorreoDominio(form.email, ["@inacap.cl", "@inacapmail.cl", "@gmail.com"])) nuevosErrores.email = "Solo @inacap.cl, @inacapmail.cl o @gmail.com";

    if (!form.password) nuevosErrores.password = "La contraseña es requerida";
    else if (form.password.length < 4 || form.password.length > 10) nuevosErrores.password = "Entre 4 y 10 caracteres";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const usuario = await buscarUsuarioPorCredenciales(form.email, form.password);
    if (!usuario) {
      setMensaje("❌ Correo o contraseña incorrectos");
      return;
    }

    iniciarSesion(usuario);
    setMensaje(`✅ Bienvenido/a, ${usuario.nombre}. Redirigiendo...`);
    setTimeout(() => {
      navigate(usuario.rol === "admin" || usuario.rol === "vendedor" ? "/admin" : "/");
    }, 1000);
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: "450px" }}>
          <h2>Iniciar Sesión</h2>
          <p className="text-muted">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Correo electrónico</label>
              <input name="email" className={`form-control ${errores.email ? "is-invalid" : ""}`} value={form.email} onChange={handleChange} />
              {errores.email && <div className="invalid-feedback">{errores.email}</div>}
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input name="password" type="password" className={`form-control ${errores.password ? "is-invalid" : ""}`} value={form.password} onChange={handleChange} />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
            </div>
            <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
            {mensaje && <div className={`alert mt-3 ${mensaje.startsWith("✅") ? "alert-success" : "alert-danger"}`}>{mensaje}</div>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default Login;