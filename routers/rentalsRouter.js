import { Router } from "express";
import { postRentals } from "../controllers/rentalsController.js"
import { validarRentals } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validarRentals, postRentals);

export default rentalsRouter;