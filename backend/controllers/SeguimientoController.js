const Carrera = require('../models').Carrera;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;
const docente_carreras = require('../models').docente_carreras;
const Periodo = require('../models').Periodo;
const Anteproyecto = require('../models').Anteproyecto;
const Alumno = require('../models').Alumno;
const Seguimiento = require('../models').Seguimiento;
const seguimiento_proyecto = require('../models').seguimiento_proyecto;
const Proyecto = require('../models').Proyecto;
const Asesor_externo = require('../models').asesor_externo;
const Docente = require('../models').Docente;
const Empresa = require('../models').Empresa;
const situacion = require('../models').situacion;

const pdfs = require('../../config/pdfs');
const fs = require('fs');

module.exports.getSeguimiento = (req, res) => {
    return Seguimiento.findAll({ include: [{ model: Periodo, as: 'periodo', include: [{ model: Carrera, as: 'carrera' }] }] }).then(datos => {
        res.status(200).json(datos)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}
module.exports.getSeguimientos = (req, res) => {
    return sequelize.query(`select* from seguimientos join periodos on seguimientos.id_periodo= periodos.id join carreras on periodos.id_carrera =carreras.id;
    `).then(datos => {
            res.status(200).json(datos)

        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}
module.exports.getSeguimientodivi = (req, res) => {
    var cadena = req.params.id;
    var arreglocadena = cadena.split(',');
    return Periodo.findOne({ where: { periodo: arreglocadena[0], ciclo: arreglocadena[1], id_carrera: arreglocadena[2] } }).then(datos => {
        return Seguimiento.findAll({ where: { id_periodo: datos.id } }).then(seguimietosD => {
            res.status(200).json(seguimietosD)
        })

    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })

}

module.exports.generarSeguimiento = (req, res) => {
    var id_seguimiento = req.params.id;
    return seguimiento_proyecto.findAll({ where: { id_seguimiento }, include: [{ model: Seguimiento, as: 'seguimiento' }], include: [{ model: Proyecto, as: 'proyecto', include: [{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno', include:[{ model: situacion, as:'situacion'}] }, { model: Docente, as: 'asesor_interno' }, { model: Asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa' }] }] }] }] }).then(Seguimientos => {
        res.status(200).json(Seguimientos)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}
module.exports.generarReporteFinal = (req, res)=>{
    var id_periodo = req.params.id;
    return Anteproyecto.findAll({where:{id_periodo},include:[{model:Alumno, as:'alumno', include:[{model:situacion, as:'situacion'}]},{ model: Docente, as: 'asesor_interno' },{model:Proyecto, as:'proyectos'}, { model: Asesor_externo, as: 'asesor_externo', include:[{model:Empresa,as:'empresa'}]}]  }).then(anteproyectos=>{
    return Periodo.findOne({where:{id:id_periodo}}).then(periodo=>{
    
        res.status(200).json({anteproyectos,periodo})
    })
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })

}
module.exports.revisionDeTodosLosSeguimientos = (req, res)=>{
    var id_periodo = req.params.id;

      return Periodo.findOne({where:{id:id_periodo},include:[{model:Seguimiento, as:'seguimientos',include:[{model:seguimiento_proyecto,as:'seguimientos_proyecto'}]}]}).then(seguimientostodo=>{

     
        res.status(200).json(seguimientostodo)
  
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })

}



module.exports.generarSeguimientopdf = (req, res) => {
    var id_seguimiento = req.params.id, idS = req.params.ids;
    var url = null;
    return seguimiento_proyecto.findAll({ where: { id_seguimiento, estado_seguimiento:'cumplio' }, include: [{ model: Seguimiento, as: 'seguimiento' }], include: [{ model: Proyecto, as: 'proyecto', include: [{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno' }, { model: Docente, as: 'asesor_interno' }, { model: Asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa' }] }] }] }] }).then(SeguimientosCumplieron => {
        return seguimiento_proyecto.findAll({ where: { id_seguimiento, estado_seguimiento: 'no cumplio' }, include: [{ model: Seguimiento, as: 'seguimiento' }], include: [{ model: Proyecto, as: 'proyecto', include: [{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno' }, { model: Docente, as: 'asesor_interno' }, { model: Asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa' }] }] }] }] }).then(SeguimientosNoCumplieron => {

            return seguimiento_proyecto.findOne({ where: { id_seguimiento }, include: [{ model: Seguimiento, as: 'seguimiento' }], include: [{ model: Proyecto, as: 'proyecto', include: [{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }] }] }).then(seguimientoCarrera => {
                return Seguimiento.findOne({ where: { id: id_seguimiento } }).then(seguimientofecha => {
                    pdfs.generarSeguimiento(SeguimientosCumplieron, SeguimientosNoCumplieron, seguimientoCarrera?seguimientoCarrera.proyecto.anteproyecto.alumno.carrera:null, idS, seguimientofecha, res);
                })



            })
        })
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.generarSeguimientofinalPdf = (req, res) => {
    var id_periodo = req.params.id;
    return Anteproyecto.findAll({where:{id_periodo},include:[{model:Alumno, as:'alumno', include:[{model: Carrera, as:'carrera'},{model:situacion, as:'situacion'}]},{ model: Docente, as: 'asesor_interno' },{model:Proyecto, as:'proyectos'}, { model: Asesor_externo, as: 'asesor_externo', include:[{model:Empresa,as:'empresa'}]}]  }).then(anteproyectos=>{
    return Periodo.findOne({where:{id:id_periodo}}).then(periodo=>{
        // res.status(200).json({anteproyectos,periodo})
        pdfs.generarSeguimientofinal(anteproyectos,periodo,res)
    })
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.verseguimiento = (req, res) =>{
   var id = req.params.id;
    var revisado =true;
    return Seguimiento.update({revisado},{where:{id}}).then(revisados=>{
        console.log('estoy entrando?-----------------------------------------------------------------------')
        console.log(revisados)
        res.status(200).json(revisados)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}