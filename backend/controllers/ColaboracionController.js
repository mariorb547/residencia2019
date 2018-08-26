
const Colaborador = require('../models').colaboracion;
const Alumno = require('../models/').Alumno;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;
const Carrera = require('../models').Carrera;
module.exports.add = (req, res) => {
    const idalumno = req.body.id_alumno,
        idcolaborador = req.body.id_colaborador;
        const id=1;
        sequelize.transaction( t => {
            return Colaborador.create({id:id,idalumno: idalumno, idcolaborador: idcolaborador}, {transaction: t})
            .then(colaborador1 =>{
                return Colaborador.create({id:id, idalumno: idcolaborador, idcolaborador: idalumno}, {transaction: t})
                 
            })
        }).then(colaborador =>{
            res.status(200).json(colaborador)
        }).catch(Sequelize.ValidationError, (err) =>{
            var errores = err.errors.map((element) =>{
                return `${element.path}: ${element.message}`
            })
            res.status(202).json({errores})
        }).catch((err) =>{
            res.status(406).json({err: err})
        })
}
module.exports.findById = (req, res) => {
    const id_alumnos = req.params.id;
    
    Alumno.findOne({
        where: {no_control: id_alumnos}, model:Alumno, as:'colaboradores'
    }).then((alumno) => {
        if(alumno == null){
            res.status(304).json(alumno);
        }else{
        res.status(200).json(alumno);}
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })  
}

module.exports.colaboradores = (req, res) => {
    const id_alumnos = req.params.ids;
 
    Colaborador.findAll({where:{idalumno:id_alumnos},
     include:[{ model:Alumno, as:'colaboradores' , include:[{model:Carrera,as:'carrera'}]}]
    }).then((colaborador) => {
         console.log("Pasado los",colaborador)
         if(colaborador == null){
            res.status(304).json(colaborador);
         }else{
        res.status(200).json(colaborador);}
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })  
}