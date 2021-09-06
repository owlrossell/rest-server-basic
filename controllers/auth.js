const Usuario = require('../models/usuario')
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generar-jwt");
const login = async (req,res) => {
    const {correo, password} = req.body
    try {
        const usuario = await Usuario.findOne({correo})
        // Verificar si usuario existe
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        // Verificar si estado esta en true
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}