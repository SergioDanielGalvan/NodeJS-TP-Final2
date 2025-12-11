// src/rutas/OperadoresRouter.js
import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

import {
    getAllOperadores,
    getOperadorById,
    getOperadorByEmail,
    createOperador,
    deleteOperadorByEmail,
    deleteOperadorById,
    updateOperadorByEmail,
    updateOperadorById,
    resetIntentosByID
} from "../controladores/OperadoresControlador.js"; 

// Rutas de operadores públicas
router.get("/operadores", getAllOperadores);
router.get("/operadores/:id", getOperadorById);
router.get("/operadores/email/:email", getOperadorByEmail); 

// Rutas de productos privadas y Admin  
router.post("/operadores", auth, createOperador);
router.post("/operadores/email/:email", auth, updateOperadorByEmail);
router.post("/operadores/:id", auth, updateOperadorById);
router.delete("/operadores/email/:email", auth, deleteOperadorByEmail);
router.delete("/operadores/:id", auth, deleteOperadorById);
router.patch("/operadores/reset/:id", auth, resetIntentosByID);

export default router;