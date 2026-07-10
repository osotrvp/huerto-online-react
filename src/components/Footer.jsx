import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white mt-5 pt-5" style={{ backgroundColor: "var(--color-cafe)" }}>
      <div className="container pb-4">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: "var(--color-amarillo)" }}>
              🌱 HuertoHogar
            </h5>
            <p className="text-white-50">
              Conectamos el campo con tu hogar. Productos frescos y orgánicos, cultivados con
              cariño y entregados directamente a tu puerta.
            </p>
            <div className="d-flex gap-3 mt-3 fs-5">
              <a href="#" className="text-white footer-social" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white footer-social" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white footer-social" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="text-white footer-social" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold mb-3" style={{ color: "var(--color-amarillo)" }}>Navegación</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link">Inicio</Link></li>
              <li className="mb-2"><Link to="/productos" className="footer-link">Productos</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="footer-link">Ofertas</Link></li>
              <li className="mb-2"><Link to="/nosotros" className="footer-link">Nosotros</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold mb-3" style={{ color: "var(--color-amarillo)" }}>Ayuda</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/blogs" className="footer-link">Blog</Link></li>
              <li className="mb-2"><Link to="/contacto" className="footer-link">Contacto</Link></li>
              <li className="mb-2"><Link to="/carrito" className="footer-link">Mi carrito</Link></li>
              <li className="mb-2"><Link to="/login" className="footer-link">Mi cuenta</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3" style={{ color: "var(--color-amarillo)" }}>Newsletter</h6>
            <p className="text-white-50 small">Recibe ofertas y novedades directo en tu correo.</p>
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="form-control" placeholder="tu@correo.com" required />
              <button className="btn fw-bold btn-agregar" style={{ backgroundColor: "var(--color-amarillo)" }}>
                <i className="bi bi-send"></i>
              </button>
            </form>
            <div className="mt-4 small text-white-50">
              <p className="mb-1"><i className="bi bi-geo-alt me-2"></i>Santiago, Chile</p>
              <p className="mb-1"><i className="bi bi-telephone me-2"></i>+56 9 1234 5678</p>
              <p className="mb-0"><i className="bi bi-envelope me-2"></i>contacto@huertohogar.cl</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-3 small" style={{ backgroundColor: "var(--color-cafe-oscuro)" }}>
        &copy; {new Date().getFullYear()} HuertoHogar. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
