import joi from "joi"
import connection from '../db.js'

export async function validarDadosGame(req, res, next) {
    const novoGame = req.body;

    const gameSchema = joi.object({
        name: joi.string().required(),
        image: joi.string().regex(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/).required(),
        stockTotal: joi.number().integer().min(1).required(),
        categoryId: joi.number().integer().min(1).required(),
        pricePerDay: joi.number().integer().min(1).required()
    });

    const { error } = gameSchema.validate(novoGame);

    if (error) {
        return res.status(422).send(error.details);
    }

    try {
        const temName = await connection.query(`SELECT * FROM games WHERE name = $1`, [novoGame.name]);
        const temId = await connection.query(`SELECT * FROM categories WHERE id = $1`, [novoGame.categoryId]);
        if (temName.rows.length > 0) {
            return res.sendStatus(409);
        }
        if (temId.rows.length == 0) {
            return res.sendStatus(400);
        }
        next();
    } catch (error) {
        return res.status(500).send("Erro ao conectar no servidor middleware validarDadosGame", error);
    }
}