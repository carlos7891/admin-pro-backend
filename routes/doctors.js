/*
    Path 'api/hospitals'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.get('/', 
    [
        
    ],
    getDoctors
)
router.post('/', 
    [
        
    ],
    createDoctor
)

router.put('/:id', 
    [
        
    ],
    updateDoctor
)

router.delete('/:id', 
    [
        
    ],
    deleteDoctor
)

module.exports = router;