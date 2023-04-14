const pathNode = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImage");

const fileUpload = (req, res =response ) => {

    const {type, id} = req.params;
    const validTypes = ['hospitals', 'doctors', 'users'];

    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'Ruta con tipo no valido'
        })
    }

    //validate file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })
    }

    //process file
    const file = req.files.image;
    const fileName =  file.name.split('.');
    const fileExt= fileName[fileName.length -1 ];

    //validate Ext
    const validateExt =  ['png', 'jpg', 'jpeg', 'gif'];
    if(!validateExt.includes(fileExt)){
        return res.status(400).json({
            ok:false,
            msg:'Extesion no permitida'
        })
    }

    const newFileName = `${uuidv4()}.${fileExt}`;

    //Path to save image
    const path = `./uploads/${type}/${newFileName}`;

     // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'No hay ningun archivo'
            })
        }

        //update Image
        updateImage(type, id, newFileName);

        res.json({
            ok:true,
            msg:'File uploaded', 
            file:newFileName
        })
    });
}

const getImage = (req, res =response ) => {
    const {type, photo} = req.params;
    const pathImg = pathNode.join( __dirname, `../uploads/${type}/${photo}`);
    const defaultImage = pathNode.join( __dirname, `../uploads/default.jpg`);
    //default img
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        res.sendFile(defaultImage);
    }
}

module.exports = {
    fileUpload,
    getImage
}