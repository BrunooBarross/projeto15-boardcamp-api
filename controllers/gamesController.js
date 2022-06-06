import connection from '../db.js'

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try {
        const resultado = await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        values ($1, $2, $3, $4, $5)`,[name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getGames(req, res) {
    const name = req.query.name;
    
    try {
        if (name) {
            const consulta = await connection.query(
                `SELECT games.*, categories.name as "categoryName" 
                    FROM games 
                    JOIN categories
                    ON games."categoryId" = categories.id
                    WHERE games.name LIKE '${name[0].toUpperCase() + name.substr(1)}%'
                    OR games.name LIKE '${name}%'         
                `);
            const games = consulta.rows;
            return res.status(200).send(games);
        }
        const consulta = await connection.query(`
            SELECT games.* , categories.name as "categoryName"
            FROM games
            JOIN categories
            ON games."categoryId" = categories.id
        `)
        const games = consulta.rows;
        res.status(200).send(games);
    } catch (error) {
        return res.sendStatus(500);
    }
}