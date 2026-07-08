import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white mt-5" style={{ backgroundColor: "var(--color-cafe)" }}>
      <div className="container py-5 row">
        <div className="col-md-5 mb-4">
          <h5 style={{ color: "var(--color-amarillo)" }}>HuertoHogar</h5>
          <p>Conectamos el campo con tu hogar. Productos frescos y orgánicos para tu familia.</p>
        </div>
        <div className="col-md-3 mb-4">
          <h5 style={{ color: "var(--color-amarillo)" }}>Navegación</h5>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
            <li><Link to="/productos" className="text-white text-decoration-none">Productos</Link></li>
            <li><Link to="/nosotros" className="text-white text-decoration-none">Nosotros</Link></li>
            <li><Link to="/blogs" className="text-white text-decoration-none">Blog</Link></li>
            <li><Link to="/contacto" className="text-white text-decoration-none">Contacto</Link></li>
          </ul>
        </div>
        <div className="col-md-4 mb-4">
          <h5 style={{ color: "var(--color-amarillo)" }}>Contacto</h5>
          <p>📍 Santiago, Chile</p>
          <p>📞 +56 9 1234 5678</p>
          <p>✉️ contacto@huerthogar.cl</p>
        </div>
      </div>
      <div className="text-center py-3 border-top border-secondary">
        <small>&copy; 2026 HuertoHogar. Todos los derechos reservados. | <Link to="/admin" className="text-white">Panel Administrador</Link></small>
      </div>
    </footer>
  );
}

export default Footer;