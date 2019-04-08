const Proyecto = require('../models').Proyecto;
const actividad_general = require('../models').actividad_general;

const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const pdfs = require('../../config/pdfs');

module.exports.addActividadGeneral = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        actividad = req.body.actividad,
        objetivo = req.body.objetivo,
        entregable = req.body.entregable;
         // console.log(')===========>', req.body)
    actividad_general.create({
        id_proyecto,
        actividad,
        objetivo,
        entregable,
        
    }).then((_actividad_general)=>{
        res.status(200).json(_actividad_general);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    })    
}