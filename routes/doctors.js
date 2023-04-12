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
        jwtValidation
    ],
    getDoctors
)
router.post('/', 
    [
        jwtValidation,
        check('name','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital asociado es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        fieldValidation
    ],
    createDoctor
)

router.put('/:id', 
    [
        jwtValidation,
        check('name','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital asociado es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        fieldValidation
    ],
    updateDoctor
)

router.delete('/:id', 
    [
        jwtValidation,
    ],
    deleteDoctor
)

module.exports = router;