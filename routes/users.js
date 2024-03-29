const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation, jwtAdminValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.get( '/', jwtValidation, getUsers);
router.post( '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'Debe enviarse un email').isEmail(),
        fieldValidation
    ],
    createUser
);

router.put( '/:id',
    [
        jwtValidation,
        jwtAdminValidation,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Debe enviarse un email').isEmail(),
        fieldValidation
    ],
    updateUser
);

router.delete( '/:id', jwtValidation, jwtAdminValidation, deleteUser )



module.exports = router;