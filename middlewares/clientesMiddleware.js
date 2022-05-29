import joi from "joi";
import JoiBase from "joi"
import JoiDate from "@joi/date"
import connection from '../db.js'

export async function validarCustomers(req, res, next) {
    const cliente = req.body;
    const joi = JoiBase.extend(JoiDate);

    const clienteSchema = joi.object({
        name: joi.string().required(),
        cpf: joi.string().min(11).max(11).required(),
        phone: joi.string().min(10).max(11).required(),
        birthday: joi.date().format("YYY-MM-DD").utc().required(),
    });

    const { error } = clienteSchema.validate(cliente);

    if (error) {
        let errorKey = JSON.stringify(error.details[0].context.key);
        return errorKey === '"birthday"'
            ? res.sendStatus(400)
            : res.sendStatus(422);
    }

    try {
        const temCpf = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cliente.cpf]);

        if (temCpf.rows.length > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        return res.status(500).send("Erro ao conectar no servidor middleware validarDadosCliente", error);
    }
}

export async function validarParamId(req, res, next) {
    const id = parseInt(req.params.id);
 
    const paramsSchema = joi.object({
        id: joi.number().min(1).required(),
    });

    const { error } = paramsSchema.validate({ id: id });

    if (error) {
        return res.status(422).send(error.details);
    }

    next();
}