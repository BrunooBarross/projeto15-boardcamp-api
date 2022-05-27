import { Router } from "express";
import { getCategorias, postCategorias } from "../controllers/categoriasController.js"
import { validarCategoria } from "../middlewares/categoriasMiddleware.js"

const categoriasRouter = Router();

categoriasRouter.get('/categories', getCategorias);
categoriasRouter.post('/categories', validarCategoria, postCategorias);

export default categoriasRouter;