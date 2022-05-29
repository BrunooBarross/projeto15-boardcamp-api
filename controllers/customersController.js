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

export async function getCustomerId(req, res) {
    const id = req.params.id;
    
    try {
        const consulta = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        const cliente = consulta.rows[0];

        if (!cliente) {
            return res.sendStatus(404);
        }
        return res.send(cliente);
    } catch (error) {
        return res.status(500).send("Erro de consulta ao banco na função getCustomerId ", error);
    }
}