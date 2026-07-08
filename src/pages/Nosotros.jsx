import Layout from "../components/Layout";

function Nosotros() {
  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1>Nosotros</h1>
          <p className="text-muted">Conoce la historia detrás de HuertoHogar</p>
        </div>

        <div className="row align-items-center mb-5 g-4">
          <div className="col-md-6">
            <h2>¿Quiénes somos?</h2>
            <p className="text-muted">HuertoHogar nació en 2020 con una misión simple: conectar a los agricultores locales de la Región Metropolitana directamente con las familias chilenas.</p>
            <p className="text-muted">Trabajamos con más de 30 productores locales que cultivan sus productos de forma orgánica, sin pesticidas ni químicos dañinos.</p>
          </div>
          <div className="col-md-6">
            <img src={new URL("../img/nosotros.jpg", import.meta.url).href} alt="Equipo HuertoHogar" className="rounded-4 w-100" />
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <div style={{ fontSize: "2rem" }}>🎯</div>
              <h5>Misión</h5>
              <p className="text-muted small">Facilitar el acceso a productos orgánicos frescos, conectando productores locales con consumidores.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <div style={{ fontSize: "2rem" }}>🔭</div>
              <h5>Visión</h5>
              <p className="text-muted small">Ser la principal plataforma de comercio justo agrícola en Chile.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <div style={{ fontSize: "2rem" }}>💚</div>
              <h5>Valores</h5>
              <ul className="text-muted small">
                <li>Transparencia</li>
                <li>Compromiso ambiental</li>
                <li>Comercio justo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-4 p-5 text-white text-center mb-5" style={{ backgroundColor: "var(--color-verde)" }}>
          <h2 className="text-white mb-4">HuertoHogar en números</h2>
          <div className="row">
            <div className="col-3"><h3 className="text-white">+30</h3><p>Productores</p></div>
            <div className="col-3"><h3 className="text-white">+500</h3><p>Clientes</p></div>
            <div className="col-3"><h3 className="text-white">+80</h3><p>Productos</p></div>
            <div className="col-3"><h3 className="text-white">5</h3><p>Años</p></div>
          </div>
        </div>

        <div className="text-center">
          <h2>Nuestro Equipo</h2>
          <div className="row g-4 justify-content-center mt-2">
            <div className="col-md-4">
              <div className="bg-white rounded-4 shadow-sm p-4">
                <img src={new URL("../img/integrante1.jpg", import.meta.url).href} alt="Oscar Leiva" className="rounded-circle mb-3" width="100" height="100" style={{ objectFit: "cover" }} />
                <h5>Oscar Leiva</h5>
                <p className="text-muted small">Desarrollador Frontend</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white rounded-4 shadow-sm p-4">
                <img src={new URL("../img/integrante2.jpg", import.meta.url).href} alt="Pedro Rivas" className="rounded-circle mb-3" width="100" height="100" style={{ objectFit: "cover" }} />
                <h5>Pedro Rivas</h5>
                <p className="text-muted small">Desarrollador Frontend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Nosotros;