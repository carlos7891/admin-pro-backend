const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const updateImage = async(type, id, fileName) => {

    let oldPath = '';
    
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log('No se encontro al medico')
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`; 
            deleteImage( oldPath );

            doctor.img = fileName;
            await doctor.save();
            return true;
        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontro el hospital')
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;
            
            hospital.img = fileName;
            await hospital.save();
            return true;
        break;

        case 'users':
            const user = await User.findById(id);
            if(!user){
                console.log('No se encontro el usuario')
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;

            user.img = fileName;
            await user.save();
            return true;
        break;
        default:
            return
    }
}

const deleteImage = (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

module.exports = {
    updateImage
}