import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerBlogPorId } from "../services/BlogsData";

function DetalleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setBlog(obtenerBlogPorId(id));
  }, [id]);

  if (!blog) return <Layout><div className="container py-5"><p>Artículo no encontrado.</p></div></Layout>;

  return (
    <Layout>
      <div className="container py-5">
        <nav className="mb-3 small text-muted">
          <Link to="/">Inicio</Link> / <Link to="/blogs">Blog</Link> / {blog.titulo}
        </nav>
        <img src={new URL(`../img/${blog.imagen}`, import.meta.url).href} className="w-100 rounded-4 mb-4" style={{ height: "350px", objectFit: "cover" }} alt={blog.titulo} />
        <div className="d-flex gap-3 text-muted small mb-2">
          <span>✍️ {blog.autor}</span>
          <span>📅 {blog.fecha}</span>
        </div>
        <h1>{blog.titulo}</h1>
        <p className="lead text-muted">{blog.resumen}</p>
        <p>La temporada trae consigo una variedad de productos frescos ideales para preparar platos reconfortantes. En este artículo te mostramos consejos prácticos usando productos que encuentras directamente en nuestro catálogo.</p>
        <Link to="/blogs" className="d-block mt-4" style={{ color: "var(--color-verde)" }}>← Volver al Blog</Link>
      </div>
    </Layout>
  );
}
export default DetalleBlog;