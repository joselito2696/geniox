const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'geniox',
    port: '5432'
});
const getCoor = async(req, res) => {
    //res.send('users');
    const response = await pool.query('SELECT * FROM coordenada');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
const createCordenada = async(req, res) => {
    console.log(req.body);
    const { latitud, longitud, tipo, activo, id_zona } = req.body;
    const response = await pool.query('Insert Into coordenada(latitud, longitud, tipo, activo,id_zona )values($1,$2,$3,$4,$5)', [latitud, longitud, tipo, activo, id_zona]);
    console.log(response);
    res.json({
        message: 'Coordenada added succesfully'
    });
};

const getCoorId = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM coordenada where id=1$', [id]);
    res.status(200).json(response.rows);
}

module.exports = {
    getCoor,
    getCoorId,
    createCordenada
}