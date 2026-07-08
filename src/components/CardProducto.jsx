import { Link } from "react-router-dom";

function CardProducto({ producto }) {
  const imagen = new URL(`../img/${producto.imagen}`, import.meta.url).href;
  const precioFinal = producto.oferta ? producto.precioOferta : producto.precio;

  return (
    <div className="col">
      <Link to={`/productos/${producto.id}`} className="card h-100 text-decoration-none text-dark shadow-sm">
        <img src={imagen} className="card-img-top" alt={producto.nombre} style={{ height: "180px", objectFit: "cover" }} />
        <div className="card-body">
          {producto.oferta && <span className="badge bg-danger mb-2">Oferta</span>}
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-muted small">{producto.descripcion}</p>
          {producto.oferta ? (
            <p>
              <span className="text-decoration-line-through text-muted me-2">${producto.precio.toLocaleString("es-CL")}</span>
              <span className="fw-bold" style={{ color: "var(--color-verde)" }}>${precioFinal.toLocaleString("es-CL")}</span>
            </p>
          ) : (
            <p className="fw-bold" style={{ color: "var(--color-verde)" }}>${precioFinal.toLocaleString("es-CL")}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
export default CardProducto;