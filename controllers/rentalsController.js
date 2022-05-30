import dayjs from "dayjs";
import connection from '../db.js'

export async function postRentals(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD')

    try {
        const buscarValor = await connection.query(` SELECT "pricePerDay" from games where id = $1 `, [gameId]);
        const valorGame = buscarValor.rows[0].pricePerDay * parseInt(daysRented);
        const insert = await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, date, daysRented, null, valorGame, null]);

        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Erro no controller postRentals não foi possível adicionar o aluguel", error);
    }
}