import { Router } from "express";
import { postCustomers, getCustomers, getCustomerId } from "../controllers/customersController.js"
import { validarCustomers, validarParamId } from "../middlewares/clientesMiddleware.js";

const clientesRouter = Router();

clientesRouter.post('/customers', validarCustomers, postCustomers);
clientesRouter.get('/customers', getCustomers);
clientesRouter.get('/customers/:id', validarParamId, getCustomerId);

export default clientesRouter;