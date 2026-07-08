const CLAVE = "carritoHuertoHogar";

export function obtenerCarrito() {
  const data = localStorage.getItem(CLAVE);
  return data ? JSON.parse(data) : [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE, JSON.stringify(carrito));
  window.dispatchEvent(new Event("carritoActualizado"));
}

export function agregarAlCarrito(producto, cantidad) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.oferta ? producto.precioOferta : producto.precio,
      imagen: producto.imagen,
      cantidad
    });
  }
  guardarCarrito(carrito);
  return carrito;
}

export function cambiarCantidad(id, cantidad) {
  let carrito = obtenerCarrito();
  if (cantidad < 1) {
    carrito = carrito.filter(item => item.id !== id);
  } else {
    carrito = carrito.map(item => (item.id === id ? { ...item, cantidad } : item));
  }
  guardarCarrito(carrito);
  return carrito;
}

export function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
  return carrito;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

export function calcularTotales(carrito, descuento = 0) {
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const despacho = subtotal > 0 ? 2990 : 0;
  const montoDescuento = subtotal * descuento;
  const total = subtotal + despacho - montoDescuento;
  return { subtotal, despacho, montoDescuento, total };
}