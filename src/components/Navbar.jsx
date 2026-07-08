import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCarrito } from "../services/carritoData";
import { obtenerSesion, cerrarSesion } from "../services/authData";
import logo from "../img/logo.jpg";

function Navbar() {
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    const carrito = obtenerCarrito();
    setTotalCarrito(carrito.reduce((t, i) => t + i.cantidad, 0));
    setSesion(obtenerSesion());
  }, []);

  function handleCerrarSesion() {
    cerrarSesion();
    setSesion(null);
    window.location.href = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" style={{ color: "var(--color-verde)" }}>
          <img src={logo} alt="Logo HuertoHogar" width="40" height="40" />
          HuertoHogar
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-lg-3">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {sesion ? (
              <>
                <span>👋 {sesion.nombre}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleCerrarSesion}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/registro">Registrarse</Link>
              </>
            )}
            <Link to="/carrito" className="btn btn-success rounded-pill">
              🛒 {totalCarrito}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;