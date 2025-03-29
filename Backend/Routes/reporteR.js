import express from 'express';
import multer from 'multer';
import con from '../utils/db.js';

const router = express.Router();
const upload = multer(); // Configuración básica de multer para manejar FormData

// 🚀 GUARDAR REPORTE DE MASCOTA PERDIDA (ahora con multer)
router.post('/', upload.single('foto'), async (req, res) => {
    console.log("📩 Datos recibidos en /reporte:", req.body, req.file); // Verificar los datos

    // Los campos de texto vienen en req.body
    const { usuario_id, especie, descripcion, direccion } = req.body;

    // Validar que el usuario_id sea válido
    if (!usuario_id || isNaN(usuario_id)) {
        console.warn("⚠️ El usuario_id es inválido.");
        return res.status(400).json({ error: 'El usuario_id es obligatorio y debe ser un número válido' });
    }

    // El archivo viene en req.file
    const foto = req.file ? req.file.buffer : null; // Accedemos al buffer de la imagen

    if (!foto || !especie || !descripcion || !direccion) {
        console.warn("⚠️ Datos faltantes en la solicitud.");
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const sql = "INSERT INTO reporte (usuario_id, foto, especie, descripcion, direccion) VALUES (?, ?, ?, ?, ?)";
        const result = await new Promise((resolve, reject) => {
            con.query(sql, [usuario_id, foto, especie, descripcion, direccion], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log("✅ Reporte guardado correctamente con ID:", result.insertId);
        res.status(201).json({ message: "Reporte guardado correctamente", id: result.insertId });
    } catch (error) {
        console.error("❌ Error al guardar el reporte en la base de datos:", error);
        res.status(500).json({ error: "Error en la base de datos" });
    }
});

// 🚀 OBTENER TODOS LOS REPORTES
router.get('/', async (req, res) => {
    console.log("📡 Consultando reportes...");
    try {
        con.query("SELECT * FROM reporte", (err, result) => {
            if (err) {
                console.error("❌ Error al obtener reportes:", err);
                return res.status(500).json({ error: "Error en la base de datos" });
            }
            console.log(`✅ Se encontraron ${result.length} reportes.`);
            res.json(result);
        });
    } catch (error) {
        console.error("❌ Error en el servidor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export const reporteRouter = router;
