const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwtValidation');

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
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Debe enviarse un email').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        fieldValidation
    ],
    updateUser
);

router.delete( '/:id', jwtValidation, deleteUser )



module.exports = router;