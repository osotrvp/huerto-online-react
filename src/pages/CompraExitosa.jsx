import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function CompraExitosa() {
  const [compra, setCompra] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("ultimaCompra");
    if (data) setCompra(JSON.parse(data));
  }, []);

  if (!compra) return <Layout><div className="container py-5 text-center"><p>No hay información de compra.</p><Link to="/productos" className="btn btn-success">Ir a comprar</Link></div></Layout>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h3 className="text-success">✅ Se ha realizado la compra. nro #{compra.numeroOrden}</h3>
            <small className="text-muted">Código orden: ORDER{compra.numeroOrden}</small>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4"><label className="small">Nombre</label><input className="form-control" disabled value={compra.nombre} /></div>
            <div className="col-md-4"><label className="small">Apellidos</label><input className="form-control" disabled value={compra.apellidos} /></div>
            <div className="col-md-4"><label className="small">Correo</label><input className="form-control" disabled value={compra.correo} /></div>
          </div>

          <h5>Dirección de entrega</h5>
          <p className="text-muted">{compra.calle} {compra.depto && `, Depto ${compra.depto}`} — {compra.comuna}, {compra.region}</p>
          {compra.indicaciones && <p className="text-muted small">{compra.indicaciones}</p>}

          <div className="table-responsive">
            <table className="table my-4">
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

          <div className="bg-light rounded-3 p-3 text-center fs-5 fw-bold mb-3">
            Total pagado: ${compra.total.toLocaleString("es-CL")}
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-danger" onClick={() => window.print()}>Imprimir boleta en PDF</button>
            <button className="btn btn-success" onClick={() => alert("Boleta enviada por email (simulado)")}>Enviar boleta por email</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CompraExitosa;