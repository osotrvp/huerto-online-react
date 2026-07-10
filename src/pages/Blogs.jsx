import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerBlogs } from "../services/BlogsData";

const CATEGORIAS = ["todos", "recetas", "consejos", "noticias", "agricultura"];

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categoria, setCategoria] = useState("todos");

  useEffect(() => {
    setBlogs(obtenerBlogs());
  }, []);

  const filtrados = categoria === "todos" ? blogs : blogs.filter((b) => b.categoria === categoria);
  const [destacado, ...resto] = filtrados;

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1>Blog</h1>
          <p className="text-muted">Consejos, recetas y noticias del mundo orgánico</p>
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap mb-5">
          {CATEGORIAS.map((cat) => (
            <button key={cat} className={`btn rounded-pill text-capitalize ${categoria === cat ? "btn-success" : "btn-outline-secondary"}`} onClick={() => setCategoria(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {destacado && (
          <Link to={`/blogs/${destacado.id}`} className="d-block mb-5 text-decoration-none text-dark">
            <div className="row bg-white rounded-4 shadow-sm overflow-hidden g-0">
              <div className="col-md-6">
               <img src={new URL(`../img/${destacado.imagen}`, import.meta.url).href} className="w-100" style={{ height: "320px", objectFit: "cover" }} alt={destacado.titulo} />
              </div>
              <div className="col-md-6 p-4">
                <span className="badge mb-2" style={{ backgroundColor: "#e8f3ec", color: "var(--color-verde)" }}>{destacado.categoria}</span>
                <h3>{destacado.titulo}</h3>
                <p className="text-muted">{destacado.resumen}</p>
              </div>
            </div>
          </Link>
        )}

        <h4 className="mb-3">Artículos recientes</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {resto.map((blog) => (
            <div className="col" key={blog.id}>
              <Link to={`/blogs/${blog.id}`} className="card h-100 text-decoration-none text-dark shadow-sm">
                <img src={new URL(`../img/${blog.imagen}`, import.meta.url).href} className="card-img-top" style={{ height: "170px", objectFit: "cover" }} alt={blog.titulo} />
                <div className="card-body">
                  <span className="badge mb-2" style={{ backgroundColor: "#e8f3ec", color: "var(--color-verde)" }}>{blog.categoria}</span>
                  <h6>{blog.titulo}</h6>
                  <p className="text-muted small">{blog.resumen}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default Blogs;