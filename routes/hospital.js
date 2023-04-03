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
        
    ],
    getHospitals
)

router.post('/', 
    [
        
    ],
    createHospital
)

router.put('/:id', 
    [
        
    ],
    updateHospital
)

router.delete('/:id', 
    [
        
    ],
    deleteHospital
)


module.exports = router;