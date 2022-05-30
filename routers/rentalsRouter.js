import { Router } from "express";
import { postRentals, getRentals, deleteRentals } from "../controllers/rentalsController.js"
import { validarRentals, validarParametroId } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validarRentals, postRentals);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.delete('/rentals/:id', validarParametroId, deleteRentals);

export default rentalsRouter;