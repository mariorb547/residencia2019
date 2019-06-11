 

const Usuario = require('../models/index').Usuario;
const Alumno = require('../models').Alumno;
const AsesorExterno = require('../models').asesor_externo;
const docente_carreras = require('../models').docente_carreras;
const docente_oficinas = require('../models').docente_oficinas;
const oficina = require('../models').oficina;
const Docente = require('../models').Docente;
const Departamento = require('../models').Departamento;
const Sequelize = require('../models/index').Sequelize;
const bCrypt = require('bcrypt-nodejs');
const generator = require('generate-password');
const transporter = require('../../config/email');
const Empresa = require('../models').Empresa;
var fs = require('fs');
const path = require('path')
const multer = require('multer');
const sequelize = require('../models').sequelize
const rol = {
    JEFE_PROYECTO: 'jefe_proyecto',
    DOCENTE: 'docente',
    JEFE_DEPARTAMENTO: 'jefe_departamento',
	PRESIDENTE_ACADEMIA: 'presidente_academia',
	CANDIDATO_RESIDENTE: 'candidato_residente',
	RESIDENTE: 'residente',
	ADMIN: 'admin',
	ASESOR_EXTERNO: 'asesor_externo',
	ENCARGADO:'encargado',
	NUEVO:'nuevo'
}

const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}

module.exports.findJefeDepartamento = (req, res) => {
    const id_usuario = req.user.id;
    Docente.findOne({where: {id_usuario}})
		.then((docente) => {
			res.status(200).json(docente);
		}).catch(err => {
			res.status(406).json({err: err})
		})
}
module.exports.updateContrasenia = (req, res) => {
	const contrasenia = req.body.nueva_contrasenia;
	const id_usuario = req.user.id;
	if(req.user.rol === 'admin' || req.user.id === id_usuario){
		const contraseniaHash = generateHash(contrasenia)
		// console.log(id_usuario, contrasenia);
		Usuario.update({contrasenia: contraseniaHash}, {where: {id: id_usuario}})
			.then(usuario => {
				// console.log('=>',departamento)
				res.status(200).json(usuario)
			}).catch(Sequelize.ValidationError, (err) => {
				var errores = err.errors.map((element) => {
					return `${element.path}: ${element.message}`
				})
				// console.log('==>', errores)
				res.status(202).json({errores})
			}).catch((err) => {
				res.status(406).json({err: err})
			})
	}else{
		res.status(406).json({err: 'Error no le pertenece esta cuenta :@'});
	}
}

