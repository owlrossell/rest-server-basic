const usuariosGet = (req, res) => {
    const {q, nombre = 'No name', apikey} = req.query
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey,qq
    })
}
const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body

    res.json({
        msg: 'post API',
        nombre,edad
    })
}
const usuariosPut = (req, res) => {
    const {id} = req.params
    res.json({
        msg: 'put API',
        id
    })
}
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API',
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API',
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}