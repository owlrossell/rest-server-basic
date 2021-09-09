const {Router} = require("express");
const {check} = require("express-validator");

const {validarJwt, validarCampos, tieneRole} = require("../middlewares");
const {crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria} = require("../controllers/categorias");
const {existeCategoriaPorId} = require("../helpers/db-validators");
const router = Router()

// Obtener todas las categrías - público
router.get('/', obtenerCategorias)

// Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un id válido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

// Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id válido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria)

// Borrar una categoría - Admin
router.delete('/:id', [
    validarJwt,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id válido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)

module.exports = router