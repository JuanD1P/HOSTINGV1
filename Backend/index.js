import express from 'express';
import cors from 'cors';
import { userRouter } from './Routes/usuariosR.js';
import cookieParser from 'cookie-parser';
import { reporteRouter } from './Routes/reporteR.js';

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], 
    methods: ['GET', 'POST', 'PUT' ,'DELETE'],
    credentials: true
}));

// Aumenta el límite del JSON y los datos codificados en URL
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/reporte', reporteRouter);

app.listen(3000, () => {
    console.log("🚀 Servidor en funcionamiento en http://localhost:3000");
});
