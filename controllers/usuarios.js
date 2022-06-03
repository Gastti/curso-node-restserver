const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res) => {

    // const { q, apellido = 'No Lastname', apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })

}

const usuariosPost = async (req, res) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar la contraseña (Hacer el hash)
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'Post API - Controlador',
        usuario
    })
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // TODO: Validar contra DB
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put API - Controlador',
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - Controlador'
    })
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { state: false });

    res.json({usuario})
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}