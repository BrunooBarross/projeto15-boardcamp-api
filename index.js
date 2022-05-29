import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import categoriasRouter from "./routers/categoriasRouter.js"
import gamesRouter from "./routers/gamesRouter.js"
import clientesRouter from "./routers/clientesRouter.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(categoriasRouter);
app.use(gamesRouter);
app.use(clientesRouter);

const port = process.env.PORT || 4000;
app.listen(port, console.log(chalk.bold.blue(` Servidor rodando na porta ${port}`)));