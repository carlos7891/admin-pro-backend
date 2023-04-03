const { response } = require ('express');


const getHospitals = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'getHospitals'
    })
}

const createHospital = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'createHospital'
    })
}

const updateHospital = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'updateHospital'
    })
}

const deleteHospital = (req, res = response ) => {
    res.json({
        ok:true,
        msg:'updateHospital'
    })
}

module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}