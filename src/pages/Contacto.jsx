import { useState } from "react";
import Layout from "../components/Layout";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!form.nombre.trim()) err.nombre = "Requerido";
    if (!form.email.trim()) err.email = "Requerido";
    if (!form.asunto) err.asunto = "Selecciona un asunto";
    if (!form.mensaje.trim()) err.mensaje = "Requerido";
    else if (form.mensaje.length > 500) err.mensaje = "Máximo 500 caracteres";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    setEnviado(true);
    setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 2500);
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1>Contáctanos</h1>
          <p className="text-muted">Estamos para ayudarte. Escríbenos y te respondemos a la brevedad.</p>
        </div>
        <div className="row g-4">
          <div className="col-md-5">
            <p>📍 Santiago, Región Metropolitana</p>
            <p>📞 +56 9 1234 5678</p>
            <p>✉️ contacto@huerthogar.cl</p>
            <p>🕐 Lunes a Viernes: 9:00 - 18:00 hrs</p>
          </div>
          <div className="col-md-7">
            <div className="bg-white rounded-4 shadow-sm p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nombre completo</label>
                  <input name="nombre" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={form.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Correo electrónico</label>
                  <input name="email" className={`form-control ${errores.email ? "is-invalid" : ""}`} value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Asunto</label>
                  <select name="asunto" className={`form-select ${errores.asunto ? "is-invalid" : ""}`} value={form.asunto} onChange={handleChange}>
                    <option value="">-- Selecciona --</option>
                    <option value="consulta">Consulta sobre productos</option>
                    <option value="pedido">Problema con mi pedido</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Mensaje</label>
                  <textarea name="mensaje" rows="4" className={`form-control ${errores.mensaje ? "is-invalid" : ""}`} value={form.mensaje} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">Enviar mensaje</button>
                {enviado && <div className="alert alert-success mt-3">✅ Mensaje enviado correctamente</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Contacto;