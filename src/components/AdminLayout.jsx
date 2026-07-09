import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerSesion, cerrarSesion } from "../services/authData";

function AdminLayout({ children, titulo }) {
  const sesion = obtenerSesion();
  const navigate = useNavigate();
  const location = useLocation();

  function handleCerrarSesion() {
    cerrarSesion();
    navigate("/login");
  }

  const esActivo = (ruta) => location.pathname === ruta;

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <aside className="text-white p-3" style={{ width: "250px", backgroundColor: "var(--color-texto-oscuro)", flexShrink: 0 }}>
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <span className="fw-bold fs-5" style={{ fontFamily: "var(--fuente-titulos)" }}>HuertoHogar</span>
        </div>
        <ul className="nav flex-column gap-1">
          <li><Link to="/admin" className={`nav-link text-white rounded ${esActivo("/admin") ? "bg-success" : ""}`}>📊 Dashboard</Link></li>
          <li><Link to="/admin/productos" className={`nav-link text-white rounded ${esActivo("/admin/productos") ? "bg-success" : ""}`}>🥦 Productos</Link></li>
          <li><Link to="/admin/ordenes" className={`nav-link text-white rounded ${esActivo("/admin/ordenes") ? "bg-success" : ""}`}>🧾 Órdenes</Link></li>
          <li><Link to="/admin/usuarios" className={`nav-link text-white rounded ${esActivo("/admin/usuarios") ? "bg-success" : ""}`}>👤 Usuarios</Link></li>
          <li><Link to="/" className="nav-link text-white rounded">🔙 Volver al sitio</Link></li>
          <li><button onClick={handleCerrarSesion} className="nav-link text-white rounded btn btn-link text-start w-100">🚪 Cerrar sesión</button></li>
        </ul>
      </aside>
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f1f2f4" }}>
        <div className="d-flex justify-content-between align-items-center bg-white rounded-4 shadow-sm p-4 mb-4">
          <h1 className="h3 mb-0">{titulo}</h1>
          <span>👋 Hola, {sesion?.nombre}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
export default AdminLayout;