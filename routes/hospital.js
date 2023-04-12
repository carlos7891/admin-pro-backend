/*
    Path 'api/hospitals'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.get('/', 
    [
        jwtValidation
    ],
    getHospitals
)

router.post('/', 
    [
        jwtValidation,
        check('name','El nombre del hospital es necesario').not().isEmpty(),
        fieldValidation
    ],
    createHospital
)

router.put('/:id', 
    [
        jwtValidation,
        check('name','El nombre del hospital es necesario').not().isEmpty(),
        fieldValidation
    ],
    updateHospital
)

router.delete('/:id', 
    [
        jwtValidation
    ],
    deleteHospital
)


module.exports = router;