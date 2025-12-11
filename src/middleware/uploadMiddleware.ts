// Archivo: src/middleware/uploadMiddleware.ts

import multer from "multer" // <- Asegura la importación de Multer
import path from "node:path"
import crypto from "node:crypto"

// 1. Definición del Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + crypto.randomUUID()
    cb(null, name + path.extname(file.originalname))
  }
})

// 2. Definición del File Filter (con la solución de tipado estricto)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true) // Aceptado
  } else {
    // La línea console.log se elimina para evitar el error de tipado extremo.
    
    // SOLUCIÓN DE TIPADO ESTRICTO: Usamos 'as any' para forzar a TS a aceptar (Error, false).
    (cb as any)(new Error("Solo se permiten imagenes"), false) // Rechazado
  }
}

// 3. Creación de la instancia Multer
const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
})

export default upload