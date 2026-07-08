import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerCarrito, calcularTotales, vaciarCarrito } from "../services/carritoData";
import { regiones } from "../services/regionesData";

function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [form, setForm] = useState({ nombre: "", apellidos: "", correo: "", calle: "", depto: "", region: "", comuna: "", indicaciones: "" });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const c = obtenerCarrito();
    if (c.length === 0) navigate("/carrito");
    setCarrito(c);
  }, []);

  const { total } = calcularTotales(carrito);
  const comunasDisponibles = regiones.find((r) => r.nombre === form.region)?.comunas || [];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value, ...(name === "region" ? { comuna: "" } : {}) }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "Requerido";
    if (!form.apellidos.trim()) nuevosErrores.apellidos = "Requerido";
    if (!form.correo.trim()) nuevosErrores.correo = "Requerido";
    if (!form.calle.trim()) nuevosErrores.calle = "Requerido";
    if (!form.region) nuevosErrores.region = "Requerido";
    if (!form.comuna) nuevosErrores.comuna = "Requerido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handlePagar() {
    if (!validar()) return;

    const numeroOrden = Date.now().toString().slice(-8);
    const exito = Math.random() > 0.2;

    const datosCompra = { ...form, carrito, total, numeroOrden };
    sessionStorage.setItem("ultimaCompra", JSON.stringify(datosCompra));

    if (exito) {
      vaciarCarrito();
      navigate("/compra-exitosa");
    } else {
      navigate("/compra-error");
    }
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3>Carrito de compra</h3>
              <p className="text-muted mb-0">Completa la siguiente información</p>
            </div>
            <span className="btn btn-primary">Total a pagar: ${total.toLocaleString("es-CL")}</span>
          </div>

          <table className="table mb-4">
            <thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString("es-CL")}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Información del cliente</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label>Nombre*</label>
              <input name="nombre" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={form.nombre} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Apellidos*</label>
              <input name="apellidos" className={`form-control ${errores.apellidos ? "is-invalid" : ""}`} value={form.apellidos} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label>Correo*</label>
              <input name="correo" type="email" className={`form-control ${errores.correo ? "is-invalid" : ""}`} value={form.correo} onChange={handleChange} />
            </div>
          </div>

          <h5>Dirección de entrega de los productos</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label>Calle*</label>
              <input name="calle" className={`form-control ${errores.calle ? "is-invalid" : ""}`} value={form.calle} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Departamento (opcional)</label>
              <input name="depto" className="form-control" placeholder="Ej: 603" value={form.depto} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Región*</label>
              <select name="region" className={`form-select ${errores.region ? "is-invalid" : ""}`} value={form.region} onChange={handleChange}>
                <option value="">Seleccione</option>
                {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label>Comuna*</label>
              <select name="comuna" className={`form-select ${errores.comuna ? "is-invalid" : ""}`} value={form.comuna} onChange={handleChange} disabled={!form.region}>
                <option value="">Seleccione</option>
                {comunasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-12">
              <label>Indicaciones para la entrega (opcional)</label>
              <textarea name="indicaciones" className="form-control" rows="3" placeholder="Ej: Entre calles, color del edificio, no tiene timbre." value={form.indicaciones} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="text-end">
            <button className="btn btn-success btn-lg" onClick={handlePagar}>Pagar ahora ${total.toLocaleString("es-CL")}</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Checkout;