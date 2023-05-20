
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImage } = require('../controllers/upload');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', 
    [
        jwtValidation
    ],
    fileUpload
)

router.get('/:type/:photo', getImage)

module.exports = router;