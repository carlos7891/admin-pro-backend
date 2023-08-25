const { response } = require ('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res = response ) => {
    try {
        const from = Number(req.query.from) || 0;
        const [doctors, totalDoctors] = await Promise.all([
            Doctor.find().populate('user','name').populate('hospital','name')
                .skip(from)
                .limit(5),

            Doctor.count()
        ])
        res.json({
            ok:true,
            msg:'ok',
            doctors:doctors,
            total: totalDoctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const createDoctor = async(req, res = response ) => {

    const doctor = new Doctor({
        user:req.uid,
        ...req.body
    })

    try {
        const doctorDb = await doctor.save();

        res.json({
            ok:true,
            msg:'Doctor Created',
            doctor:doctorDb
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const updateDoctor = async(req, res = response ) => {
    const uid = req.params.id;

    try {
        const doctorDb = await Doctor.findById(uid);
        if(!doctorDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe el medico con ese id'
            })
        }
        const doctorUpdated = await Doctor.findByIdAndUpdate( uid, req.body, {new:true});

        res.json({
            ok:true,
            msg:'Doctor actualizado',
            doctorDb:doctorUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const deleteDoctor = async(req, res = response ) => {
    const uid = req.params.id;
    try {
        const doctorDb = await Doctor.findById(uid);
        if(!doctorDb) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el medico indicado'
            })
        }
        await Doctor.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Medico eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}

const getDoctorById = async(req, res = response ) => {
    const uid = req.params.id;
    try {
        const doctorDb = await Doctor.findById(uid);
        if(!doctorDb) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el medico indicado'
            })
        }
        res.json({
            ok: true,
            msg: 'Doctor',
            doctor: doctorDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'No existe el medico indicado'
        })
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorById
}