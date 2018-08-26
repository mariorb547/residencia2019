const Carrera = require('../models').Carrera;
const Departamento = require('../models').Departamento;
const Empresa = require('../models').Empresa
const Titular = require('../models').Titular
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const asesor_externo = require('../models').asesor_externo
const docente_carreras = require('../models').docente_carreras;
const docente_oficinas = require('../models').docente_oficinas;
const Docente = require('../models').Docente;
module.exports.todasss = (req, res) => {
 
    Carrera.findAll({ model: Carrera, as: 'Carreras'})
    .then(carreras => {
      
        res.status(200).json({carreras})
    }).catch(err => {
        res.status(406).json({err})
    })
}
 
module.exports.carrerasCordinadores = (req, res) => {
 
docente_carreras.findAll()
    .then(docentes_asignados => {
        // console.log(docentes_asignados)
        res.status(200).json(docentes_asignados);
    }).catch(err => {
        res.status(406).json({err: err});
    });
}

module.exports.oficinasEncargados = (req, res) => {
 
    docente_oficinas.findAll()
        .then(docentes_asignados => {
            // console.log(docentes_asignados)
            res.status(200).json(docentes_asignados);
        }).catch(err => {
            res.status(406).json({err: err});
        });
    }
module.exports.carreraPresidentes = (req, res) => {
     docentesgestion
     docente_carreras.findOne({where:[{id_carrera:id_ca, rol:'presidente_academia'}]})
        .then(docentes_asignados => {
            // console.log(docentes_asignados)
            res.status(200).json(docentes_asignados);
        }).catch(err => {
            res.status(406).json({err: err});
        });
    }
module.exports.carreraPresidente = (req, res) => {
     id_carrera= req.body.id_carrera;
    docente_carreras.findOne({where:{id_carrera:id_carrera, rol:'presidente_academia'}})
        .then(docentes_asignados => {
            // console.log(docentes_asignados)
            res.status(200).json(docentes_asignados);
        }).catch(err => {
            res.status(406).json({err: err});
        });
    }
module.exports.carreras = (req, res) => {
 
    Carrera.findAll()
    .then(carreras => {
 
        res.status(200).json({carreras})
    }).catch(err => {
        res.status(406).json({err})
    })
}
module.exports.addPeriodos = (req, res) => {
    const id_carrera = req.body.id_ca,
            periodo = req.body.periodo_residencia,
            ciclo = req.body.ciclo,
            fecha_inicio = req.body.fechas_periodo[0],
            fecha_fin = req.body.fechas_periodo[1],
            fecha_inicio_entrega_anteproyecto = req.body.fechas_entrega_anteproyecto[0],
            fecha_fin_entrega_anteproyecto = req.body.fechas_entrega_anteproyecto[1];
    
    Periodo.create({
        periodo,
        ciclo,
        fecha_inicio, fecha_fin,
        fecha_inicio_entrega_anteproyecto, fecha_fin_entrega_anteproyecto,
        id_carrera
    }).then((periodo_added)=>{
        res.status(200).json(periodo_added);
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