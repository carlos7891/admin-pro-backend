const { response, json } = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify")


const login = async(req, res = response) =>{

    const { email, password } = req.body;

    try {

        //email Verification
        const userDb = await User.findOne({ email });
        if( !userDb ){
            return res.status(404).json({
                ok:false,
                msg:'Email no válida'
            })
        }

        //password Verification
        const validPassword = bcrypt.compareSync( password, userDb.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar token
        const token = await generateJWT(userDb.id)

        res.json({
            ok:true,
            msg:'Logeado con exito',
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const googleSignIn = async(req, res = response) =>{
    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        const userDb = await User.findOne({email});
        let user;

        if(!userDb){
            user = new User ({
                name,
                email,
                img: picture,
                password:'@@',
                google:true
            })
        }else{
            user = userDb;
            user.google = true;
        }
        //Guardar usuario
        await user.save();

        //Generar token
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok:true,
            msg:'Logeado con exito',
            email, name, picture, token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:true,
            msg:'TOken no valido'
    })
    }
}

const renewToken = async( req, res = response) => {
    const uid = req.uid;
    //Generar token
    const token = await generateJWT(uid);

    const user = await User.findById(uid);

    res.json({
        ok:true,
        token,
        user
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}