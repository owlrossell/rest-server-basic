const {Categoria} = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
    const {limit = 5, from = 0} = req.query
    const query = {estado: true}
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
    ])
    res.json({
        total,
        categorias
    })
}

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res) => {
    const {id} = req.params
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre')
    res.json(categoria)
}

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    await categoria.save()

    res.status(201).json(categoria)
}

// actualizarCategoria
const actualizarCategoria = async (req, res) => {
    const {id} = req.params
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true})
    res.json(categoria)
}

// borrarCategoria
const borrarCategoria = async (req, res) => {
    const {id} = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new:true})
    res.json(categoria)

}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
}