const Docente = require('../models').Docente;
const docente_carreras = require('../models').docente_carreras;
const Departamento = require('../models').Departamento;
const Usuario = require('../models').Usuario;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;
const generator = require('generate-password');
const transporter = require('../../config/email');
const Carrera = require('../models').Carrera;
const Oficina = require('../models').Oficina;
const docente_oficinas = require('../models').docente_oficinas;


module.exports.updateSubdirectorAcademico = (req, res) => {
    const id_usuario = req.body.id_usuario;
    sequelize.transaction(t => {
        return Usuario.update({rol: 'docente'},{where: {rol: 'subdirector_academico'}}, {transaction: t})
            .then(affectedRows => {
                return Usuario.update({rol: 'subdirector_academico'}, {where: {id: id_usuario}}, {transaction:t});
            })
    }).then((_usuario)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(_usuario)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    }) 
}
module.exports.updateJefeDeDivisionDeEstudiosProfesionales = (req, res) => {
    const id_usuario = req.body.id_usuario;
 
sequelize.transaction(t => {
 
           return Departamento.findOne({where:{nombre:'DIVISION DE ESTUDIOS PROFESIONALES'}}).then((depa)=>{
            return sequelize.query(`update usuarios, docentes set usuarios.rol='docente' where usuarios.id=docentes.id_usuario and usuarios.rol='jefe_departamento' and docentes.id_departamento = ${depa.id};`,{type: sequelize.QueryTypes.UPDATE},{transaction: t})
            .then(usuarios => {
                return Usuario.update({rol:'jefe_departamento'}, {where: {id: id_usuario}}, {transaction: t})
            })
           })
       
}).then((departamento)=>{
    // console.log('success=======>    ', result)
    res.status(200).json(departamento)
}).catch(Sequelize.ValidationError, (err) => {
    var errores = err.errors.map((element) => {
        return `${element.path}: ${element.message}`
    })
    // console.log('==>', errores)
    res.status(202).json({errores})
}).catch((err) => {
    res.status(406).json({err: err})
}) 
}
module.exports.findAll = (req, res) => {
    Docente.findAll({
        include: [{model: Usuario, as: 'usuario'},{model: Departamento, as: 'departamento_doce'}]
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
 
module.exports.docentesdivision = (req, res) => {

    Docente.findAll({
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento_doce',where: {nombre:'DIVISION DE ESTUDIOS PROFESIONALES'}}]
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
 
module.exports.docentesgestion= (req, res) => {

    Docente.findAll({
        include: [{model: Usuario, as: 'usuario',where:{rol: {$notIn: ['jefe_departamento']}}},{model:docente_oficinas, as:'docente_oficina'}, {model: Departamento, as: 'departamento_doce',where: {nombre:'GESTIÓN TECNOLÓGICA Y VINCULACIÓN'}}]
    }).then(docentes => {
        console.log(docentes)
        res.status(200).json(docentes)
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    })  
}
module.exports.carreraCoordinador = (req, res) => {
    docente_carreras.findAll({
        where: {id_carrera:req.params.id_carrera}, include:[{model: Carrera, as: 'carrera'}, {model: Docente, as: 'docente'}]
    }).then(docente => {
        res.status(200).json(docente)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
module.exports.oficinaEncargado = (req, res) => {
    docente_oficinas.findAll({
        where: {id_oficina:req.params.id}, include:[{model: Oficina, as: 'oficina'}, {model: Docente, as: 'docente'}]
    }).then(docente => {
        res.status(200).json(docente)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
module.exports.departamentoDivision = (req, res) => {

    Docente.findAll({
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento_doce',where: {nombre:'DIVISION DE ESTUDIOS PROFESIONALES'}}]
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
module.exports.add = (req, res) => {
    // console.log(req.body)
    const contrasenia = generator.generate({length: 8});
    const correo = req.body.correo
    sequelize.transaction((t) => {
        console.log('contrasenia', contrasenia);
        return Usuario.create({
            correo,
            contrasenia: contrasenia,
            rol: 'docente'
        }, {transaction: t}).then((usuario) => {
            return Docente.create({
                titulo: req.body.titulo.toUpperCase(),
                nombre: req.body.nombre.toUpperCase(),
                ap_paterno: req.body.ap_paterno.toUpperCase(),
                ap_materno: req.body.ap_materno.toUpperCase(),
                id_departamento: req.body.id_departamento,
                id_usuario: usuario.id
            }, {transaction: t});
        });
    }).then((docente)=>{
        // console.log('success=======>    ', result)
        // enviar email con contraseña al docente
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo,
            subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
            text: `Usuario: ${correo}, contraseña: ${contrasenia}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.error('EMAIL', err)
            }else{
                console.log('EMAIL', 'contraseña enviada!');
            }
        })
        res.status(200).json(docente)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })    
}
module.exports.addencargado = (req, res) => {
    // console.log(req.body)
    const contrasenia = generator.generate({length: 8});
    const correo = req.body.correo
    sequelize.transaction((t) => {
        console.log('contrasenia', contrasenia);
        return Usuario.create({
            correo,
            contrasenia: contrasenia,
            rol: 'encargado'
        }, {transaction: t}).then((usuario) => {
            return Docente.create({
                titulo: req.body.titulo.toUpperCase(),
                nombre: req.body.nombre.toUpperCase(),
                ap_paterno: req.body.ap_paterno.toUpperCase(),
                ap_materno: req.body.ap_materno.toUpperCase(),
                id_departamento: req.body.id_departamento,
                id_usuario: usuario.id
            }, {transaction: t});
        });
    }).then((docente)=>{
        // console.log('success=======>    ', result)
        // enviar email con contraseña al docente
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo,
            subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
            text: `Usuario: ${correo}, contraseña: ${contrasenia}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.error('EMAIL', err)
            }else{
                console.log('EMAIL', 'contraseña enviada!');
            }
        })
        res.status(200).json(docente)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })    
}
module.exports.informacionDocente = (req, res)=>{
     id_usuario= req.params.id;
     console.log(id_usuario)
    return Docente.findOne({where:{id_usuario}}).then(docente=>{
        console.log(docente)
        res.status(200).json(docente);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })    
}


module.exports.departamentoGestion = (req, res) => {

    Docente.findAll({
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento_doce',where: {nombre:'GESTIÓN TECNOLÓGICA Y VINCULACIÓN'}}]
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}

