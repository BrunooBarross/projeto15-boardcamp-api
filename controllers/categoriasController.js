import connection from '../db.js'

export async function getCategorias(req, res) {
    try {
        const resultado = await connection.query(`SELECT * FROM categories`)
        const categorias = resultado.rows;
        res.status(200).send(categorias);
    } catch (error) {
        return res.status(500).send("Erro no get categorias com o servidor", error);
    }
}

export async function postCategorias(req, res) {
    const { name } = req.body;
    try {
        const resultado = await connection.query(`INSERT INTO categories (name) values ($1)`,[name])
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Erro no post categorias com o servidor", error);
    }
}