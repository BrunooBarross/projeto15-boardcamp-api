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
        return res.sendStatus(500);
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
                    id: rental.customersId,
                    name: rental.customersName,
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
        return res.sendStatus(500);
    }
}

export async function deleteRentals(req, res) {
    const id = req.params.id;
    try {
        connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function finalizarRentals(req, res) {
    const id = req.params.id;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD')
    try {
        const consulta = await connection.query(`
            SELECT rentals.*, games."pricePerDay" FROM rentals
            JOIN games ON rentals."gameId" = games.id WHERE rentals.id = $1`
            , [id]);
        const diff = dayjs(date).diff(consulta.rows[0].rentDate, "d");
        if(diff > consulta.rows[0].daysRented){
            const delayFee = (diff - consulta.rows[0].daysRented) * consulta.rows[0].pricePerDay;
            const update = await connection.query(` 
                UPDATE rentals SET 
                    "returnDate" = $1,
                    "delayFee" = $2
                WHERE id = $3`, [date, delayFee, id]);
            return res.sendStatus(200);
        }
        const update = await connection.query(` 
            UPDATE rentals SET 
                "returnDate" = $1,
                "delayFee" = $2
            WHERE id = $3`, [date, 0, id]);
        res.sendStatus(200);
        
    } catch (error) {
        return res.sendStatus(500);
    }
}