const CLAVE = "categoriasHuertoHogar";

const categoriasIniciales = [
  { id: 1, nombre: "Verduras", valor: "verduras", icono: "🥦" },
  { id: 2, nombre: "Frutas", valor: "frutas", icono: "🍎" },
  { id: 3, nombre: "Hierbas", valor: "hierbas", icono: "🌿" },
  { id: 4, nombre: "Otros", valor: "otros", icono: "🍯" }
];

export function obtenerCategorias() {
  const data = localStorage.getItem(CLAVE);
  if (data) return JSON.parse(data);
  localStorage.setItem(CLAVE, JSON.stringify(categoriasIniciales));
  return categoriasIniciales;
}

export function guardarCategorias(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function crearCategoria(datos) {
  const lista = obtenerCategorias();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((c) => c.id)) + 1 : 1;
  const nuevaLista = [...lista, { id: nuevoId, ...datos }];
  guardarCategorias(nuevaLista);
  return nuevaLista;
}

export function eliminarCategoria(id) {
  const nuevaLista = obtenerCategorias().filter((c) => c.id !== id);
  guardarCategorias(nuevaLista);
  return nuevaLista;
}