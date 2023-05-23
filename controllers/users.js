const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {
    const from = Number(req.query.from) || 0;
    const [users, totalUsers] = await Promise.all([
        User.find({}, 'name email role google img')
            .skip(from)
            .limit(5),

        User.count()
    ])

    res.json({
        ok:true,
        msg:'Users List',
        users,
        total: totalUsers
    })
}

const createUser = async(req, res = response) => {
    const {password, email} = req.body;

    try {

        const repeatedEmail = await User.findOne({ email });

        if(repeatedEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya está registrado'
            })
        }

        const newUser = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync(5);
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();
        
        //Generar token
        const token = await generateJWT(newUser.id);

        res.json({
            ok:true,
            msg: 'User Created',
            newUser,
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

const updateUser = async(req, res = response) => {
    
    const uid = req.params.id;

    try {
        const userDb = await User.findById(uid);
        
        if(!userDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe el usuario con ese id'
            })
        }

        //TODO: Validar token y comprobar usuario

        //Update
        const { password, google, email, ...fields } = req.body;

        if(userDb.email !== email) {
            const existingEmail = await User.findOne({email});
            if(existingEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe una cuenta con este email'
                });
            }
        }
        if(!userDb.google){
            fields.email = email;
            //encrypt password
            if(password){
                const salt = bcrypt.genSaltSync(5);
                fields.password = bcrypt.hashSync(password, salt);
            }
        }
        
        const userUpdated = await User.findByIdAndUpdate( uid, fields, {new:true});

        res.json({
            ok:true,
            msg: 'User updated',
            userUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const userDb = await User.findById(uid);
        if(!userDb) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el usuario indicado'
            })
        }
        await User.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'User Deleted',
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }

}



module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}