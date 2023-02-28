const User = require('../models/user');

const getUsers = async(req, res) => {
    const users = await User.find({}, 'nombre email role google');
    res.json({
        ok:true,
        msg:'Users List',
        users
    })
}

const createUser = async(req, res) => {
    const {name, password, email} = req.body;

    const newUser = new User(req.body);

    try {
        await newUser.save();
        res.json({
            ok:true,
            msg: 'User Created',
            newUser
        })
    } catch (error) {
        console.log(error)
        throw new Error('Error creando usuario')
    }

}



module.exports = {
    getUsers,
    createUser
}