import { Router } from "express";
import { postGames, getGames } from "../controllers/gamesController.js"
import { validarDadosGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.post('/games', validarDadosGame, postGames);
gamesRouter.get('/games', getGames);

export default gamesRouter;