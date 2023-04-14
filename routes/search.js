
const { Router } = require('express');
const { check } = require('express-validator');
const { getSearch, getCollectionDocument } = require('../controllers/search');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.get('/:search', 
    [
        jwtValidation
    ],
    getSearch
)

router.get('/collection/:table/:search', 
    [
        jwtValidation
    ],
    getCollectionDocument
)

module.exports = router;