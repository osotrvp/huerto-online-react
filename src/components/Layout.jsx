import Navbar from "./Navbar";
import Footer from "./Footer";
import CarritoDrawer from "./CarritoDrawer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <CarritoDrawer />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;