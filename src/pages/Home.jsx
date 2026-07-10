import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductos } from "../services/productosData";
import hero from "../assets/hero.png";

function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const lista = obtenerProductos();
    setDestacados(lista.filter((p) => p.destacado));
  }, []);

  return (
    <Layout>
      <div className="container py-4">
        <div
          className="hero-home p-5 mb-5 text-white fade-in"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="hero-content text-center">
            <h1 className="text-white display-4 fw-bold mb-3">Del campo a tu mesa</h1>
            <p className="lead mb-4">
              Productos orgánicos frescos, cultivados con amor y entregados directamente a tu hogar.
            </p>
            <Link
              to="/productos"
              className="btn btn-lg fw-bold px-4 btn-agregar"
              style={{ backgroundColor: "var(--color-amarillo)" }}
            >
              Ver productos
            </Link>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2>Productos Destacados</h2>
          <p className="text-muted">Lo mejor de nuestra temporada</p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4">
          {destacados.map((producto, i) => (
            <CardProducto key={producto.id} producto={producto} delay={i * 0.08} />
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
