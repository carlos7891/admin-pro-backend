const jwt = require('jsonwebtoken');

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

module.exports = {
    jwtValidation,
}