const CLAVE = "sesionHuertoHogar";

export function iniciarSesion(usuario) {
  const sesion = { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, rol: usuario.rol };
  localStorage.setItem(CLAVE, JSON.stringify(sesion));
  return sesion;
}

export function obtenerSesion() {
  const data = localStorage.getItem(CLAVE);
  return data ? JSON.parse(data) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
}