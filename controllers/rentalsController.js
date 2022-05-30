import dayjs from "dayjs";
import connection from '../db.js'

export async function postRentals(req, res) {
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

export async function getRentals(req, res) {
    const gameId = req.query.gameId;
    const customerId = req.query.customerId;
    try {
        if( customerId || gameId ){
            var consulta = await connection.query(`
                SELECT rentals.*, customers.id as "customersId", customers.name as "customersName", games.id as "gamesId", 
                games.name as "gamesName", categories.id as "categoryId", categories.name as "categoryName" FROM rentals
                JOIN games ON rentals."gameId" = games.id
                JOIN customers ON rentals."customerId" = customers.id
                JOIN categories ON games."categoryId" = categories.id
                WHERE rentals."customerId" = $1 OR rentals."gameId" = $2;
            `, [customerId, gameId]);
        }else{
            var consulta = await connection.query(`
                SELECT rentals.*, customers.id as "customersId", customers.name as "customersName", games.id as "gamesId", 
                games.name as "gamesName", categories.id as "categoryId", categories.name as "categoryName" FROM rentals
                JOIN games ON rentals."gameId" = games.id
                JOIN customers ON rentals."customerId" = customers.id
                JOIN categories ON games."categoryId" = categories.id
            `);
        }
        let rentals = consulta.rows;
        let rentalsFiltered = [];
        for (let rental of rentals) {
            rental = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName,
                },
                game: {
                    id: rental.gamesId,
                    name: rental.gamesName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                },
            }
            delete rental.customersId;
            delete rental.customersName;
            delete rental.gamesId;
            delete rental.gamesName;
            delete rental.categoryId;
            delete rental.categoryName;
            rentalsFiltered.push(rental);
        }
        res.status(200).send(rentalsFiltered);
    } catch (error) {
        return res.status(500).send("Erro no controller get Rentals", error);
    }
}