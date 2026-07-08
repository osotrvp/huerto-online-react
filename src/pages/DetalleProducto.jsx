import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductoPorId, obtenerProductos } from "../services/productosData";
import { agregarAlCarrito } from "../services/carritoData";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState(false);

  useEffect(() => {
    const p = obtenerProductoPorId(id);
    setProducto(p);
    setCantidad(1);
    if (p) {
      const todos = obtenerProductos();
      setRelacionados(todos.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 3));
    }
  }, [id]);

  if (!producto) return <Layout><div className="container py-5"><p>Producto no encontrado.</p></div></Layout>;

  const imagen = new URL(`../img/${producto.imagen}`, import.meta.url).href;
  const precioFinal = producto.oferta ? producto.precioOferta : producto.precio;

  function handleAgregar() {
    if (cantidad < 1 || cantidad > producto.stock) {
      alert(`Ingresa una cantidad entre 1 y ${producto.stock}`);
      return;
    }
    agregarAlCarrito(producto, cantidad);
    setMensaje(true);
    setTimeout(() => setMensaje(false), 2500);
  }

  return (
    <Layout>
      <div className="container py-5">
        <nav className="mb-3 small text-muted">
          <Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> / {producto.nombre}
        </nav>

        <div className="row g-4">
          <div className="col-md-6">
            <img src={imagen} alt={producto.nombre} className="rounded-4 w-100" style={{ height: "450px", objectFit: "cover" }} />
          </div>
          <div className="col-md-6">
            <span className="badge mb-2" style={{ backgroundColor: "#e8f3ec", color: "var(--color-verde)" }}>{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <p className="text-muted">{producto.descripcion}</p>
            <h2 style={{ color: "var(--color-verde)" }}>${precioFinal.toLocaleString("es-CL")}</h2>
            <p className="text-muted">Stock disponible: {producto.stock} unidades</p>
            <div className="d-flex align-items-center gap-3 mb-3">
              <label>Cantidad:</label>
              <input type="number" className="form-control" style={{ width: "80px" }} min="1" max={producto.stock} value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
            </div>
            <button className="btn btn-success btn-lg w-100" onClick={handleAgregar}>🛒 Agregar al carrito</button>
            {mensaje && <div className="alert alert-success mt-3">✅ Producto agregado al carrito</div>}
            <Link to="/productos" className="d-block mt-3" style={{ color: "var(--color-verde)" }}>← Volver al catálogo</Link>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="mt-5">
            <h2>Productos relacionados</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {relacionados.map((p) => (
                <CardProducto key={p.id} producto={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default DetalleProducto;