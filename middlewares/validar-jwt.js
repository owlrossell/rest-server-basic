const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJwt = async (req, res, next) => {
    const token = req.header('x-token')
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }
        // Verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - estado:false'
            })
        }
        req.usuario = usuario
        next()
    }catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJwt
}