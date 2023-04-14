const { Router } = require('express');
const router = Router();

const { getCoor, createCordenada, getCoorId } = require('../controllers/index.controller');
const { validateCreate, validateupdated } = require('../validators/products');
const {
    createProduct,
    deleteProduct,
    UpdatedProduct,
    getProduct,
    filtroMarca,
    filtroCodBarra,
    filtroPrecio
} = require('../controllers/producto.controller');

router.get('/product', getProduct);
router.post('/product', validateCreate, createProduct);
router.put('/product/:id', validateupdated, UpdatedProduct);
router.delete('/product/:id', deleteProduct);

router.get('/filtroMarca/:marca', filtroMarca);
router.get('/filtroCodBarra/:codBarra', filtroCodBarra);
router.post('/filtroPrecio', filtroPrecio);


module.exports = router;