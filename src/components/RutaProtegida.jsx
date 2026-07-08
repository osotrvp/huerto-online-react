import { Navigate } from "react-router-dom";
import { obtenerSesion } from "../services/authData";

function RutaProtegida({ children }) {
  const sesion = obtenerSesion();
  if (!sesion || (sesion.rol !== "admin" && sesion.rol !== "vendedor")) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default RutaProtegida;