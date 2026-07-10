import Layout from "../components/Layout";
import { obtenerSesion } from "../services/authData";

function Perfil() {
  const sesion = obtenerSesion();

  if (!sesion) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <p>Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
          <h2 className="mb-4">Mi Perfil</h2>
          <div className="mb-3"><label className="small text-muted">Nombre</label><p className="fs-5">{sesion.nombre} {sesion.apellido}</p></div>
          <div className="mb-3"><label className="small text-muted">Correo</label><p className="fs-5">{sesion.email}</p></div>
          <div className="mb-3"><label className="small text-muted">Tipo de cuenta</label><p className="fs-5 text-capitalize">{sesion.rol}</p></div>
        </div>
      </div>
    </Layout>
  );
}
export default Perfil;