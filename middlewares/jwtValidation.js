const jwt = require('jsonwebtoken');
const User = require('../models/user')

const jwtValidation = (req, res, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'There is not a token on the request'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET )
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'The token is not valid'
        })
    }
}

const jwtAdminValidation = async(req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;

    try {
        const userDb = await User.findById(uid);

        if(!userDb) {
            return res.status(404).json({
                ok:false,
                msg:'User does not exit'
            })
        }

        if(userDb.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status (403).json({
                ok:false,
                msg:'User does not privileges'
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Talk with the admin'
        })
    }
}

module.exports = {
    jwtValidation,
    jwtAdminValidation,
}