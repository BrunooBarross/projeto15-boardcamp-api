import connection from '../db.js'

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try {
        const resultado = await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        values ($1, $2, $3, $4, $5)`,[name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Erro no post games ao concectar com o banco", error);
    }
}

export async function getGames(req, res) {
    const name = req.query.name;
    
    try {
        if (name) {
            const consulta = await connection.query(
                `SELECT * FROM games WHERE name LIKE '${name[0].toUpperCase() + name.substr(1)}%'`);
            const games = consulta.rows;
            console.log(consulta.rows);
            return res.status(200).send(games);
        }
        const consulta = await connection.query(`SELECT * FROM games`)
        const games = consulta.rows;
        res.status(200).send(games);
    } catch (error) {
        return res.status(500).send("Erro no get games com o Banco de dados", error);
    }
}