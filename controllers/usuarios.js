const Usuario = require('../models/usuario')
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res) => {
    const {limit = 5, from = 0} = req.query
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        usuarios
    })
}
const usuariosPost = async (req, res) => {
    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save(usuario)
    res.json({
        msg: 'post API',
        usuario
    })
}
const usuariosPut = async (req, res) => {
    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})
    res.json(usuario)
}
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API',
    })
}
const usuariosDelete = async (req, res) => {
    const {id} = req.params
    // Físicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(usuario)
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}