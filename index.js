import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productosRouter from "./src/rutas/ProductosRouter.js";
import authRouter from "./src/rutas/authRouter.js";
import { auth } from "./src/middlewares/auth.middleware.js";
//import bodyParser from 'body-parser';

const app = express();

/*
const corsOptions = {
  origin: 'http://localhost:3001', // Permite solo peticiones desde este origen
  optionsSuccessStatus: 200
};

app.get('/datos', cors(corsOptions), (req, res) => {
  res.json({ message: 'Datos con CORS restringido' });
});
*/
app.use(cors()); // Configuración CORS genérica

app.use(express.json());
//app.use(bodyParser.json());

// Ruta pública para login
app.use("/auth", authRouter);

// Rutas de productos (algunas públicas, otras protegidas)
app.use( "/api", productosRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));