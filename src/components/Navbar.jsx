import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCarrito } from "../services/carritoData";
import { obtenerSesion, cerrarSesion } from "../services/authData";
import logo from "../img/logo.jpg";

function Navbar() {
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [sesion, setSesion] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    function actualizarCarrito() {
      const carrito = obtenerCarrito();
      setTotalCarrito(
        carrito.reduce((total, item) => total + item.cantidad, 0)
      );
    }

    actualizarCarrito();

    setSesion(obtenerSesion());

    window.addEventListener("carritoActualizado", actualizarCarrito);

    return () =>
      window.removeEventListener(
        "carritoActualizado",
        actualizarCarrito
      );
  }, []);

  function buscar(e) {
    e.preventDefault();

    if (busqueda.trim()) {
      navigate(
        `/productos?buscar=${encodeURIComponent(busqueda)}`
      );
    }
  }

  function salir() {
    cerrarSesion();
    setSesion(null);
    window.location.href = "/";
  }

  return (
    <>
      {/* Barra Superior */}

      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">

        <div className="container py-3">

          <Link
            to="/"
            className="navbar-brand d-flex align-items-center"
          >
            <img
              src={logo}
              alt="logo"
              width="70"
              className="me-2 rounded-circle"
            />

            <div>

              <h3
                className="m-0 fw-bold text-success"
              >
                HuertoHogar
              </h3>

              <small className="text-muted">
                Productos frescos
              </small>

            </div>

          </Link>

          {/* Buscador */}

          <form
            onSubmit={buscar}
            className="d-none d-lg-flex flex-grow-1 mx-5"
          >

            <div className="input-group">

              <input
                type="text"
                className="form-control rounded-start-pill border-success"
                placeholder="Buscar frutas, verduras, miel..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />

              <button
                className="btn btn-success rounded-end-pill px-4"
              >
                <i className="bi bi-search"></i>
              </button>

            </div>

          </form>

          {/* Usuario */}

          <div className="dropdown me-3">

            <button
              className="btn btn-light border dropdown-toggle"
              data-bs-toggle="dropdown"
            >

              <i className="bi bi-person-circle me-2"></i>

              {sesion ? sesion.nombre : "Mi cuenta"}

            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              {sesion ? (
                <>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/perfil"
                    >
                      Mi perfil
                    </Link>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={salir}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login"
                    >
                      Iniciar sesión
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/registro"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>

          {/* Carrito */}

          <Link
            to="/carrito"
            className="btn btn-outline-success position-relative rounded-circle"
          >

            <i className="bi bi-cart3 fs-5"></i>

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >

              {totalCarrito}

            </span>

          </Link>

        </div>

      </nav>

      {/* Segunda Barra */}

      <nav className="navbar navbar-expand-lg bg-success py-2">

        <div className="container">

          <button
            className="navbar-toggler bg-light"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="menu"
          >

            <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/productos">
                  Productos
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/categorias/verduras">
                  Categorías
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/ofertas">
                  Ofertas
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/nosotros">
                  Nosotros
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/blogs">
                  Blog
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/contacto">
                  Contacto
                </Link>
              </li>

            </ul>

          </div>

        </div>

      </nav>
    </>
  );
}

export default Navbar;