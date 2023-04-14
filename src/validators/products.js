const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('codProd')
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check('codBarra')
    .exists()
    .isNumeric(),
    check('descripcion')
    .exists()
    .isString(),
    check('precio')
    .exists()
    .isDecimal(),
    check('idCategoria')
    .exists()
    .isNumeric(),
    check('marca')
    .exists()
    .isString(),
    check('imagen')
    .exists()
    .isString(),
    check('estado')
    .exists()
    .isNumeric()
    .custom((value, { req }) => {
        if (value == 1) {
            return true
        } else {
            throw new Error('el estodo tiene que ser 1')
        }
    }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
const validateupdated = [
    check('codProd')
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check('codBarra')
    .exists()
    .isNumeric(),
    check('descripcion')
    .exists()
    .isString(),
    check('precio')
    .exists()
    .isDecimal(),
    check('idCategoria')
    .exists()
    .isNumeric(),
    check('marca')
    .exists()
    .isEmpty()
    .isString(),
    check('imagen')
    .exists()
    .isEmpty()
    .isString(),
    check('estado')
    .exists()
    .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateCreate,
    validateupdated
}