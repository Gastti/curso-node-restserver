const res = require('express/lib/response');
const Role = require('../models/role');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {

    const existeRole = await Role.findOne({ role });
    if(!existeRole){
        throw new Error(`El rol ${role} no está registrado en la DB`)
    }
    
}

const emailExiste = async (email = '') => {

    const findEmail = await Usuario.findOne({ email });
    if (findEmail){
        throw new Error(`El email "${email}", ya está registrado.`)
    }

}

const nameExiste = async (name = '') => {

    const findName = await usuario.findOne({ name });
    if(findName){
        throw new Error(`El nombre ${name} ya se encuentra registrado.`)
    }

}

const idUsuarioExiste = async (id) => {

    const findUsuario = await Usuario.findById(id);
    if (!findUsuario){
        throw new Error(`El id #${id} no existe`)
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    nameExiste,
    idUsuarioExiste
}
