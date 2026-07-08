import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerCarrito, cambiarCantidad, eliminarDelCarrito, calcularTotales } from "../services/carritoData";

const CUPONES = { HUERTO10: 0.1, BIENVENIDO: 0.05 };

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  function handleCambiarCantidad(id, cantidad) {
    setCarrito(cambiarCantidad(id, cantidad));
  }

  function handleEliminar(id) {
    setCarrito(eliminarDelCarrito(id));
  }

  function handleAplicarCupon() {
    const codigo = codigoCupon.trim().toUpperCase();
    if (CUPONES[codigo]) {
      setDescuento(CUPONES[codigo]);
      setMensajeCupon("✅ Cupón aplicado correctamente");
    } else {
      setDescuento(0);
      setMensajeCupon("❌ Cupón inválido");
    }
  }

  const { subtotal, despacho, montoDescuento, total } = calcularTotales(carrito, descuento);

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4">Mi Carrito</h1>

        {carrito.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">😕 Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-success">Ver productos</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm p-4">
                {carrito.map((item) => {
                  const imagen = new URL(`../img/${item.imagen}`, import.meta.url).href;
                  return (
                    <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
                      <img src={imagen} alt={item.nombre} width="70" height="70" className="rounded-3" style={{ objectFit: "cover" }} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.nombre}</h6>
                        <small className="text-muted">${item.precio.toLocaleString("es-CL")} c/u</small>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCambiarCantidad(item.id, item.cantidad - 1)}>-</button>
                        <span>{item.cantidad}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                      </div>
                      <span className="fw-bold" style={{ color: "var(--color-verde)", minWidth: "80px" }}>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                      <button className="btn btn-sm" onClick={() => handleEliminar(item.id)}>🗑️</button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4">
                <h4>Resumen del pedido</h4>
                <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>${subtotal.toLocaleString("es-CL")}</span></div>
                <div className="d-flex justify-content-between mb-2"><span>Despacho</span><span>${despacho.toLocaleString("es-CL")}</span></div>
                {montoDescuento > 0 && (
                  <div className="d-flex justify-content-between mb-2" style={{ color: "var(--color-verde)" }}>
                    <span>Descuento</span><span>-${montoDescuento.toLocaleString("es-CL")}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3"><span>Total</span><span>${total.toLocaleString("es-CL")}</span></div>

                <label className="small fw-bold">¿Tienes un cupón?</label>
                <div className="d-flex gap-2 mb-2">
                  <input type="text" className="form-control" placeholder="Ingresa tu código" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} />
                  <button className="btn btn-dark" onClick={handleAplicarCupon}>Aplicar</button>
                </div>
                {mensajeCupon && <p className="small">{mensajeCupon}</p>}

                <button className="btn btn-success w-100 mt-3" onClick={() => navigate("/checkout")}>Finalizar compra</button>
                <Link to="/productos" className="d-block text-center mt-2" style={{ color: "var(--color-verde)" }}>← Seguir comprando</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Carrito;