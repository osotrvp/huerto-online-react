import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CardProducto from "../components/CardProducto";
import { obtenerProductos } from "../services/productosData";

function Ofertas() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos().filter((p) => p.oferta));
  }, []);

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1>🔥 Ofertas</h1>
          <p className="text-muted">Aprovecha nuestros mejores precios por tiempo limitado</p>
        </div>
        {productos.length === 0 ? (
          <p className="text-center text-muted">No hay ofertas disponibles por el momento.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {productos.map((p) => (
              <CardProducto key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Ofertas;