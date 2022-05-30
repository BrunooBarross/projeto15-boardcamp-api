import { Router } from "express";
import { postRentals, getRentals, deleteRentals, finalizarRentals } from "../controllers/rentalsController.js"
import { validarRentals, validarParametroId } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validarRentals, postRentals);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.delete('/rentals/:id', validarParametroId, deleteRentals);
rentalsRouter.post('/rentals/:id/return', validarParametroId, finalizarRentals);

export default rentalsRouter;