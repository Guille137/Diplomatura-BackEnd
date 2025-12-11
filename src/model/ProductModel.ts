// Archivo: src/model/ProductModel.ts

// DEFINE EL ESQUEMA DE DATOS Y CREA EL MODELO
// EL MODELO:
// 1 - crea la colección en mongodb
// 2 - habilita los métodos de manipulación de data

import { model, Model, Schema } from "mongoose"
import IProduct from "../interfaces/IProduct"

const productSchema = new Schema<IProduct>({
  nombre: { type: String, required: true }, // <-- CORREGIDO de 'name' a 'nombre'
  descripcion: { type: String, default: "No tiene descripción" }, // <-- CORREGIDO de 'description' a 'descripcion'
  stock: { type: Number, default: 0, min: 0 },
  categoria: { type: String, default: "No tiene categoria" }, // <-- CORREGIDO de 'category' a 'categoria'
  precio: { type: Number, default: 0, min: 0 }, // <-- CORREGIDO de 'price' a 'precio'
  image: { type: String }
}, {
  versionKey: false
})

const Product: Model<IProduct> = model("Product", productSchema)

export default Product