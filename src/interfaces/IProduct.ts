// Archivo: src/interfaces/IProduct.ts

interface IProduct {
  nombre: string, // Cambiado de 'name' a 'nombre'
  descripcion: string, // Cambiado de 'description' a 'descripcion'
  stock: number,
  categoria: string // Cambiado de 'category' a 'categoria'
  precio: number, // Cambiado de 'price' a 'precio'
  image?: string // Opcional
}

export default IProduct