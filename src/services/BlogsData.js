const CLAVE = "blogsHuertoHogar";

const blogsIniciales = [
  { id: 1, titulo: "5 recetas con productos de temporada", categoria: "recetas", autor: "Equipo HuertoHogar", fecha: "2026-05-10", imagen: "blog1.jpg", resumen: "Aprovecha al máximo tus verduras frescas con estas recetas simples y deliciosas." },
  { id: 2, titulo: "Cómo elegir frutas y verduras orgánicas", categoria: "consejos", autor: "María Soto", fecha: "2026-05-15", imagen: "blog2.jpg", resumen: "Guía práctica para identificar productos realmente orgánicos en el mercado." },
  { id: 3, titulo: "Nueva alianza con productores de Melipilla", categoria: "noticias", autor: "Equipo HuertoHogar", fecha: "2026-05-20", imagen: "blog3.jpg", resumen: "HuertoHogar suma 10 nuevos productores locales a su red de distribución." },
  { id: 4, titulo: "El ciclo de cultivo de la lechuga hidropónica", categoria: "agricultura", autor: "Pedro Ramírez", fecha: "2026-05-25", imagen: "blog4.jpg", resumen: "Conoce cómo se produce nuestra lechuga sin usar tierra ni pesticidas." }
];

export function obtenerBlogs() {
  const data = localStorage.getItem(CLAVE);
  if (data) return JSON.parse(data);
  localStorage.setItem(CLAVE, JSON.stringify(blogsIniciales));
  return blogsIniciales;
}

export function obtenerBlogPorId(id) {
  return obtenerBlogs().find((b) => b.id === Number(id));
}