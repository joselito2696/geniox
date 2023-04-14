const { Pool } = require('pg');
const { httpError } = require('../helpers/handleError');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'geniox',
    port: '5432'
});



const createProduct = async(req, res) => {
    try {
        const { codProd, codBarra, descripcion, marca, precio, imagen, idCategoria, estado } = req.body;
        const categoria = await pool.query('SELECT * FROM categoria where idcategoria=$1 and estado=1', [idCategoria]);
        if (categoria.rowCount == 0) {
            res.status(403).json({
                message: 'Categoria No existe'
            });
        } else {
            const response = await pool.query('Insert Into producto(codprod, codbarra, descripcion, marca, precio, imagen, idcategoria, estado )values($1,$2,$3,$4,$5,$6,$7,$8)', [codProd, codBarra, descripcion, marca, precio, imagen, idCategoria, estado]);
            console.log(response);
            res.json({
                message: 'producto added succesfully'
            });
        }

    } catch (e) {
        httpError(res, e)
    }
}

const UpdatedProduct = async(req, res) => {
    try {
        const { codProd, codBarra, descripcion, marca, precio, imagen, idCategoria, estado } = req.body;
        const id = req.params.id;
        const response = await pool.query('update producto set codProd=$1, codBarra=$2, descripcion=$3, marca=$4, precio=$5, imagen=$6, idCategoria=$7  where idprod=$8', [codProd, codBarra, descripcion, marca, precio, imagen, idCategoria, id]);
        console.log(response);
        res.json({
            message: 'producto updated succesfully'
        });
    } catch (e) {
        httpError(res, e)
    }
}

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('updated producto set estado=0 where idprod=$1', [id]);
        res.status(200).json(response.rows);
    } catch (e) {
        httpError(res, e)
    }
}

const getProduct = async(req, res) => {
    const response = await pool.query('SELECT * FROM producto where estado=1');
    res.status(200).json(response.rows);
}

const filtroMarca = async(req, res) => {
    try {
        console.log(req.params.marca);
        const response = await pool.query('SELECT T0.*,T1.categoria FROM producto T0,categoria T1 where T0.idcategoria=t1.idcategoria and t0.estado=1 and t0.marca like $1', [req.params.marca]);
        res.status(200).json(response.rows);
    } catch (e) {
        httpError(res, e)
    }
}
const filtroCodBarra = async(req, res) => {

    const response = await pool.query('SELECT T0.*,T1.categoria FROM producto T0,categoria T1 where T0.idcategoria=t1.idcategoria and t0.estado=1 and t1.codBarra like  $1 ', [req.params.codBarra]);
    res.status(200).json(response.rows);
}


const filtroPrecio = async(req, res) => {
    const { precMin, precMax } = req.body;
    const response = await pool.query('SELECT T0.*,T1.categoria FROM producto T0,categoria T1 where T0.idcategoria=t1.idcategoria and t0.estado=1 and  t0.precio between $1 and $2', [precMin, precMax]);
    res.status(200).json(response.rows);
}

module.exports = {
    createProduct,
    deleteProduct,
    UpdatedProduct,
    getProduct,
    filtroMarca,
    filtroCodBarra,
    filtroPrecio
}