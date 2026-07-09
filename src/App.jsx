import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraError from "./pages/CompraError";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import Contacto from "./pages/Contacto";
import Dashboard from "./pages/admin/Dashboard";
import AdminOrdenes from "./pages/admin/AdminOrdenes";
import DetalleOrden from "./pages/admin/DetalleOrden";
import AdminProductos from "./pages/admin/AdminProductos";
import FormularioProducto from "./pages/admin/FormularioProducto";
import ProductosCriticos from "./pages/admin/ProductosCriticos";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import FormularioUsuario from "./pages/admin/FormularioUsuario";
import Reportes from "./pages/admin/Reportes";
import Perfil from "./pages/admin/Perfil";
import RutaProtegida from "./components/RutaProtegida";
import "./App.css";
import DetalleUsuario from "./pages/admin/DetalleUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:categoria" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/admin" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/admin/ordenes" element={<RutaProtegida><AdminOrdenes /></RutaProtegida>} />
        <Route path="/admin/ordenes/:id" element={<RutaProtegida><DetalleOrden /></RutaProtegida>} />
        <Route path="/admin/productos" element={<RutaProtegida><AdminProductos /></RutaProtegida>} />
        <Route path="/admin/productos/nuevo" element={<RutaProtegida><FormularioProducto /></RutaProtegida>} />
        <Route path="/admin/productos/editar/:id" element={<RutaProtegida><FormularioProducto /></RutaProtegida>} />
        <Route path="/admin/productos-criticos" element={<RutaProtegida><ProductosCriticos /></RutaProtegida>} />
        <Route path="/admin/categorias" element={<RutaProtegida><AdminCategorias /></RutaProtegida>} />
        <Route path="/admin/usuarios" element={<RutaProtegida><AdminUsuarios /></RutaProtegida>} />
        <Route path="/admin/usuarios/nuevo" element={<RutaProtegida><FormularioUsuario /></RutaProtegida>} />
        <Route path="/admin/usuarios/editar/:id" element={<RutaProtegida><FormularioUsuario /></RutaProtegida>} />
        <Route path="/admin/usuarios/:id" element={<RutaProtegida><DetalleUsuario /></RutaProtegida>} />
        <Route path="/admin/reportes" element={<RutaProtegida><Reportes /></RutaProtegida>} />
        <Route path="/admin/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;