module.exports.updateContraseniaEmail = (req, res) => {
	const contrasenia = generator.generate({length: 8});
	const contraseniaHash = generateHash(contrasenia);
	const id_usuario = req.body.id_usuario,
		correo = req.body.correo;
	Usuario.update({contrasenia: contraseniaHash}, {where: {id: id_usuario}})
		.then(_usuario => {
			// enviar email con contraseña al docente
			// console.log('ASdasd',_usuario)
			const mailOptions = {
				from: 'seguimientoresidenciasitch@gmail.com',
				to: correo,
				subject: 'Nueva contraseña para acceder al sistema de seguimiento de residencias ITCH',
				text: `Correo: ${correo}, Contraseña: ${contrasenia}`
			}
			transporter.sendMail(mailOptions, (err, info) => {
				if(err){
					console.error('EMAIL', err)
				}else{
					console.log('EMAIL', 'contraseña enviada!');
				}
			})
			res.status(200).json(_usuario)
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

module.exports.findAll = (req, res) => {
	Usuario.findAll({where: {rol: {$notIn: ['admin']}}})
		.then(usuarios => {
			res.status(200).json(usuarios);
		}).catch(err => {
			res.status(406).json({err: err});
		})
}
module.exports.isAuth = (req, res) => {
	if(req.isAuthenticated()){
	 
		if(req.user.rol === rol.JEFE_DEPARTAMENTO|| req.user.rol === rol.ENCARGADO || req.user.rol === rol.DOCENTE || req.user.rol==='subdirector_academico'){
			// Buscar el docente
			const id_usuario = req.user.id;
			Docente.findOne({where: {id_usuario}, include: [{model: docente_carreras, as: 'docente_carrera' } , {model: Departamento, as: 'departamento_doce' },{model:Usuario ,as:'usuario'}] })

			// Docente.findOne({where: {id_usuario}, include: [{model: docente_carreras, as: 'docente_carrera' },{ model:docente_oficinas, as: 'docente_oficina', include:[{model:oficina, as:'oficina'}] }, {model: Departamento, as: 'departamento_doce' }] })
				.then((docente) => {
				
 					if(docente.departamento_doce.nombre === 'DIVISION DE ESTUDIOS PROFESIONALES'){
						res.status(200).json({isAuth: true, rol: req.user.rol,id:id_usuario, id_docente: docente.id,docente_carrera: docente.docente_carrera, id_departamento: docente.id_departamento, nombredepartamento:docente.departamento_doce.nombre });	
					}else if(docente.departamento_doce.nombre ==='GESTIÓN TECNOLÓGICA Y VINCULACIÓN'){
 
						res.status(200).json({isAuth: true, rol: req.user.rol,id:id_usuario, id_docente: docente.id,docente_carrera: docente.docente_carrera, id_departamento: docente.id_departamento, nombredepartamento:docente.departamento_doce.nombre });	
					}			
					else{
						res.status(200).json({isAuth: true, rol: req.user.rol,id:id_usuario,correo:docente.usuario.correo, id_docente: docente.id,docente_carrera: docente.docente_carrera, id_departamento: docente.id_departamento});	
					}
			
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === rol.CANDIDATO_RESIDENTE || req.user.rol === rol.RESIDENTE){
			// Buscar el alumno jejeje
			const id_usuario = req.user.id;
			Alumno.findOne({where: {id_usuario}})
				.then(alumno => {
					res.status(200).json({isAuth: true,id:req.user.id, rol: req.user.rol, id_alumno: alumno.id, id_carrera: alumno.id_carrera});
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === rol.ASESOR_EXTERNO){
			const id_usuario = req.user.id;
			AsesorExterno.findOne({where: {id_usuario}})
				.then(asesor_externo => {
					res.status(200).json({id_usuario,isAuth: true, rol: req.user.rol, id_asesor_externo: asesor_externo.id, id_empresa: asesor_externo.id_empresa})
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === 'admin'){
			res.status(200).json({isAuth: true, rol: req.user.rol});
		}else if(req.user.rol === 'nuevo'){
			res.status(200).json({isAuth: true, rol: req.user.rol});
		}else if(req.user.rol === 'empresa'){
              var id_usuario=req.user.id;
			Empresa.findOne({where: {id_usuario}})

			// Docente.findOne({where: {id_usuario}, include: [{model: docente_carreras, as: 'docente_carrera' },{ model:docente_oficinas, as: 'docente_oficina', include:[{model:oficina, as:'oficina'}] }, {model: Departamento, as: 'departamento_doce' }] })
				.then((empresa) => {
					res.status(200).json({isAuth: true, rol: req.user.rol,id:empresa.id});
				})
			
		}else{
			res.status(203).json({isAuth: false});
		}
	}else{
		res.status(203).json({isAuth: false});
	}
}

module.exports.updateRol = (req, res) => {
	if(req.body.rol === 'admin'){
		res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
	}else{
		Usuario.findById(req.body.id_usuario)
			.then(usuario => {
				return usuario.update({rol: req.body.rol})
					.then(usuario => {
						res.status(200).json({usuario})
					})
			}).catch(err => {
				res.status(203).json({err});
			})
	}
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/usuario/auth');
}

// module.exports.getFotoUser = (req, res) => {
//     //const filename = req.params.filename;
//     const ruta_foto = path.join(__dirname, `../../storeFiles/usuarios/user.png`)
//     var obj={"img":ruta_foto};
//     res.status.json(obj);
// }


exports.Uploads = (req, res) =>{
    console.log(req.files);
    var tmp_path = req.files.photo.path;
    // Ruta donde colocaremos las imagenes
    var target_path = './public/images/' + req.files.photo.name;
   // Comprobamos que el fichero es de tipo imagen
    if (req.files.photo.type.indexOf('image')==-1){
                res.send('El fichero que deseas subir no es una imagen');
    } else {
         // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // Eliminamos el fichero temporal
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.render('upload',{message: '/images/' + req.files.photo.name,title: 'ejemplo de subida de imagen por HispaBigData'});
            });
         });
     }
}

module.exports.getFotoUser = (req, res) => {
	const id =  req.params.id;
	console.log("-------"+id)
	return Usuario.findOne({where:{id}}).then(usuario=>{
		var ruta="user.png";
	 
		try{
			if(usuario.path_file_foto!=null){
				ruta=usuario.path_file_foto;
			}
		}catch(e){
			
		}
		const ruta_foto = path.join(__dirname, `../../storeFiles/usuarios/${ruta}`)
		var imagen = fs.readFileSync(ruta_foto);
		res.contentType("application/image"	);
		res.send(new Buffer(imagen).toString('base64'));
		

	}).catch(err => {
		console.log(err)
		res.status(203).json({err});
	})
 
}
module.exports.getFotoResidentes = (req, res) => {
	const ruta=  req.params.ruta;
	
		
	 
		
		const ruta_foto = path.join(__dirname, `../../storeFiles/usuarios/${ruta}`)
		var imagen = fs.readFileSync(ruta_foto);
		res.contentType("application/image"	);
		res.send(new Buffer(imagen).toString('base64'));
		
		

 
}

module.exports.addFoto = (req, res) => {
    const id_usuario =  req.params.id;
    uploadFoto(req, res, (err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
		 
            sequelize.transaction((t) => {
				return Usuario.findOne({ where: { id: id_usuario } }, { transaction: t })
                    .then(usuario_record => {
                        if (usuario_record.path_file_foto) {
                            fs.unlink(`./storeFiles/usuarios/${usuario_record.path_file_foto}`);
                        }
                        return Usuario.update({ path_file_foto: req.file.filename }, { where: { id: id_usuario } }, { transaction: t });
                    })
            }).then((usuario_foto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(usuario_foto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
				console.log(err)
                res.status(406).json({ err: err })
            })

            // res.status(200).json({fileName: req.fileName})
            // console.log(req.file);
        }

    }));
    // console.log(req);
}
const MAX_FILE_SIZE_ANTEPROYECTO = 1 * 1000 * 1000;
const uploadFoto = multer({
	dest: './storeFiles/usuarios',
	limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, }, // && file.mimetype!=='image/png' && file.mimetype!=='jpg'
    fileFilter: (req, file, cb) => (file.mimetype !== 'image/jpeg') ? cb(null, false, new Error('Debe ser una imagen')) : cb(null, true)
}).single('filenamefoto');
// const uploadFoto = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 	  cb(null, './storeFiles/usuarios')
// 	},
// 	filename: function (req, file, cb) {
// 	  cb(null, file.fieldname + '-' + Date.now())
// 	}
//   })
  
  //var uploadFoto = multer({ storage: storage })