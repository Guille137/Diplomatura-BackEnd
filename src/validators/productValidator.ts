import { z } from "zod"

const productSchemaValidator = z.object({
  // 1. Campo NOMBRE (String): Solo se usa el mensaje de error en .min()
  nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  
  // 2. Campo DESCRIPCION (String)
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  
  // 3. Campo PRECIO (Number): El error de tipo se maneja automáticamente
  precio: z.number().min(0.01, "El precio debe ser un valor positivo (mayor a 0)"),
  
  // 4. Campo CATEGORIA (String)
  categoria: z.string().min(2, "La categoría debe tener al menos 2 caracteres"),
  
  // 5. Campo STOCK (Number entero)
  stock: z.number({ 
    // Si necesitas un error de tipo personalizado para 'stock'
})
    .int("El stock debe ser un número entero")
    .positive("El stock debe ser un número positivo"),
  
  // 6. Campo IMAGEN (String opcional)
  image: z.string().optional() 
})

export const createProductSchema = productSchemaValidator

// Para actualizar, todos los campos son opcionales (partial), pero si se envían, deben ser válidos.
export const updatedProductSchema = productSchemaValidator.partial()