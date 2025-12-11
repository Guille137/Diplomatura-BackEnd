
// FUNCIONES QUE SANITIZAN DATOS DE ENTRADA Y RESPONDEN AL CLIENTE
// LA REQUEST Y EL RESPONSE SIEMPRE ESTARÁN SOLO EN LOS CONTROLLERS

import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"
import { createProductSchema, updatedProductSchema } from "../validators/productValidator"

class ProductController {
  static getAllProducts = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      // Modificación: Usamos 'q' para nombre, 'categoria', 'minPrice' y 'maxPrice'
      const { q, categoria, minPrice, maxPrice } = req.query
      console.log(req.query)

      const filter: any = {}

      // 1. Filtrar por Nombre (q = query string)
      // Busca cualquier producto cuyo campo 'nombre' contenga el texto de 'q'
      if (q) filter.nombre = new RegExp(String(q), "i")
      
      // 2. Filtrar por Categoría
      if (categoria) filter.categoria = String(categoria)

      // 3. Filtrar por Rango de Precio
      if (minPrice || maxPrice) {
        filter.precio = {}
        // $gte: Greater Than or Equal (mayor o igual)
        if (minPrice) filter.precio.$gte = Number(minPrice)
        // $lte: Less Than or Equal (menor o igual)
        if (maxPrice) filter.precio.$lte = Number(maxPrice)
      }

      const products = await Product.find(filter)
      res.json({ success: true, data: products })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static getProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID Inválido" })
      }

      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.status(200).json({ success: true, data: product })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static addProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { body, file } = req

      const { nombre, descripcion, precio, categoria, stock } = body
      
      // Revisar: Usar los nombres de campo del modelo (nombre, categoria, precio)
      if (!nombre || !descripcion || !precio || !categoria || !stock) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
      }

      const dataToValidate = {
        nombre,
        descripcion,
        categoria,
        stock: +stock,
        precio: +precio,
        image: file?.path
      }

      const validator = createProductSchema.safeParse(dataToValidate)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      // Si estamos usando Mongoose, el ID se genera automáticamente.
      const newProduct = new Product(validator.data)

      await newProduct.save()
      res.status(201).json({ success: true, data: newProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static updateProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params
      const { body } = req

      if (!Types.ObjectId.isValid(id)) res.status(400).json({ succes: false, error: "ID Inválido" })

      const validator = updatedProductSchema.safeParse(body)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, validator.data, { new: true })

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: updatedProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static deleteProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const id = req.params.id

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID Inválido" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id)

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: deletedProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ error: error.message })
    }
  }
}

export default ProductController