import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  obtenerCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
  calcularTotales,
} from "../services/carritoData";

function CarritoDrawer() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    function actualizar() {
      setCarrito(obtenerCarrito());
    }
    actualizar();
    window.addEventListener("carritoActualizado", actualizar);
    return () => window.removeEventListener("carritoActualizado", actualizar);
  }, []);

  const { subtotal } = calcularTotales(carrito);

  function imagenDe(item) {
    return new URL(`../img/${item.imagen}`, import.meta.url).href;
  }

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="carritoDrawer"
      aria-labelledby="carritoDrawerLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold" id="carritoDrawerLabel">
          <i className="bi bi-cart3 me-2"></i>Tu carrito
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
      </div>

      <div className="offcanvas-body d-flex flex-column">
        {carrito.length === 0 ? (
          <div className="text-center text-muted my-5">
            <i className="bi bi-cart-x display-4 d-block mb-3"></i>
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="flex-grow-1 overflow-auto">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center gap-3 py-3 border-bottom carrito-item px-1"
                >
                  <img
                    src={imagenDe(item)}
                    alt={item.nombre}
                    width="60"
                    height="60"
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-bold small">{item.nombre}</div>
                    <div className="text-muted small">
                      ${item.precio.toLocaleString("es-CL")} c/u
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary py-0 px-2"
                        onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary py-0 px-2"
                        onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm text-danger"
                    onClick={() => eliminarDelCarrito(item.id)}
                    aria-label="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 mt-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">Subtotal</span>
                <span className="fw-bold fs-5" style={{ color: "var(--color-verde)" }}>
                  ${subtotal.toLocaleString("es-CL")}
                </span>
              </div>
              <Link
                to="/carrito"
                className="btn btn-outline-success w-100 mb-2"
                data-bs-dismiss="offcanvas"
              >
                Ver carrito completo
              </Link>
              <Link
                to="/checkout"
                className="btn btn-success w-100 btn-agregar"
                data-bs-dismiss="offcanvas"
              >
                Iniciar compra
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default CarritoDrawer;
