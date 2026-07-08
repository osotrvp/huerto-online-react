const CLAVE = "usuariosHuertoHogar";

const usuariosIniciales = [
  { id: 1, nombre: "Oscar", apellido: "Leiva", rut: "191234565", email: "oscar.leiva@inacapmail.cl", passwordHash: "", telefono: "+56912345678", region: "Región Metropolitana", comuna: "La Granja", rol: "admin", estado: "activo", fechaRegistro: "2026-03-10" }
];

export async function hashearTexto(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function inicializarUsuarios() {
  const data = localStorage.getItem(CLAVE);
  if (data) return JSON.parse(data);
  usuariosIniciales[0].passwordHash = await hashearTexto("admin123");
  localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
  return usuariosIniciales;
}

export function obtenerUsuarios() {
  const data = localStorage.getItem(CLAVE);
  return data ? JSON.parse(data) : [];
}

export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export async function buscarUsuarioPorCredenciales(email, password) {
  const lista = obtenerUsuarios();
  const correo = email.trim().toLowerCase();
  const hash = await hashearTexto(password);
  return lista.find(u => u.email.toLowerCase() === correo && u.passwordHash === hash && u.estado === "activo") || null;
}

export function existeCorreoUsuario(email) {
  const correo = email.trim().toLowerCase();
  return obtenerUsuarios().some(u => u.email.toLowerCase() === correo);
}

export async function agregarUsuario(datos) {
  const lista = obtenerUsuarios();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map(u => u.id)) + 1 : 1;
  const passwordHash = await hashearTexto(datos.password);
  const { password, ...resto } = datos;
  const usuario = { id: nuevoId, ...resto, passwordHash };
  guardarUsuarios([...lista, usuario]);
  return usuario;
}

export function actualizarUsuario(id, datos) {
  const lista = obtenerUsuarios();
  const nuevaLista = lista.map(u => (u.id === id ? { ...u, ...datos } : u));
  guardarUsuarios(nuevaLista);
  return nuevaLista;
}

export function eliminarUsuario(id) {
  const lista = obtenerUsuarios();
  const nuevaLista = lista.filter(u => u.id !== id);
  guardarUsuarios(nuevaLista);
  return nuevaLista;
}

inicializarUsuarios();