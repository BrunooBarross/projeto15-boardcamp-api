import connection from '../db.js'

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const postBanco = await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        values ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Erro no post clientes ao concectar com o banco", error);
    }
}
