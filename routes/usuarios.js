const { Router } = require('express');
const { check } = require('express-validator')

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const {
    esRoleValido,
    nameExiste,
    emailExiste,
    idUsuarioExiste
} = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(nameExiste),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('role').custom(esRoleValido),
    validarCampos
],
usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    validarCampos
], usuariosDelete);

module.exports = router;