const pre_registro = require('../models').pre_registro;
const Carrera = require('../models').Carrera;
const Alumno = require('../models').Alumno;
const Usuario = require('../models').Usuario;
const Periodo = require('../models').Periodo;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;


module.exports.add = (req, res) => {
    const no_control = req.body.no_control,
    nombre = req.body.nombre.toUpperCase(),
    ap_paterno = req.body.ap_paterno.toUpperCase(),
    ap_materno = req.body.ap_materno.toUpperCase(),
    id_carrera = req.body.id_carrera,
    correo = req.body.correo;
    pre_registro.create({
    no_control: no_control,
     nombre: nombre,
     ap_paterno: ap_paterno,
     ap_materno: ap_materno,
     correo: correo,     
     id_carrera: id_carrera,
     estado:true
    }).then(pre => {
         console.log('=>',pre)
        res.status(200).json(pre)
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
 
    pre_registro.findAll({where: {estado: {$notIn: ['0']}} ,include: [{model: Carrera, as: 'carreraPre' }]})
		.then(pre_re => {
            console.log("Pre_re",pre_re);
			res.status(200).json(pre_re);
		}).catch(err => {
			res.status(406).json({err: err});
		})
}
module.exports.directorio = (req, res) => {
 
    Alumno.findAll({include: [{model: Usuario, as: 'usuario'},{model: Carrera, as:'carrera'}]})
		.then(pre_re => {
            console.log("Pre_re",pre_re);
			res.status(200).json(pre_re);
		}).catch(err => {
			res.status(406).json({err: err});
		})
}
module.exports.periodos = (req, res) => {
    console.log('Estoy entrando');
    Periodo.findAll({ model: Periodo, as: 'Periodos'})
    .then(periodo => {
        res.status(200).json({periodo})
    }).catch(err => {
        res.status(406).json({err})
    })
}
// module.exports.add = (req, res) => {
//     const no_control = req.body.no_control,
//         nombre = req.body.nombre,
//         ap_paterno = req.body.ap_paterno,
//         ap_materno = req.body.ap_materno,
//         id_carrera = req.body.id_carrera,
//         correo = req.body.correo,
//         id_periodo = req.body.id_periodo,
        
//     const contrasenia = generator.generate({length: 8});

//     sequelize.transaction((t) => {
//         return Usuario.create({
//             correo,
//             contrasenia: contrasenia,
//             rol: 'candidato_residente'
//         }, {transaction: t}).then((usuario) => {
//             return Alumno.create({
//                 no_control,
//                 nombre,
//                 ap_paterno,
//                 ap_materno,
//                 id_carrera,
//                 id_usuario: usuario.id
//             }, {transaction: t}).then(alumno => {
//                 return Anteproyecto.create({
//                     id_alumno: alumno.id,
//                     id_periodo: id_periodo
//                 },{transaction: t});
//             })
//         });
//     }).then((alumno)=>{
//         // console.log('success=======>    ', alumno)
//         // enviar email con contraseña al alumno
//         const mailOptions = {
//             from: 'seguimientoresidenciasitch@gmail.com',
//             to: correo,
//             subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
//             text: `Usuario: ${correo}, contraseña: ${contrasenia}`
//         }
//         transporter.sendMail(mailOptions, (err, info) => {
//             if(err){
//                 console.error('EMAIL', err)
//             }else{
//                 console.log('EMAIL', 'contraseña enviada!');
//             }
//         })
//         res.status(200).json(alumno)
//     }).catch(Sequelize.ValidationError, (err) => {
//         var errores = err.errors.map((element) => {
//             return `${element.path}: ${element.message}`
//         })
//         // console.log('==>', errores)
//         res.status(202).json({errores})
//     }).catch((err) => {
//         console.log(err)
//         res.status(406).json({err: err})
//     }) 
// }
