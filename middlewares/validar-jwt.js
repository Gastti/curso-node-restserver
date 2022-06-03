const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;

        if(!usuario){
            return res.status(401).json({
                msg: "Token no válido - Usuario no existe en DB"
            })
        }

        //Verificar si el uid tiene estado en true
        if(!usuario.state){
            return res.status(401).json({
                msg: "Token no válido - Usuario con estado: false"
            })
        }
        
        next();

    } catch (error) {
        console.log(token);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}