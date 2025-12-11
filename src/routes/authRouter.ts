// Archivo: src/routes/authRouter.ts

import { Router } from "express"
import AuthController from "../controllers/authController"
import rateLimit from "express-rate-limit" // 1. Importar la librería

// 2. Definir el Rate Limiter (5 peticiones en 15 minutos)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limitar cada IP a 5 peticiones por ventana de tiempo (15 minutos)
    standardHeaders: true,
    legacyHeaders: false,
    message: { 
        success: false, 
        error: "Demasiados intentos. Por favor, intente de nuevo en 15 minutos." 
    },
})

const authRouter = Router()

// 3. Aplicar el limitador a las rutas sensibles (register y login)
// http://localhost:3000/auth/register
authRouter.post("/register", authLimiter, AuthController.register)

// http://localhost:3000/auth/login
authRouter.post("/login", authLimiter, AuthController.login)

export default authRouter