import { Link } from "react-router-dom";
import { useState } from "react";
import { agregarAlCarrito } from "../services/carritoData";

function CardProducto({ producto, delay = 0 }) {
  const [agregado, setAgregado] = useState(false);
  const imagen = new URL(`../img/${producto.imagen}`, import.meta.url).href;
  const precioFinal = producto.oferta ? producto.precioOferta : producto.precio;

  function handleAgregar(e) {
    e.preventDefault();
    e.stopPropagation();
    agregarAlCarrito(producto, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }

  return (
    <div className="col">
      <div className="card card-producto zoom-in h-100 border-0 shadow-sm" style={{ animationDelay: `${delay}s` }}>
        <Link to={`/productos/${producto.id}`} className="text-decoration-none text-dark">
          <div className="img-wrap">
            <img
              src={imagen}
              className="card-img-top"
              alt={producto.nombre}
              style={{ height: "180px", objectFit: "cover" }}
            />
          </div>
          <div className="card-body pb-2">
            {producto.oferta && <span className="badge bg-danger mb-2">Oferta</span>}
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text text-muted small">{producto.descripcion}</p>
            {producto.oferta ? (
              <p className="mb-1">
                <span className="text-decoration-line-through text-muted me-2">
                  ${producto.precio.toLocaleString("es-CL")}
                </span>
                <span className="fw-bold fs-5" style={{ color: "var(--color-verde)" }}>
                  ${precioFinal.toLocaleString("es-CL")}
                </span>
              </p>
            ) : (
              <p className="fw-bold fs-5 mb-1" style={{ color: "var(--color-verde)" }}>
                ${precioFinal.toLocaleString("es-CL")}
              </p>
            )}
          </div>
        </Link>

        <div className="card-body pt-0">
          <button
            className={`btn w-100 fw-bold btn-agregar ${agregado ? "btn-outline-success" : "btn-success"}`}
            onClick={handleAgregar}
            disabled={agregado}
          >
            {agregado ? (
              <>
                <i className="bi bi-check2 me-2"></i>Agregado
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus me-2"></i>Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CardProducto;
