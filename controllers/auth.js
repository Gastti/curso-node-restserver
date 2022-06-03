const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos. - Correo'
            });
        }

        // Verificar si el usuario esta activo
        if( !usuario.state ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos. - Estado en False'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos. - Contraseña'
            })
        }


        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login Ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }

}

module.exports = {
    login
}