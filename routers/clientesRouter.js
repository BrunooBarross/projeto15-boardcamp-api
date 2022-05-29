import { Router } from "express";
import { postCliente } from "../controllers/clientesController.js"
import { validarCustomers } from "../middlewares/clientesMiddleware.js";

const clientesRouter = Router();

clientesRouter.post('/customers', validarCustomers, postCliente);

export default clientesRouter;