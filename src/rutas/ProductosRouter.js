// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  createProducto,
} from "../controladores/ProductosController.js";

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.get("/productos/:nombre", getProductoByNombre);
router.post("/productos", createProducto);
router.get("/productos/categoria", getAllProductosByCategoria);
router.delete("/productos/:id", createProducto);

router.post("/auth/login", loginusuariocreateProducto);

export default router;