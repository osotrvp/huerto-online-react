import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, calcularTotales, agregarAlCarrito } from "../services/carritoData";
import { obtenerProductos } from "../services/productosData";

const CUPONES = { HUERTO10: 0.1, BIENVENIDO: 0.05 };

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCarrito(obtenerCarrito());
    setProductos(obtenerProductos());
  }, []);

  function handleCambiarCantidad(id, cantidad) {
    setCarrito(cambiarCantidad(id, cantidad));
  }

  function handleEliminar(id) {
    setCarrito(eliminarDelCarrito(id));
  }

  function handleLimpiar() {
    setCarrito(vaciarCarrito());
  }

  function handleAnadir(producto) {
    setCarrito(agregarAlCarrito(producto, 1));
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
        <h1 className="mb-4">Carrito de Compras</h1>

        <div className="row g-4">
          <div className="col-lg-6">
            <h4 className="mb-3">Lista de productos</h4>
            <div className="row row-cols-2 g-3" style={{ maxHeight: "600px", overflowY: "auto" }}>
              {productos.map((p) => {
                const imagen = new URL(`../img/${p.imagen}`, import.meta.url).href;
                const precioFinal = p.oferta ? p.precioOferta : p.precio;
                return (
                  <div className="col" key={p.id}>
                    <div className="card h-100 shadow-sm">
                      <img src={imagen} className="card-img-top" style={{ height: "110px", objectFit: "cover" }} alt={p.nombre} />
                      <div className="card-body p-2">
                        <p className="small mb-1">{p.nombre}</p>
                        <p className="fw-bold small mb-2" style={{ color: "var(--color-verde)" }}>${precioFinal.toLocaleString("es-CL")}</p>
                        <p className="small text-muted mb-2">Stock: {p.stock}</p>
                        <button className="btn btn-dark btn-sm w-100" onClick={() => handleAnadir(p)}>Añadir</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-6">
            <h4 className="mb-3">Carrito de Compras</h4>
            {carrito.length === 0 ? (
              <div className="bg-white rounded-4 shadow-sm p-5 text-center">
                <p className="fs-5 text-muted">😕 Tu carrito está vacío.</p>
                <Link to="/productos" className="btn btn-success">Ver productos</Link>
              </div>
            ) : (
              <div className="bg-white rounded-4 shadow-sm p-3">
                <table className="table align-middle">
                  <thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>${item.precio.toLocaleString("es-CL")}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCambiarCantidad(item.id, item.cantidad - 1)}>-</button>
                            <span>{item.cantidad}</span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                          </div>
                        </td>
                        <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => handleEliminar(item.id)}>Eliminar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-end fw-bold fs-5 mb-3">Total: ${subtotal.toLocaleString("es-CL")}</div>
                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-secondary" onClick={handleLimpiar}>Limpiar</button>
                  <button className="btn btn-success flex-grow-1" onClick={() => navigate("/checkout")}>Comprar ahora</button>
                </div>

                <hr />
                <label className="small fw-bold">¿Tienes un cupón?</label>
                <div className="d-flex gap-2 mb-2">
                  <input type="text" className="form-control" placeholder="Ingresa tu código" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} />
                  <button className="btn btn-dark" onClick={handleAplicarCupon}>Aplicar</button>
                </div>
                {mensajeCupon && <p className="small">{mensajeCupon}</p>}
                <div className="d-flex justify-content-between small"><span>Despacho</span><span>${despacho.toLocaleString("es-CL")}</span></div>
                {montoDescuento > 0 && <div className="d-flex justify-content-between small" style={{ color: "var(--color-verde)" }}><span>Descuento</span><span>-${montoDescuento.toLocaleString("es-CL")}</span></div>}
                <div className="d-flex justify-content-between fw-bold mt-2"><span>Total final</span><span>${total.toLocaleString("es-CL")}</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Carrito;