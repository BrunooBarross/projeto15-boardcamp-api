import connection from '../db.js'
import joi from 'joi';

export async function validarRentals(req, res, next) {
    const { customerId } = req.body;

    const rentalsSchema = joi.object({
        customerId: joi.number().integer().required(),
        gameId: joi.number().integer().required(),
        daysRented: joi.number().integer().min(1).required() 
    });

    const { error } = rentalsSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    try {
        const temUsuario = await connection.query(`SELECT * FROM customers WHERE id = $1`,[customerId]);
        if (temUsuario.rows.length === 0) {
            return res.sendStatus(400);
        }
        next();
    } catch (error) {
        return res.status(500).send("Erro ao conectar no servidor middleware  postRentals", error);
    }
}