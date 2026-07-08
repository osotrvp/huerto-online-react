const CLAVE = "productosHuertoHogar";

const productosIniciales = [
  { id: 1, nombre: "Tomate orgánico", categoria: "verduras", precio: 1990, stock: 45, imagen: "tomate.jpg", descripcion: "Tomates cultivados sin pesticidas, cosechados en su punto óptimo de maduración.", origen: "Melipilla", destacado: true, oferta: false },
  { id: 2, nombre: "Lechuga hidropónica", categoria: "verduras", precio: 1490, stock: 30, imagen: "lechuga.jpg", descripcion: "Lechuga cultivada en sistema hidropónico, libre de tierra y pesticidas.", origen: "Buin", destacado: true, oferta: false },
  { id: 3, nombre: "Manzana fuji", categoria: "frutas", precio: 2290, stock: 60, imagen: "manzana.jpg", descripcion: "Manzanas dulces y crujientes, cultivadas de forma orgánica en el Valle del Maipo.", origen: "Valle del Maipo", destacado: true, oferta: true, precioOferta: 1690 },
  { id: 4, nombre: "Plátano", categoria: "frutas", precio: 1690, stock: 50, imagen: "platano.jpg", descripcion: "Plátanos importados de comercio justo, ricos en potasio y fibra.", origen: "Comercio justo", destacado: false, oferta: false },
  { id: 5, nombre: "Albahaca fresca", categoria: "hierbas", precio: 990, stock: 25, imagen: "albahaca.jpg", descripcion: "Albahaca aromática, ideal para salsas y ensaladas frescas.", origen: "Peñaflor", destacado: false, oferta: false },
  { id: 6, nombre: "Cilantro", categoria: "hierbas", precio: 790, stock: 8, imagen: "cilantro.jpg", descripcion: "Cilantro fresco cultivado de forma orgánica, sin pesticidas.", origen: "Talagante", destacado: false, oferta: true, precioOferta: 590 },
  { id: 7, nombre: "Miel orgánica", categoria: "otros", precio: 5990, stock: 15, imagen: "miel.jpg", descripcion: "Miel pura de abejas, producida por apicultores locales de la Región Metropolitana.", origen: "Melipilla", destacado: true, oferta: false },
  { id: 8, nombre: "Huevos de campo", categoria: "otros", precio: 3490, stock: 5, imagen: "huevos.jpg", descripcion: "Docena de huevos de gallinas libres, criadas en pastoreo.", origen: "Paine", destacado: false, oferta: false }
];

export function obtenerProductos() {
  const data = localStorage.getItem(CLAVE);
  if (data) return JSON.parse(data);
  localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
  return productosIniciales;
}

export function guardarProductos(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function crearProducto(datos) {
  const lista = obtenerProductos();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map(p => p.id)) + 1 : 1;
  const nuevo = { id: nuevoId, ...datos };
  const nuevaLista = [...lista, nuevo];
  guardarProductos(nuevaLista);
  return nuevaLista;
}

export function actualizarProducto(id, datos) {
  const lista = obtenerProductos();
  const nuevaLista = lista.map(p => (p.id === id ? { ...p, ...datos } : p));
  guardarProductos(nuevaLista);
  return nuevaLista;
}

export function eliminarProducto(id) {
  const lista = obtenerProductos();
  const nuevaLista = lista.filter(p => p.id !== id);
  guardarProductos(nuevaLista);
  return nuevaLista;
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find(p => p.id === Number(id));
}