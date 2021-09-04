const {Router} = require("express");
const {check} = require("express-validator");

const {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    usuariosPatch
} = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos");
const {esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");

const router = Router()

router.get('/', usuariosGet)
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
], usuariosPut)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria, de más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)
router.patch('/', usuariosPatch)
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router