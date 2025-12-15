import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productosRouter from "./src/rutas/ProductosRouter.js";
import authRouter from "./src/rutas/authRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.get( '/help', (req, res) => {
  const helpPath = path.join(__dirname, "/src/vistas/", 'ayuda.html');
  res.sendFile(helpPath);
} );

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));