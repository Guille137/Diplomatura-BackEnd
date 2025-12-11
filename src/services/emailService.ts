// Archivo: src/services/emailService.ts

import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config'; // Asegura que las variables de entorno estén cargadas

// 1. Configuración del transportador (usando las variables del .env)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true para 465, false para otros puertos como 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 2. Función Middleware para enviar correo (ruta /email/send)
const emailService = async (req: Request, res: Response): Promise<void | Response> => {
    try {
        // Los datos del correo vienen del cuerpo de la petición
        const { to, subject, html } = req.body;

        if (!to || !subject || !html) {
            return res.status(400).json({ success: false, error: 'Faltan campos requeridos: to, subject, html' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Remitente
            to: to, // Destinatario (ej: 'test@example.com')
            subject: subject, // Asunto
            html: html, // Contenido HTML del correo
        };

        // 3. Envío del correo
        const info = await transporter.sendMail(mailOptions);
        
        console.log("Mensaje enviado: %s", info.messageId);
        
        res.json({ success: true, message: 'Correo enviado correctamente', messageId: info.messageId });
    } catch (e) {
        const error = e as Error;
        console.error("Error al enviar correo:", error.message);
        res.status(500).json({ success: false, error: 'Error al enviar el correo.', details: error.message });
    }
};

// 4. Exportar el servicio (puede ser llamado desde otros controladores, como el de Auth)
export default emailService;