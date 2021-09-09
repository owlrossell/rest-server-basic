const {Producto} = require("../models");

const obtenerProductos = async (req, res) => {
    const {limit = 5, from = 0} = req.query
    query = {estado:true}
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(from)
            .limit(limit)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async (req, res) => {
    const {id} = req.params
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    res.json(producto)
}

const crearProducto = async (req, res) => {
    const {estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.descripcion = data.descripcion.toUpperCase()
    data.usuario = req.usuario._id
    const productoNuevo = new Producto(data)
    await productoNuevo.save()
    res.status(201).json({
        productoNuevo
    })
}

const actualizarProducto = async (req, res) => {
    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.descripcion = data.descripcion.toUpperCase()
    data.usuario = req.usuario._id
    const productoAct = await Producto.findByIdAndUpdate(id,data, {new:true})
    res.status(201).json({
        productoAct
    })
}

const borrarProducto = async (req, res) => {
    const {id} = req.params
    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(producto)
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}