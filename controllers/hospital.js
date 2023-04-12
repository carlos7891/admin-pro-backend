const { response } = require ('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response ) => {
    try {
        const hospitals = await Hospital.find().populate('user','name');
        res.json({
            ok:true,
            msg:'ok',
            hospitals:hospitals
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const createHospital = async(req, res = response ) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok:true,
            msg:'Hospital creado',
            hospital: hospitalDb
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const updateHospital = async(req, res = response ) => {
    const uid = req.params.id;

    try {
        const hospitalDb = await Hospital.findById(uid);
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe el hospital con ese id'
            })
        }
        const hospitaleUpdated = await Hospital.findByIdAndUpdate( uid, req.body, {new:true});

        res.json({
            ok:true,
            msg:'Hospital actualizado',
            hospital:hospitaleUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const deleteHospital = async(req, res = response ) => {
    const uid = req.params.id;
    try {
        const hospitalDb = await Hospital.findById(uid);
        if(!hospitalDb) {
            return res.status(404).json({
                ok:false,
                msg:'No existe el hospital indicado'
            })
        }
        await Hospital.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Hospital eliminado'
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
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}