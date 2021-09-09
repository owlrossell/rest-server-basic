const {Router} = require("express");
const {validarJwt, validarCampos, tieneRole} = require("../middlewares");
const {check} = require("express-validator");
const {existeCategoriaPorId, noExisteProductoNombre, existeProductoPorId} = require("../helpers/db-validators");
const {crearProducto,
    obtenerProductos,
    obtenerProducto, actualizarProducto, borrarProducto
} = require("../controllers/productos");

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'El ID no es válido para Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

router.post('/', [
    validarJwt,
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio, debe ser un número')
        .isNumeric(),
    check('categoria', '').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('nombre').custom(noExisteProductoNombre),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJwt,
    check('id', 'El ID no es válido para Mongo').isMongoId(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio, debe ser un número')
        .isNumeric(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom(existeCategoriaPorId),
    check('nombre').custom(noExisteProductoNombre),
    validarCampos

], actualizarProducto)

router.delete('/:id', [
    validarJwt,
    tieneRole('ADMIN_ROLE'),
    check('id', 'El ID no es válido para Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

], borrarProducto)

module.exports = router