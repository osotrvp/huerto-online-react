import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductos } from "../services/productosData";

function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const lista = obtenerProductos();
    setDestacados(lista.filter((p) => p.destacado));
  }, []);

  return (
    <Layout>
      <div className="container py-4">
        <div className="rounded-4 p-5 text-center text-white mb-5" style={{ background: "linear-gradient(135deg, #2E8B57, #1f6b41)" }}>
          <h1 className="text-white display-5 fw-bold">Del campo a tu mesa</h1>
          <p className="lead">Productos orgánicos frescos, cultivados con amor y entregados directamente a tu hogar.</p>
          <Link to="/productos" className="btn btn-lg fw-bold" style={{ backgroundColor: "var(--color-amarillo)" }}>
            Ver productos
          </Link>
        </div>

        <div className="text-center mb-4">
          <h2>Productos Destacados</h2>
          <p className="text-muted">Lo mejor de nuestra temporada</p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4">
          {destacados.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/productos" className="fw-bold text-decoration-none" style={{ color: "var(--color-verde)" }}>
            Ver todos los productos
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default Home;