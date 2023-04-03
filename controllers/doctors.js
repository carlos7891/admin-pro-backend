const { response } = require ('express');


const getDoctors = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'getDoctors'
    })
}

const createDoctor = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'createDoctor'
    })
}

const updateDoctor = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'updateDoctor'
    })
}

const deleteDoctor = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'deleteDoctor'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}