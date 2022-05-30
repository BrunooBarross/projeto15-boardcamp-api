import { Router } from "express";
import { postRentals, getRentals } from "../controllers/rentalsController.js"
import { validarRentals } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validarRentals, postRentals);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;