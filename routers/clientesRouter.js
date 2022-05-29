import { Router } from "express";
import { postCustomers, getCustomers, getCustomerId, putCustomers } from "../controllers/customersController.js"
import { validarCustomers, validarParamId, validarPutCustomer } from "../middlewares/clientesMiddleware.js";

const clientesRouter = Router();

clientesRouter.post('/customers', validarCustomers, postCustomers);
clientesRouter.get('/customers', getCustomers);
clientesRouter.get('/customers/:id', validarParamId, getCustomerId);
clientesRouter.put('/customers/:id', validarParamId, validarPutCustomer, putCustomers );

export default clientesRouter;