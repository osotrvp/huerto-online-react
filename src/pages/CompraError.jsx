import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

function CompraError() {
  const [compra, setCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("ultimaCompra");
    if (data) setCompra(JSON.parse(data));
  }, []);

  if (!compra) return <Layout><div className="container py-5 text-center"><p>No hay información de compra.</p><Link to="/carrito" className="btn btn-success">Volver al carrito</Link></div></Layout>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto text-center" style={{ maxWidth: "800px" }}>
          <h3 className="text-danger">❌ No se pudo realizar el pago. nro #{compra.numeroOrden}</h3>
          <p className="text-muted">Detalle de compra</p>
          <button className="btn btn-success btn-lg my-3" onClick={() => navigate("/checkout")}>VOLVER A REALIZAR EL PAGO</button>
        <div className="table-responsive">
          <table className="table my-4 text-start">
            <thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
            <tbody>
              {compra.carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString("es-CL")}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          <div className="bg-light rounded-3 p-3 fs-5 fw-bold">
            Total pagado: ${compra.total.toLocaleString("es-CL")}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CompraError;