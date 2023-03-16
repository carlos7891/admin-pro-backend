/*
    Path 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/fieldValidation');

const router = Router();

router.post('/', 
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'Debe enviarse un email').isEmail(),
        fieldValidation
    ],
    login
)



module.exports = router;