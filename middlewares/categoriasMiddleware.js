import connection from '../db.js'

export async function validarCategoria(req, res, next) {
    const { name } = req.body;
    if(!name){
        res.sendStatus(400);
    }
    try {
        const temName = await connection.query(`SELECT * FROM categories WHERE name = $1`,[name]);
        if(temName.rows.length > 0){
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}