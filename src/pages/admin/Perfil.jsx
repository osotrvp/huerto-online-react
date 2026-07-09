import AdminLayout from "../../components/AdminLayout";
import { obtenerSesion } from "../../services/authData";

function Perfil() {
  const sesion = obtenerSesion();

  return (
    <AdminLayout titulo="Mi Perfil">
      <div className="bg-white rounded-4 shadow-sm p-4" style={{ maxWidth: "500px" }}>
        <div className="mb-3"><label className="small text-muted">Nombre</label><p className="fs-5">{sesion?.nombre} {sesion?.apellido}</p></div>
        <div className="mb-3"><label className="small text-muted">Correo</label><p className="fs-5">{sesion?.email}</p></div>
        <div className="mb-3"><label className="small text-muted">Rol</label><p className="fs-5 text-capitalize">{sesion?.rol}</p></div>
      </div>
    </AdminLayout>
  );
}
export default Perfil;