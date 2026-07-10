import { useEffect, useState, useRef } from "react";

let idCounter = 0;

function ToastNotificacion() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  useEffect(() => {
    function mostrar(e) {
      const id = ++idCounter;
      const { mensaje, tipo = "success", icono = "bi-check-circle-fill" } = e.detail || {};

      setToasts((prev) => [...prev, { id, mensaje, tipo, icono }]);

      timers.current[id] = setTimeout(() => {
        cerrar(id);
      }, 2600);
    }

    window.addEventListener("carritoToast", mostrar);
    return () => window.removeEventListener("carritoToast", mostrar);
  }, []);

  function cerrar(id) {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1090 }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast align-items-center text-white border-0 show toast-slide-in mb-2 shadow`}
          style={{ backgroundColor: "var(--color-verde)" }}
          role="status"
        >
          <div className="d-flex">
            <div className="toast-body d-flex align-items-center gap-2">
              <i className={`bi ${toast.icono} fs-5`}></i>
              {toast.mensaje}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => cerrar(toast.id)}
              aria-label="Cerrar"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToastNotificacion;
