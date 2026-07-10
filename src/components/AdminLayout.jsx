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

  const enlaces = (
    <ul className="nav flex-column gap-1">
      <li><Link to="/admin" className={`nav-link text-white rounded ${esActivo("/admin") ? "bg-success" : ""}`}>📊 Dashboard</Link></li>
      <li><Link to="/admin/ordenes" className={`nav-link text-white rounded ${esActivo("/admin/ordenes") ? "bg-success" : ""}`}>🧾 Órdenes</Link></li>
      <li><Link to="/admin/productos" className={`nav-link text-white rounded ${esActivo("/admin/productos") ? "bg-success" : ""}`}>🥦 Productos</Link></li>
      <li><Link to="/admin/productos-criticos" className={`nav-link text-white rounded ${esActivo("/admin/productos-criticos") ? "bg-success" : ""}`}>⚠️ Stock crítico</Link></li>
      <li><Link to="/admin/categorias" className={`nav-link text-white rounded ${esActivo("/admin/categorias") ? "bg-success" : ""}`}>🏷️ Categorías</Link></li>
      <li><Link to="/admin/usuarios" className={`nav-link text-white rounded ${esActivo("/admin/usuarios") ? "bg-success" : ""}`}>👤 Usuarios</Link></li>
      <li><Link to="/admin/reportes" className={`nav-link text-white rounded ${esActivo("/admin/reportes") ? "bg-success" : ""}`}>📈 Reportes</Link></li>
      <li><Link to="/admin/perfil" className={`nav-link text-white rounded ${esActivo("/admin/perfil") ? "bg-success" : ""}`}>😊 Perfil</Link></li>
    </ul>
  );

  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <aside className="d-none d-md-flex flex-column text-white p-3" style={{ width: "250px", backgroundColor: "var(--color-texto-oscuro)", flexShrink: 0 }}>
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <span className="fw-bold fs-5" style={{ fontFamily: "var(--fuente-titulos)" }}>HuertoHogar</span>
        </div>
        {enlaces}
        <hr className="border-secondary" />
        <ul className="nav flex-column gap-1">
          <li><Link to="/" className="nav-link text-white rounded">🔙 Volver al sitio</Link></li>
          <li><button onClick={handleCerrarSesion} className="nav-link text-white rounded btn btn-link text-start w-100">🚪 Cerrar sesión</button></li>
        </ul>
      </aside>

      <div className="offcanvas offcanvas-start text-bg-dark d-md-none" tabIndex="-1" id="adminSidebar">
        <div className="offcanvas-header">
          <span className="fw-bold fs-5" style={{ fontFamily: "var(--fuente-titulos)" }}>HuertoHogar</span>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {enlaces}
          <hr className="border-secondary" />
          <ul className="nav flex-column gap-1">
            <li><Link to="/" className="nav-link text-white rounded">🔙 Volver al sitio</Link></li>
            <li><button onClick={handleCerrarSesion} className="nav-link text-white rounded btn btn-link text-start w-100">🚪 Cerrar sesión</button></li>
          </ul>
        </div>
      </div>

      <div className="flex-grow-1 p-3 p-md-4" style={{ backgroundColor: "#f1f2f4", minWidth: 0, maxWidth: "100%" }}>
        <div className="bg-white rounded-4 shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
            <button className="btn btn-dark btn-sm d-md-none" data-bs-toggle="offcanvas" data-bs-target="#adminSidebar">☰</button>
            <h1 className="h5 mb-0 flex-grow-1">{titulo}</h1>
            <span className="small text-nowrap">👋 {sesion?.nombre}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
export default AdminLayout;