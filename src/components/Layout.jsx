import Navbar from "./Navbar";
import Footer from "./Footer";
import CarritoDrawer from "./CarritoDrawer";
import ToastNotificacion from "./ToastNotificacion";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <CarritoDrawer />
      <ToastNotificacion />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;