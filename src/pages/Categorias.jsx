import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductos } from "../services/productosData";

const CATEGORIAS = [
  { valor: "verduras", nombre: "Verduras", icono: "🥦" },
  { valor: "frutas", nombre: "Frutas", icono: "🍎" },
  { valor: "hierbas", nombre: "Hierbas", icono: "🌿" },
  { valor: "otros", nombre: "Otros", icono: "🍯" }
];

function Categorias() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const activa = categoria || "verduras";

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const filtrados = productos.filter((p) => p.categoria === activa);
  const infoCategoria = CATEGORIAS.find((c) => c.valor === activa);

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4">Categorías</h1>
        <div className="row row-cols-2 row-cols-md-4 g-3 mb-5">
          {CATEGORIAS.map((cat) => (
            <div className="col" key={cat.valor}>
              <button
                className={`btn w-100 py-4 shadow-sm ${activa === cat.valor ? "btn-success" : "btn-light"}`}
                onClick={() => navigate(`/categorias/${cat.valor}`)}
              >
                <div style={{ fontSize: "2rem" }}>{cat.icono}</div>
                {cat.nombre}
              </button>
            </div>
          ))}
        </div>

        <h2 className="mb-4">{infoCategoria?.nombre}</h2>
        {filtrados.length === 0 ? (
          <p className="text-muted">No hay productos en esta categoría.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {filtrados.map((p) => (
              <CardProducto key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Categorias;