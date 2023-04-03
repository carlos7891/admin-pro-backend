const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name:{
        require:true
    },
    img:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }
});

DoctorSchema.method('toJSON', function () {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Doctor', DoctorSchema );