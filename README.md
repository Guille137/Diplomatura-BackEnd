# 💻 API REST Diplomatura Backend - Proyecto Final

Este proyecto implementa una API REST completa en **TypeScript** siguiendo la arquitectura **MVC**, con **autenticación JWT**, validación estricta (Zod) y despliegue en **Render.com**. [cite_start]Cumple con todos los requisitos obligatorios del Trabajo Práctico[cite: 13].

## Deploy y Acceso

| Tipo | URL | Estado | Requerimiento |
| :--- | :--- | :--- | :--- |
| **URL Pública** | `https://diplomatura-backend.onrender.com` | ✅ Funcional | 9. [cite_start]Deploy [cite: 51, 52] |
| **Repositorio** | 
BACKEND: https://github.com/Guille137/Diplomatura-BackEnd.git
FRONTEND: https://github.com/Guille137/Diplomatura-FrontEnd.git

---

## ✅ Requisitos Obligatorios Completados

| N.º | Requerimiento | Implementación | Referencia en Código |
| :--- | :--- | :--- | :--- |
| **1.** | **Estructura MVC** | Uso del patrón MVC con código 100% tipado en TypeScript. | [cite_start]`src/controllers`, `src/routes`, `src/models` [cite: 15, 16] |
| **2.** | **Scripts** | Definición de scripts `dev`, `build` y `start` para ejecución y compilación. | [cite_start]`package.json` [cite: 18, 19, 20, 21] |
| **3.** | **Logger** | Integración de **Morgan** para registrar peticiones (método, ruta, status code). | [cite_start]`src/index.ts` [cite: 28, 29] |
| **4.** | **Rate Limit** | Límite de peticiones implementado en rutas de autenticación. | [cite_start]Middleware de seguridad [cite: 30, 31] |
| **5.** | **Autenticación** | `authMiddleware` con JWT restringiendo `POST`, `PATCH` y `DELETE` de productos. | [cite_start]`src/middleware/authMiddleware.ts` [cite: 32, 33, 34] |
| **6.** | **Query Params** | Lógica de filtrado en la consulta DB (por categoría, precio min/max, nombre parcial). | [cite_start]`ProductController` [cite: 35, 36, 37] |
| **7.** | **Validación** | Uso de **Zod** para validar todos los *inputs* y manejo consistente de errores. | [cite_start]*Schemas* de Zod [cite: 42, 43, 45] |
| **8.** | **Variables Entorno** | Uso de `dotenv` y variables `.env` para la URI de la DB, JWT Secret, etc. | [cite_start]`.env.example` y `src/index.ts` [cite: 46, 47, 49] |

---

##  Requisitos Opcionales (Bonus)

| Opción | Implementación | Estado | Nota Importante |
| :--- | :--- | :--- | :--- |
| **A. Envío de Correos** | Integración con **Nodemailer** para envío de emails. | ✅ Configurado | Falla en Render con *timeout* debido a las restricciones de autenticación de Gmail (Contraseña de Aplicación/SMTP). |
| **B. Subida de Archivos** | Uso de **Multer** para carga de imágenes en `POST /products`. | ✅ Configurado | Falla en Render con *timeout* debido a las restricciones de permisos/recursos del entorno gratuito. La lógica está implementada. |

---

## Endpoints de la API

URL Base: `https://diplomatura-backend.onrender.com`

### 1. Autenticación (`/auth`)

| Método | Endpoint | Propósito | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **`POST`** | `/auth/register` | Crea un nuevo usuario. | `{"email", "password", "nombre"}` |
| **`POST`** | `/auth/login` | Inicia sesión y devuelve el **JWT Token** necesario para rutas seguras. | `{"email", "password"}` |

### 2. Productos (`/products`)

| Método | Endpoint | Propósito | Requerimientos |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/products` | Obtiene la lista de productos (soporta Query Params). | ❌ Ninguno |
| **`POST`** | `/products` | Crea un nuevo producto (soporta subida de archivos Multer). | ✅ Token JWT + `form-data` |
| **`PATCH`** | `/products/:id` | Actualiza un producto por ID. | ✅ Token JWT |
| **`DELETE`** | `/products/:id` | Elimina un producto por ID. | ✅ Token JWT |

---

## Instrucciones de Instalación Local (Requerimiento 3)

### 1. Variables de Entorno (`.env.example`)

Cree el archivo `.env` con las variables requeridas (no subir claves al repositorio):

```env
# Ejemplo de .env para uso local (Requerimiento 5 de Forma de Entrega)
PORT=3000
URI_DB="mongodb+srv://[TU_USER]:[TU_PASSWORD]@[TU_CLUSTER].mongodb.net/?appName=Cluster0"
JWT_SECRET="ClaveSecretaParaJWT"
EMAIL_USER="redguille@gmail.com"
EMAIL_PASS="[Contraseña de Aplicación de Google de 16 caracteres, SIN ESPACIOS]"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587

# Credenciales de Correo (Generadas por Google como "Contraseña de Aplicación")
EMAIL_USER="redguille@gmail.com"
EMAIL_PASS="bkkygstylkawpywl"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587

Scripts de Ejecución

1.- npm install: Instalar dependencias
2.- npm run dev: Ejecturar en desarrollo
3.- npm run buil: Compilar a JavaScript
4.- npm run star: Ejecutar en produccion