import { Router } from "express";
import { postCustomers } from "../controllers/customersController.js"
import { validarCustomers } from "../middlewares/clientesMiddleware.js";

const clientesRouter = Router();

clientesRouter.post('/customers', validarCustomers, postCustomers);

export default clientesRouter;