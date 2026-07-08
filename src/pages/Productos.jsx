import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductos } from "../services/productosData";

const CATEGORIAS = ["todos", "verduras", "frutas", "hierbas", "otros"];

function Productos() {
  const [productos, setProductos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaActiva = searchParams.get("categoria") || "todos";

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const filtrados = categoriaActiva === "todos" ? productos : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1>Nuestros Productos</h1>
          <p className="text-muted">Frescos, orgánicos y directamente del campo a tu hogar</p>
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`btn rounded-pill text-capitalize ${categoriaActiva === cat ? "btn-success" : "btn-outline-secondary"}`}
              onClick={() => setSearchParams(cat === "todos" ? {} : { categoria: cat })}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtrados.length === 0 ? (
          <p className="text-center text-muted">No hay productos en esta categoría.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {filtrados.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Productos;