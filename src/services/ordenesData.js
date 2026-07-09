const CLAVE = "ordenesHuertoHogar";

export function obtenerOrdenes() {
  const data = localStorage.getItem(CLAVE);
  return data ? JSON.parse(data) : [];
}

export function guardarOrdenes(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function crearOrden(datosOrden) {
  const lista = obtenerOrdenes();
  const nuevaOrden = { ...datosOrden, fechaCompra: new Date().toISOString() };
  guardarOrdenes([...lista, nuevaOrden]);
  return nuevaOrden;
}

export function obtenerOrdenPorId(numeroOrden) {
  return obtenerOrdenes().find((o) => o.numeroOrden === numeroOrden);
}