/*
    Path 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.post('/', 
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'Debe enviarse un email').isEmail(),
        fieldValidation
    ],
    login
)

router.post('/google', 
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        fieldValidation
    ],
    googleSignIn
)

router.get('/renew', 
    [
        jwtValidation
    ],
    renewToken
)
module.exports = router;