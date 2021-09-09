const Role = require("../models/role");
const Usuario = require("../models");
const {Categoria, Producto} = require("../models");
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no está en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}

const existeCategoriaPorId = async (id = '') => {
    const categoria = await Categoria.findById(id)
    if(!categoria) {
        throw new Error('No existe categoría con ese Id')
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`)
    }
}

const existeProductoPorId = async (id = '') => {
    const productoExiste = await Producto.findById(id)
    if(!productoExiste) {
        throw new Error('No existe producto con ese id')
    }
}

const noExisteProductoNombre = async (nombre = '') => {
    nombre = nombre.toUpperCase()
    if(await Producto.findOne({nombre})){
        throw new Error(`El producto ${nombre} ya existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeCategoriaPorId,
    existeProductoPorId,
    existeUsuarioPorId,
    noExisteProductoNombre,
}