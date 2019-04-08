const Alumno = require('../models').Alumno;
const Periodo = require('../models').Periodo;
const Carrera = require('../models').Carrera;
const asesor_externo = require('../models').asesor_externo;
const Usuario = require('../models').Usuario;
const Docente = require('../models').Docente;
const Titular = require('../models').Titular;
const Departamento = require('../models').Departamento;
const tipo_seguro = require('../models').tipo_seguro;
const Empresa = require('../models').Empresa;
const Anteproyecto = require('../models').Anteproyecto;
const Proyecto = require('../models').Proyecto;
const seguimiento_proyecto = require('../models').seguimiento_proyecto;
const observaciones = require('../models').observaciones;
const revision_anteproyecto = require('../models').revision_anteproyecto;
const Asesoria = require('../models').Asesoria;
const solucion_recomendada = require('../models').solucion_recomendada;
const revision_seguimiento = require('../models').revision_seguimiento;
const Seguimiento = require('../models').Seguimiento;
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const generator = require('generate-password');
const transporter = require('../../config/email');
const criterio = require('../models').criterio;
const criterio_evaluacion = require('../models').criterio_evaluacion;
const evaluacion = require('../models').evaluacion;
const cancelacion_proyecto = require('../models').cancelacion_proyecto;
const Colaborador = require('../models').colaboracion;
const docente_carreras = require('../models').docente_carreras;
const pre_registro = require('../models').pre_registro;
const situacion = require('../models').situacion;
const Convenio = require('../models').Convenio;
const pdfs = require('../../config/pdfs');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const Detalle_folio_residentes = require('../models').Detalle_folio_residente;
const moment = require('moment');

// config upload files
const MAX_FILE_SIZE_ANTEPROYECTO = 10 * 1000 * 1000;
const multer = require('multer');
const uploadFileAnteproyecto = multer({
    dest: './storeFiles/anteproyectos',
    limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, },
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf') ? cb(null, false, new Error('El archivo debe ser PDF')) : cb(null, true)
}).single('fileAnteproyecto');

const uploadFileComprobante = multer({
    dest: './storeFiles/comprobantes',
    limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, },
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf') ? cb(null, false, new Error('El archivo debe ser PDF')) : cb(null, true)
}).single('filecomprobante');

const uploadFilePlanTrabajo = multer({
    dest: './storeFiles/planes_de_trabajo',
    limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, },
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf') ? cb(null, false, new Error('El archivo debe ser PDF')) : cb(null, true)
}).single('filePlanTrabajo');

const uploadFileConvenio = multer({
    dest: './storeFiles/convenios',
    limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, },
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf') ? cb(null, false, new Error('El archivo debe ser PDF')) : cb(null, true)
}).single('fileconvenio');

const uploadFileCronograma = multer({
    dest: './storeFiles/cronogramas',
    limits: { fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1, },
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf') ? cb(null, false, new Error('El archivo debe ser PDF')) : cb(null, true)
}).single('fileCronograma');



module.exports.addCronograma = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    uploadFileCronograma(req, res, err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
            sequelize.transaction(t => {
                return Proyecto.findOne({ where: { id: id_proyecto } }, { transaction: t })
                    .then(_proyecto => {
                        // borramos el archivo del plan de trabajo si ya tiene uno
                        if (_proyecto.filename_cronograma) {
                            fs.unlink(`./storeFiles/cronogramas/${_proyecto.filename_cronograma}`);
                        }
                        return Proyecto.update({ filename_cronograma: req.file.filename }, { where: { id: id_proyecto } }, { transaction: t });
                    })
            }).then((_proyecto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(_proyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
                res.status(406).json({ err: err })
            })
        }
    })
}
module.exports.addFilePlanTrabajo = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    uploadFilePlanTrabajo(req, res, err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
            sequelize.transaction(t => {
                return Proyecto.findOne({ where: { id: id_proyecto } }, { transaction: t })
                    .then(_proyecto => {
                        // borramos el archivo del plan de trabajo si ya tiene uno
                        if (_proyecto.filename_plan_trabajo) {
                            fs.unlink(`./storeFiles/planes_de_trabajo/${_proyecto.filename_plan_trabajo}`);
                        }
                        return Proyecto.update({ filename_plan_trabajo: req.file.filename }, { where: { id: id_proyecto } }, { transaction: t });
                    })
            }).then((_proyecto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(_proyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
                res.status(406).json({ err: err })
            })
        }
    })
}

module.exports.addFileAnteproyecto = (req, res) => {
    const id_anteproyecto = req.params.id_anteproyecto;
    uploadFileAnteproyecto(req, res, (err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
            sequelize.transaction((t) => {
                return Anteproyecto.findOne({ where: { id: id_anteproyecto } }, { transaction: t })
                    .then(anteproyecto_record => {
                        // borramos el archivo del anteproyecto q ya tiene jejej
                        if (anteproyecto_record.path_file_anteproyecto) {
                            console.log('ya existe el anteproyecto=========== lo borramos cues')
                            fs.unlink(`./storeFiles/anteproyectos/${anteproyecto_record.path_file_anteproyecto}`);
                        }
                        // console.log(req.file)
                        // console.log(anteproyecto_record)
                        return Anteproyecto.update({ path_file_anteproyecto: req.file.filename }, { where: { id: id_anteproyecto } }, { transaction: t });
                    })
            }).then((anteproyecto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(anteproyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
                res.status(406).json({ err: err })
            })

            // res.status(200).json({fileName: req.fileName})
            // console.log(req.file);
        }

    }));
    // console.log(req);
}
module.exports.addfileconvenio = (req, res) => {
    const id = req.params.id;
    uploadFileConvenio(req, res, (err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
            sequelize.transaction((t) => {
                return Convenio.findOne({ where: { id } }, { transaction: t })
                    .then(anteproyecto_record => {
                        // borramos el archivo del anteproyecto q ya tiene jejej
                        if (anteproyecto_record.url_convenio_firmado_digitalizado) {
                            console.log('ya existe el anteproyecto=========== lo borramos cues')
                            fs.unlink(`./storeFiles/convenios/${anteproyecto_record.url_convenio_firmado_digitalizado}`);
                        }
                        // console.log(req.file)
                        // console.log(anteproyecto_record)
                        return Convenio.update({ url_convenio_firmado_digitalizado: req.file.filename }, { where: { id } }, { transaction: t });
                    })
            }).then((anteproyecto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(anteproyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
                res.status(406).json({ err: err })
            })

            // res.status(200).json({fileName: req.fileName})
            // console.log(req.file);
        }

    }));
    // console.log(req);
}
module.exports.getPlanDeTrabajoPDF = (req, res) => {
    const filename = req.params.filename;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/planes_de_trabajo/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports.getCronogramaPDF = (req, res) => {
    const filename = req.params.filename;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/cronogramas/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports.justificacionCancelacionProyecto = (req, res) => {
    const id_cancelacion = req.body.id_cancelacion,
        justificacion = req.body.justificacion;
    cancelacion_proyecto.update({ justificacion }, { where: { id: id_cancelacion } })
        .then((_cancelacion) => {
            res.status(200).json(_cancelacion);
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
}
module.exports.cancelacionProyecto = (req, res) => {
    const id_alumno = req.body.id_alumno;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno } }, { transaction: t })
            .then(_anteproyecto => {
                return cancelacion_proyecto.create({
                    id_alumno,
                    id_asesor_interno: _anteproyecto.id_asesor_interno,
                    id_periodo: _anteproyecto.id_periodo,
                    nombre_proyecto: _anteproyecto.nombre
                }, { transaction: t }).then(_cancelacion => {
                    return Anteproyecto.destroy({ where: { id_alumno } }, { transaction: t })
                })
            })
    }).then((_anteproyecto) => {
        res.status(200).json(_anteproyecto);
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

}
module.exports.getAlumnodatos = (req, res) => {
    id = req.params.id;
    return Alumno.findOne({ where: { id } }).then(alumno => {
        res.status(200).json(alumno);
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
}
module.exports.retryAnteproyecto = (req, res) => {
    const id_alumno = req.body.id_alumno,
        id_periodo = req.body.id_periodo;
    sequelize.transaction(t => {
        return Alumno.findOne({ where: { id: id_alumno } }, { transaction: t })
            .then(_alumno => {
                return Usuario.update({ rol: 'candidato_residente' }, { where: { id: _alumno.id_usuario } }, { transaction: t })
                    .then(_usuario => {
                        return Anteproyecto.create({
                            id_alumno,
                            id_periodo
                        }, { transaction: t })
                    })
            })
    }).then((_anteproyecto) => {
        res.status(200).json(_anteproyecto);
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

    // Anteproyecto.create({
    //         id_alumno,
    //         id_periodo
    //     }).then((_anteproyecto)=>{
    //     res.status(200).json(_anteproyecto)
    // }).catch(Sequelize.ValidationError, (err) => {
    //     var errores = err.errors.map((element) => {
    //         return `${element.path}: ${element.message}`
    //     })
    //     // console.log('==>', errores)
    //     res.status(202).json({errores})
    // }).catch((err) => {
    //     console.log(err)
    //     res.status(406).json({err: err})
    // }) 

}
module.exports.findAllRechazadosPorCarrera = (req, res) => {
    const id_carrera = req.params.id_carrera;
    // console.log('entaaa')
    Alumno.findAll({
        where: {
            id_carrera,
            id: {
                $notIn: [sequelize.literal(`select anteproyectos.id_alumno from anteproyectos join periodos on anteproyectos.id_periodo=periodos.id where periodos.id_carrera=${id_carrera}`)]
            }
        }
    }).then(_alumnos => {
        // console.log('ress', _alumnos)
        res.status(200).json({ _alumnos })
    }).catch(err => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}
module.exports.updateDatosAnteproyecto = (req, res) => {
    const id_anteproyecto = req.params.id,
        id_asesor_externo = req.body.id_asesor_externo,
        nombre = req.body.nombre.toUpperCase(),
        origen = req.body.origen,
        objetivo_general = req.body.objetivo_general.toUpperCase();
    Anteproyecto.update({ id_asesor_externo, nombre, objetivo_general, origen }, { where: { id: id_anteproyecto } })
        .then((anteproyecto) => {
            // console.log('success=======>    ', result)
            res.status(200).json(anteproyecto)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
}


module.exports.getAnteproyecto = (req, res) => {
    const id_alumno = req.params.id;
    Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] }, { model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] })
        .then(anteproyecto => {
            res.status(200).json(anteproyecto);
        }).catch(err => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}
//                     include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }]

module.exports.getCancelacionProyecto = (req, res) => {
    const id_alumno = req.params.id_alumno;
    cancelacion_proyecto.findOne({ where: { id_alumno }, include: [{ model: Alumno, as: 'alumno', }, { model: Docente, as: 'asesor_interno' }, { model: Periodo, as: 'periodo' }] })
        .then(_cancelacion => {
            res.status(200).json(_cancelacion)
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}
module.exports.generarFormatoDeCancelacion = (req, res) => {
    const id_cancelacion = req.params.id_cancelacion;
    cancelacion_proyecto.findOne({ where: { id: id_cancelacion }, include: [{ model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera', include: [{ model: Departamento, as: 'departamento', include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }] }] }, { model: Docente, as: 'asesor_interno' }, { model: Periodo, as: 'periodo' }] })
        .then(_cancelacion => {
            pdfs.generarFormatoDeCancelacion(_cancelacion, res);
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}

module.exports.generarSolicitudDeResidencia = (req, res) => {

    const id_alumno = req.params.id_alumno;

    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(_anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'DIVISION DE ESTUDIOS PROFESIONALES' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Colaborador.findAll({
                            where: { idalumno: id_alumno },
                            include: [{ model: Alumno, as: 'colaboradores' }]
                        }).then(colaborador => {
                            filterUpdate = {
                                id_carrera: _anteproyecto.alumno.carrera.id,
                                $or: [
                                    { rol: 'coordinador_carrera' }
                                ]
                            }
                            return docente_carreras.findOne({ where: filterUpdate, include: [{ model: Docente, as: 'docente' }] }).then(coordinador => {
                                pdfs.generarSolicitudDeResidencia(_anteproyecto, division_estudios, colaborador, coordinador, res);
                            })

                        })
                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })
}


module.exports.generarSituacion = (req, res) => {

    const id_alumno = req.params.id_alumno;

    sequelize.transaction(t => {
        return Alumno.findOne({ where: { id: id_alumno }, include: [{ model: Carrera, as: 'carrera' }] }).then(alumno => {
            return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: Docente, as: 'asesor_interno' }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa' }] }] }).then(anteproyecto => {
                return Proyecto.findOne({ where: { id_anteproyecto: anteproyecto.id } }).then(proyec => {
                    return seguimiento_proyecto.findAll({ where: { id_proyecto: proyec.id }, include: [{ model: Seguimiento, as: 'seguimiento' }] }).then(seguimiento_p => {
                        pdfs.generarReporteSituacionResidente(alumno, anteproyecto, seguimiento_p, res);
                    })
                })



            })
            //   
            //    console.log(alumno.anteproyecto)
            // 
        })


    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })
}
module.exports.generarPortadaDeProyecto = (req, res) => {
    const id_alumno = req.params.id_alumno;

    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: Docente, as: 'asesor_interno' }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(_anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'DIVISION DE ESTUDIOS PROFESIONALES' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Colaborador.findAll({
                            where: { idalumno: id_alumno },
                            include: [{ model: Alumno, as: 'colaboradores' }]
                        }).then(colaborador => {
                            pdfs.generarPortadaDeProyecto(_anteproyecto, division_estudios, colaborador, res);
                        })

                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}


module.exports.generarCartaPresentacion = (req, res) => {
    const id_alumno = req.params.id_alumno;

    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: Docente, as: 'asesor_interno' }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(_anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'GESTIÓN TECNOLÓGICA Y VINCULACIÓN' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Empresa.findOne({
                            where: { nombre: 'INSTITUTO TECNOLOGICO DE CHILPANCINGO' }, include: [{ model: Titular, as: 'representante_legal' }]
                        }).then(colaborador => {
                            return Detalle_folio_residentes.findOne({
                                where: { id_alumno }
                            }).then(folio => {
                                pdfs.generarCartaPresentacion(_anteproyecto, division_estudios, colaborador, folio, res);
                            })
                        })

                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}
module.exports.get_Proyecto = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno: id_alumno } }, { transaction: t })
            .then(_anteproyecto => {
                // console.log('========>', _anteproyecto)
                return Proyecto.findOrCreate({
                    where: { id_anteproyecto: _anteproyecto.id },
                    include: [{ model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] },{ model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] }],
                    transaction: t
                }).spread((proyecto_find, created) => {
                    if (created) {
                        // buscar el proyecto :c
                        return Proyecto.findOne({
                            where: { id_anteproyecto: _anteproyecto.id },
                            include: [{ model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] }, { model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] }],
                        }, { transaction: t })
                    } else {
                        return proyecto_find;
                    }
                });
            })

    }).then((_proyecto) => {
        console.log("--------------------------------------- datosssss------------------------------------------")
        console.log(_proyecto)

        console.log("---------------------------------------------------------------------------------")

        res.status(200).json(_proyecto)
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
}


module.exports.getProyectoFindOrCreate = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno: id_alumno } }, { transaction: t })
            .then(_anteproyecto => {
                // console.log('========>', _anteproyecto)
                return Proyecto.findOrCreate({
                    where: { id_anteproyecto: _anteproyecto.id },
                    include: [{ model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } },{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] }, { model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] }],
                    transaction: t
                }).spread((proyecto_find, created) => {
                    if (created) {
                        // buscar el proyecto :c
                        return Proyecto.findOne({
                            where: { id_anteproyecto: _anteproyecto.id },
                            include: [{ model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] }, { model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] }],
                        }, { transaction: t })
                    } else {
                        return proyecto_find;
                    }
                });
            })

    }).then((_proyecto) => {
        res.status(200).json(_proyecto)
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
}
module.exports.getProyectoAsesorExterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: { id: id_proyecto },
        include: [{ model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: Seguimiento, as: 'seguimiento' }] }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }] }]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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
}
module.exports.getProyectoAsesorInterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: { id: id_proyecto },
        include: [{ model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } }, { model: observaciones, as: 'observaciones' }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno', include: [{ model: situacion, as: 'situacion' }] }, { model: Periodo, as: 'periodo' }] }]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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
}

module.exports.getProyectoRevisionSeguimientos = (req, res) => {
    const id_anteproyecto = req.params.id_proyecto;// No se va modificar por que puede cambiar las rutas
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: { id_anteproyecto },
        include: [{ model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } }, { model: observaciones, as: 'observaciones' }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno', include: [{ model: situacion, as: 'situacion' }] }, { model: Periodo, as: 'periodo' }] }]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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
}

module.exports.getProyecto = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno: id_alumno } }, { transaction: t })
            .then(_anteproyecto => {
                return Proyecto.findOne({
                    where: { id_anteproyecto: _anteproyecto.id },
                    include: [{ model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{ model: evaluacion, as: 'evaluacion_asesor_externo', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: evaluacion, as: 'evaluacion_asesor_interno', include: [{ model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{ model: criterio, as: 'ref_criterio' }] }] }, { model: Seguimiento, as: 'seguimiento' }, { model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{ model: Docente, as: 'docente' }] }] }, { model: Asesoria, as: 'asesorias', include: { model: solucion_recomendada, as: 'soluciones_recomendadas' } }, { model: observaciones, as: 'observaciones' }, { model: Anteproyecto, as: 'anteproyecto', include: [{ model: revision_anteproyecto, as: 'revisiones', include: [{ model: Docente, as: 'docente' }] }, { model: Alumno, as: 'alumno' }, { model: Periodo, as: 'periodo' }, { model: asesor_externo, as: 'asesor_externo' }] }],
                    transaction: t
                })
            })
    }).then((_proyecto) => {
        res.status(200).json(_proyecto)
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
}
// Docente.findAll({
//     include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento_doce',where: {nombre:'DIVISION DE ESTUDIOS PROFESIONALES'}}]
// }).then(docentes => {
//     res.status(200).json(docentes)
// }).catch((err) => {
//     res.status(406).json({err: err})
// })  
module.exports.findPeriodos = (req, res) => {
    var cadena = req.params.id;
    const contrasenia = generator.generate({ length: 8 });
    // const contrasenia = '123456';

    var separador = "+", // un espacio en blanco
        arregloDeSubCadenas = cadena.split(separador);
    var periodo = arregloDeSubCadenas[0], ciclo = arregloDeSubCadenas[1], no_control = arregloDeSubCadenas[2], id_carrera = arregloDeSubCadenas[3];

    filterUpdate = {
        periodo: periodo
        , ciclo: ciclo, id_carrera: id_carrera

    }
    var correo, id;
    sequelize.transaction((t) => {
        return pre_registro.findOne({ where: { no_control: no_control } }).then((registro) => {

            return Periodo.findOne({ where: filterUpdate }).then((periodo) => {

                correo = registro.correo;
                id = registro.id;
                return Usuario.create({
                    correo: registro.correo,
                    contrasenia: contrasenia,
                    rol: 'candidato_residente'
                }, { transaction: t }).then((usuario) => {
                    return Alumno.create({
                        no_control: registro.no_control, nombre: registro.nombre.toUpperCase(), ap_paterno: registro.ap_paterno.toUpperCase(),
                        ap_materno: registro.ap_materno.toUpperCase(), id_carrera: registro.id_carrera,
                        id_usuario: usuario.id,

                    }, { transaction: t }).then(alumno => {
                        return Anteproyecto.create({
                            id_alumno: alumno.id,
                            id_periodo: periodo.id
                        }, { transaction: t }).then(pre => { //ahora voy bien 
                            return pre_registro.update({ estado: 0 }, { where: { id } }, { transaction: t }).then(prs => {
                                return Docente.findOne({
                                    include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }, { model: Departamento, as: 'departamento_doce', where: { nombre: 'DIVISION DE ESTUDIOS PROFESIONALES' } }]
                                }).then(docentes => {
                                    return situacion.create({
                                        id: 1,
                                        idalumno: alumno.id,
                                        idperiodo: periodo.id,
                                        id_jefe_division: docentes.id,
                                        estado: 'activo',
                                        observacion: ''
                                    }, { transaction: t });
                                })
                            })
                        });
                    })
                });


            })

        })
    }).then((alumno) => {
        // console.log('success=======>    ', correo)
        // // enviar email con contraseña al alumno
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo,
            subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
            text: `Bienvenido al sistema de residencia profesional\n me es grato comunicarle que su clave de acceso es:
            \n Usuario:${correo},\n contraseña: ${contrasenia}
            la generación de sus formatos sera dos dias habiles depues de su taller de residencia profesional
            una vez generado sus formatos favor de pasar a la división de estudios profesionales a entregar los siguientes documentos:
            1.- Solicitud de residencia bien requisitada en una sola hoja (en ambos lados)
            2.- portada y desarrollo de su anteproyecto
            Atentamente:
            El jefe de división de estudios profesioanles.`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('EMAIL', err)
            } else {
                console.log('EMAIL', 'contraseña enviada!');
            }
        })
        res.status(200).json(alumno)
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
    // return Periodo.findOne({where:filterUpdate}).then((periodo) => {
    //     console.log(periodo)
    //     res.status(200).json(periodo)

    // }).catch(Sequelize.ValidationError, (err) => {
    //     var errores = err.errors.map((element) => {
    //         return `${element.path}: ${element.message}`
    //     })
    //     // console.log('==>', errores)
    //     res.status(202).json({ errores })
    // }).catch((err) => {
    //     console.log(err)
    //     res.status(406).json({ err: err })
    // })
}
module.exports.add = (req, res) => {
    const no_control = req.body.no_control,
        nombre = req.body.nombre.toUpperCase(),
        ap_paterno = req.body.ap_paterno.toUpperCase(),
        ap_materno = req.body.ap_materno.toUpperCase(),
        id_carrera = req.body.id_carrera,
        correo = req.body.correo,
        sexo = req.body.sexo,
        numero_celular = req.body.numero_celular,
        id_periodo = req.body.id_periodo,
        domicilio = req.body.domicilio.toUpperCase(),
        ciudad = req.body.ciudad.toUpperCase(),
        no_seguro = req.body.no_seguro,
        id_tipo_seguro = req.body.id_tipo_seguro,
        plan_estudios = req.body.plan_estudios;

    const contrasenia = generator.generate({ length: 8 });

    sequelize.transaction((t) => {
        return Usuario.create({
            correo,
            contrasenia: contrasenia,
            rol: 'candidato_residente'
        }, { transaction: t }).then((usuario) => {
            return Alumno.create({
                no_control,
                nombre,
                ap_paterno,
                ap_materno,
                id_carrera,
                sexo,
                domicilio,
                ciudad,
                numero_celular,
                no_seguro,
                id_tipo_seguro,
                id_usuario: usuario.id,
                plan_estudios
            }, { transaction: t }).then(alumno => {
                return Anteproyecto.create({
                    id_alumno: alumno.id,
                    id_periodo: id_periodo
                }, { transaction: t });
            })
        });
    }).then((alumno) => {
        // console.log('success=======>    ', alumno)
        // enviar email con contraseña al alumno
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo,
            subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
            text: `Usuario: ${correo}, contraseña: ${contrasenia}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('EMAIL', err)
            } else {
                console.log('EMAIL', 'contraseña enviada!');
            }
        })
        res.status(200).json(alumno)
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
}

module.exports.update = (req, res) => {
    const no_control = req.body.no_control,
        nombre = req.body.nombre.toUpperCase(),
        ap_paterno = req.body.ap_paterno.toUpperCase(),
        ap_materno = req.body.ap_materno.toUpperCase(),
        sexo = req.body.sexo,
        numero_celular = req.body.numero_celular,
        domicilio = req.body.domicilio.toUpperCase(),
        ciudad = req.body.ciudad.toUpperCase(),
        no_seguro = req.body.no_seguro,
        id_tipo_seguro = req.body.id_tipo_seguro,
        plan_estudios = req.body.plan_estudios;
    sequelize.transaction((t) => {

        return Alumno.update({
            no_control,
            nombre,
            ap_paterno,
            ap_materno,
            sexo,
            domicilio,
            ciudad,
            numero_celular,
            no_seguro,
            id_tipo_seguro,
            plan_estudios
        }, { where: { no_control } }, { transaction: t })

    }).then((alumno) => {

        res.status(200).json(alumno)
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
}

module.exports.informacion2 = (req, res) => {
    const no_control = req.params.id;
    var opcion = false;
    var envio;
    // Alumno.findOne({ where: { no_control }, include:[{model:Anteproyecto, as:'alumno', include: [{ model:Proyecto, as: 'anteproyecto',include:[{model:seguimiento_proyecto, as: 'seguimientos_proyecto'}]}]}] })
    sequelize.transaction(t => {
        Alumno.findOne({ where: { no_control } }).then(alumno => {
            return Anteproyecto.findOne({ where: { id_alumno: alumno ? alumno.id : 0 }, include: [{ model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }, { transaction: t }).then(anteproyecto => {
                return Proyecto.findOne({ where: { id_anteproyecto: anteproyecto ? anteproyecto.id : 0 } }, { transaction: t }).then(proyecto => {
                    seguimiento_proyecto.findAll({ where: { id_proyecto: proyecto ? proyecto.id : 0 }, include: [{ model: Proyecto, as: 'proyecto', include: [{ model: Anteproyecto, as: 'anteproyecto', include: [{ model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }] }] }, { transaction: t }).then(seguimiento => {
                        (seguimiento != '' ?
                            opcion = true :
                            opcion = false)
                        if (opcion) {
                            envio = seguimiento;
                        } else {
                            envio = anteproyecto;
                        }

                        res.status(200).json(envio)

                    })
                })
            })
            res.status(200).json(alumno)
        })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })


}
module.exports.seguimientos = (req, res) => {
    const no_control = req.params.id;
    var opcion = false;
    var envio;
    var bien = "ok";
    // Alumno.findOne({ where: { no_control }, include:[{model:Anteproyecto, as:'alumno', include: [{ model:Proyecto, as: 'anteproyecto',include:[{model:seguimiento_proyecto, as: 'seguimientos_proyecto'}]}]}] })
    sequelize.transaction(t => {
        return Alumno.findOne({ where: { no_control } }, { transaction: t }).then(alumno => {
            return Anteproyecto.findOne({ where: { id_alumno: alumno ? alumno.id : 0 }, include: [{ model: Periodo, as: 'periodo' }] }, { transaction: t }).then(anteproyecto => {
                return Proyecto.findOne({ where: { id: anteproyecto ? anteproyecto.id : 0 } }, { transaction: t }).then(proyecto => {
                    return seguimiento_proyecto.findAll({ where: { id_proyecto: proyecto ? proyecto.id : 0 } }, { transaction: t }).then(seguimiento_proyectos => {
                        return situacion.findOne({ where: { idalumno: alumno ? alumno.id : 0 } }).then(situacion => {
                            alumno ? bien = 'ok' : bien = 'nook'
                            res.status(200).json({ alumno, seguimiento_proyectos, bien, situacion })

                        })
                    })
                })
            })
        })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}
module.exports.empresa = (req, res) => {
    const no_control = req.params.id;
    var bien = "ok";
    // Alumno.findOne({ where: { no_control }, include:[{model:Anteproyecto, as:'alumno', include: [{ model:Proyecto, as: 'anteproyecto',include:[{model:seguimiento_proyecto, as: 'seguimientos_proyecto'}]}]}] })
    sequelize.transaction(t => {

        return Alumno.findOne({ where: { no_control } }, { transaction: t }).then(alumno => {
            return Anteproyecto.findOne({ where: { id_alumno: alumno ? alumno.id : 0 }, include: [{ model: Periodo, as: 'periodo' }] }, { transaction: t }).then(anteproyecto => {
                return Docente.findOne({ where: { id: anteproyecto ? anteproyecto.id_asesor_interno : 0 } }, { transaction: t }).then(interno => {
                    return asesor_externo.findOne({ where: { id: anteproyecto ? anteproyecto.id_asesor_externo : 0 } }, { transaction: t }).then(externo => {
                        return Empresa.findOne({ where: { id: externo ? externo.id_empresa : 0 } }, { transaction: t }).then(empresa => {
                            return Proyecto.findOne({ where: { id_anteproyecto: anteproyecto ? anteproyecto.id : 0 } }, { transaction: t }).then(proyecto => {
                                return seguimiento_proyecto.findAll({ where: { id_proyecto: proyecto ? proyecto.id : 0 } }, { transaction: t }).then(seguimiento_proyectos => {
                                    return Seguimiento.findAll({ where: { id_periodo: anteproyecto ? anteproyecto.id_periodo : 0 } }, { transaction: t }).then(seguimientos => {
                                        return Carrera.findOne({ where: { id: alumno ? alumno.id_carrera : 0 } }).then(carrera => {
                                            return situacion.findOne({ where: { idalumno: alumno ? alumno.id : 0 } }).then(situacion => {
                                                alumno ? bien = 'ok' : bien = 'nook'
                                                res.status(200).json({ alumno, anteproyecto, interno, externo, empresa, proyecto, seguimientos, seguimiento_proyectos, bien, carrera, situacion })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.situacion = (req, res) => {
    var idalumno = req.body.id, estado = req.body.estado;
    return situacion.update({ estado }, { where: { idalumno } }).then(sit => {
        console.log('todo va bien we ' + sit)
        res.status(200).json(sit);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}
module.exports.numeroseguimientos = (req, res) => {
    var idalumno = req.body.id, numeroseguimientos = req.body.numeroseguimientos + 1;
    return situacion.update({ numeroseguimientos }, { where: { idalumno } }).then(sit => {
        console.log('todo va bien we ' + sit)
        res.status(200).json(sit);
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}

module.exports.entregables = (req, res) => {
    var idalumno = req.body.id, estado = req.body.estado, entregable = req.body.entregable;
    if (entregable === 'cd') {
        return situacion.update({ cd: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'liberacion_asesor_interno') {
        return situacion.update({ liberacion_asesor_interno: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'liberacion_asesor_externo') {
        return situacion.update({ liberacion_asesor_externo: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'carta_presentacion_agradecimientos') {
        return situacion.update({ carta_presentacion_agradecimientos: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'copia_evaluacion') {
        return situacion.update({ copia_evaluacion: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'portadas') {
        return situacion.update({ portadas: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'aprobacion') {
        return situacion.update({ aprobacion_academica: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    } else if (entregable === 'solicitud') {
        return situacion.update({ solicitud_academica: estado }, { where: { idalumno } }).then(sit => {
            res.status(200).json(sit);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({ errores })
        }).catch((err) => {
            res.status(406).json({ err: err })
        })
    }

}

module.exports.addFileComprobante = (req, res) => {
    const id = req.params.id;
    uploadFileComprobante(req, res, (err => {
        if (err) {
            console.error(err);
            res.status(406).json(err);
        } else {
            sequelize.transaction((t) => {
                return Empresa.findOne({ where: { id } }, { transaction: t })
                    .then(anteproyecto_record => {
                        // borramos el archivo del anteproyecto q ya tiene jejej
                        if (anteproyecto_record.url_documentos_de_validacion) {
                            console.log('ya existe el anteproyecto=========== lo borramos cues')
                            fs.unlink(`./storeFiles/comprobantes/${anteproyecto_record.url_documentos_de_validacion}`);
                        }
                        // console.log(req.file)
                        // console.log(anteproyecto_record)
                        return Empresa.update({ url_documentos_de_validacion: req.file.filename }, { where: { id } }, { transaction: t });
                    })
            }).then((anteproyecto) => {
                // console.log('success=======>    ', result)
                res.status(200).json(anteproyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({ errores })
            }).catch((err) => {
                res.status(406).json({ err: err })
            })

            // res.status(200).json({fileName: req.fileName})
            // console.log(req.file);
        }

    }));
    // console.log(req);
}




module.exports.generarListaDeConvenios = (req, res) => {

    const tipoconvenio = req.params.value, convenio = true;
    if (tipoconvenio === 'vigente') {
        sequelize.transaction(t => {
            return Convenio.findAll({ where: { convenio }, include: [{ model: Empresa, as: 'empresa' }] }, { transaction: t })
                .then(convenio => {
                    console.log(convenio)

                    // res.status(200).json(convenio)

                    pdfs.generarListaDeConveniosVigentes(convenio, res);

                })
        }).catch(err => {
            console.log(err);
            res.status(406).json({ err: err });
        })
    } else if (tipoconvenio === 'indifinido') {
        sequelize.transaction(t => {
            return Empresa.findAll({ where: { convenio } }, { transaction: t })
                .then(convenio => {
                    pdfs.generarListaDeConveniosIndifinidos(convenio, res);

                })
        }).catch(err => {
            console.log(err);
            res.status(406).json({ err: err });
        })
    } else if (tipoconvenio === 'terminados') {
        sequelize.transaction(t => {
            return Convenio.findAll({ where: { convenio: false }, include: [{ model: Empresa, as: 'empresa' }] }, { transaction: t })
                .then(convenio => {

                    // res.status(200).json(convenio)

                    pdfs.generarListaDeConveniosTerminados(convenio, res);

                })
        }).catch(err => {
            console.log(err);
            res.status(406).json({ err: err });
        })
    } else {
        sequelize.transaction(t => {
            return Convenio.findAll({ include: [{ model: Empresa, as: 'empresa' }] }, { transaction: t })
                .then(convenio => {

                    // res.status(200).json(convenio)

                    pdfs.generarListaDeConveniosTodos(convenio, res);

                })
        }).catch(err => {
            console.log(err);
            res.status(406).json({ err: err });
        })
    }

}


module.exports.generarTerminoDeResidencias = (req, res) => {
    const idperiodo = req.params.id_periodo, id_carrera = req.params.id_carrera;
    console.log(id_carrera)

    sequelize.transaction(t => {
        return situacion.findAll({ where: { idperiodo } }, { transaction: t }).then(situaciones => {
            return Carrera.findOne({ where: { id: id_carrera } }, { transaction: t }).then(carre => {
                pdfs.generarTermino(situaciones, carre.nombre, res);
            })
        })
        // return Carrera.findOne({ where: { id } }, { transaction: t }).then(carr => {
        //     pdfs.generarTermino(situaciones,carr.nombre, res);
        // })
        pdfs.generarTermino(situaciones, "Sitemas", res);

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}


module.exports.reporteGeneralPorPeriodo = (req, res) => {
    const periodo = req.params.id_periodo, ciclo = req.params.id_carrera;
    // console.log(id_carrera)
    filterPeriodo = {
        periodo: periodo,
        $and: [
            { ciclo: ciclo }
        ]
    }
    sequelize.transaction(t => {
        return Anteproyecto.findAll({ include: [{ model: Periodo, as: 'periodo', where: filterPeriodo }, { model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }, { transaction: t }).then(situaciones => {

            pdfs.generarTerminoPorPeriodo(situaciones, ciclo, res);

        })
        // return Carrera.findOne({ where: { id } }, { transaction: t }).then(carr => {
        //     pdfs.generarTermino(situaciones,carr.nombre, res);
        // })
        // pdfs.generarTermino(situaciones, "Sitemas", res);

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}






module.exports.reporteGeneralPorciclo = (req, res) => {
    const ciclo = req.params.ciclo;
    // console.log(id_carrera)

    sequelize.transaction(t => {
        return Anteproyecto.findAll({ include: [{ model: Periodo, as: 'periodo', where: { ciclo } }, { model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }, { transaction: t }).then(situaciones => {

            pdfs.generarTerminoPorCiclo(situaciones, ciclo, res);

        })
        // return Carrera.findOne({ where: { id } }, { transaction: t }).then(carr => {
        //     pdfs.generarTermino(situaciones,carr.nombre, res);
        // })
        // pdfs.generarTermino(situaciones, "Sitemas", res);

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}


module.exports.primerWordEjemplo = (req, res) => {

    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/solicitud.docx'), 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the templateVariables
    const id_alumno = req.params.id;

    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(_anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'DIVISION DE ESTUDIOS PROFESIONALES' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Colaborador.findAll({
                            where: { idalumno: id_alumno },
                            include: [{ model: Alumno, as: 'colaboradores' }]
                        }).then(colaborador => {
                            filterUpdate = {
                                id_carrera: _anteproyecto.alumno.carrera.id,
                                $or: [
                                    { rol: 'coordinador_carrera' }
                                ]
                            }
                            return docente_carreras.findOne({ where: filterUpdate, include: [{ model: Docente, as: 'docente' }] }).then(coordinador => {
                                var coordinadorCarrera = coordinador ? `${coordinador.docente.titulo} ${coordinador.docente.nombre} ${coordinador.docente.ap_paterno} ${coordinador.docente.ap_materno}` : 'No hay coordinador'
                                var numeroColaboradores = 1;
                                var colaboradores = colaborador.map((alumno, key) => {
                                    numeroColaboradores += 1;
                                });
                                doc.setData({
                                    fecha: moment().format('LL'),
                                    jefe: `${division_estudios.docentes[0].titulo} ${division_estudios.docentes[0].nombre} ${division_estudios.docentes[0].ap_paterno} ${division_estudios.docentes[0].ap_materno}`,
                                    coordinador: coordinadorCarrera,
                                    carrera: `${_anteproyecto.alumno.carrera.nombre}`,
                                    nombre_proyecto: _anteproyecto.nombre,
                                    b: `${_anteproyecto.origen == 'Banco de proyectos' ? 'X' : ''}`,
                                    p: `${_anteproyecto.origen == 'Propuesta propia' ? 'X' : ''}`,
                                    t: `${_anteproyecto.origen == 'Trabajador' ? 'X' : ''}`,
                                    periodo: `${_anteproyecto.periodo.periodo} ${_anteproyecto.periodo.ciclo}`,
                                    nu: numeroColaboradores,
                                    nombre_empresa: `${_anteproyecto.asesor_externo.empresa.nombre}`,
                                    i: _anteproyecto.asesor_externo.empresa.clasificacion == 'industrial' ? 'X' : ' ',
                                    s: _anteproyecto.asesor_externo.empresa.clasificacion == 'servicios' ? 'X' : ' ',
                                    o: _anteproyecto.asesor_externo.empresa.clasificacion == 'otro' ? 'X' : ' ',
                                    pu: _anteproyecto.asesor_externo.empresa.clasificacion == 'público' ? 'X' : ' ',
                                    pr: _anteproyecto.asesor_externo.empresa.clasificacion == 'privado' ? 'X' : ' ',
                                    r_f_c: `${_anteproyecto.asesor_externo.empresa.rfc}`,
                                    domicilio: `${_anteproyecto.asesor_externo.empresa.domicilio}`,
                                    colonia: `${_anteproyecto.asesor_externo.empresa.colonia}`,
                                    c_p: `${_anteproyecto.asesor_externo.empresa.codigo_postal}`,
                                    fax: `${_anteproyecto.asesor_externo.empresa.fax}`,
                                    // ciudad:`${anteproyecto.asesor_externo.empresa.ciudad}`
                                    mision: _anteproyecto.asesor_externo.empresa.mision ? `${_anteproyecto.asesor_externo.empresa.mision}` : '',
                                    nombre_titular: `${_anteproyecto.asesor_externo.empresa.titular.titulo} ${_anteproyecto.asesor_externo.empresa.titular.nombre}`,
                                    puesto_titular: `${_anteproyecto.asesor_externo.empresa.titular.puesto}`,
                                    nombre_asesor: `${_anteproyecto.asesor_externo.nombre}`,
                                    puesto_asesor: `${_anteproyecto.asesor_externo.puesto}`,
                                    nombre_firma: `${_anteproyecto.asesor_externo.empresa.representante_legal.titulo} ${_anteproyecto.asesor_externo.empresa.representante_legal.nombre}`,
                                    puesto_firma: `${_anteproyecto.asesor_externo.empresa.representante_legal.titulo} ${_anteproyecto.asesor_externo.empresa.representante_legal.puesto}`,
                                    nombre_alumno: `${_anteproyecto.alumno.nombre} ${_anteproyecto.alumno.ap_paterno} ${_anteproyecto.alumno.ap_materno}`,
                                    no_control: _anteproyecto.alumno.no_control,
                                    domicilio_alumno: _anteproyecto.alumno.domicilio,
                                    email: _anteproyecto.alumno.usuario.correo,
                                    z: `${_anteproyecto.alumno.seguro.nombre}(X)`,
                                    no_seguro: _anteproyecto.alumno.no_seguro,
                                    ciudad_alumno: `${_anteproyecto.alumno.ciudad}`,
                                    no_celular: `${_anteproyecto.alumno.numero_celular}`
                                });

                                try {
                                    //${moment().format('LL')} 
                                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                                    doc.render()
                                }
                                catch (error) {
                                    var e = {
                                        message: error.message,
                                        name: error.name,
                                        stack: error.stack,
                                        properties: error.properties,
                                    }
                                    console.log(JSON.stringify({ error: e }));
                                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                                    throw error;
                                }

                                var buf = doc.getZip()
                                    .generate({ type: 'nodebuffer' });

                                // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
                                fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/solicitud.docx`), buf);
                                // fs.href="/plantillas/solicitud.docx";
                                const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/solicitud.docx`)
                                var pdf = fs.readFileSync(ruta_pdf);
                                res.contentType("application/docx");
                                res.send(pdf);





                            })

                        })
                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })
}

module.exports.getConvenio = (req, res) => {
    const filename = req.params.id;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/convenios/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports.generarPortadaDeProyectoword = (req, res) => {
    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/portada.docx'), 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the templateVariables
    const id_alumno = req.params.id;

    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: Docente, as: 'asesor_interno' }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(_anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'DIVISION DE ESTUDIOS PROFESIONALES' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Colaborador.findAll({
                            where: { idalumno: id_alumno },
                            include: [{ model: Alumno, as: 'colaboradores' }]
                        }).then(colaborador => {
                            var asesorinterno = "";
                            try {

                                asesorinterno = `${_anteproyecto.asesor_interno.titulo} ${_anteproyecto.asesor_interno.nombre} ${_anteproyecto.asesor_interno.ap_paterno} ${_anteproyecto.asesor_interno.ap_materno}`.toUpperCase()


                            } catch (error) {
                                asesorinterno = ""
                            }
                            var residentes = colaborador.map((alumno, key) => {
                                return {
                                    colaborador: `${alumno.colaboradores.nombre} ${alumno.colaboradores.ap_paterno} ${alumno.colaboradores.ap_materno}`.toUpperCase(),
                                    no_control1: `${alumno.colaboradores.no_control}`
                                }

                            });
                            residentes.unshift([{ colaborador: `${_anteproyecto.alumno.nombre} ${_anteproyecto.alumno.ap_paterno} ${_anteproyecto.alumno.ap_materno}`.toUpperCase() }, { no_control1: _anteproyecto.alumno.no_control }]);
                            doc.setData({
                                fecha: moment().format('LL'),
                                programa: _anteproyecto.alumno.carrera.nombre,
                                periodo: _anteproyecto.periodo.periodo + " " + _anteproyecto.periodo.ciclo,
                                proyecto: _anteproyecto.nombre,
                                // residente: `${_anteproyecto.alumno.nombre} ${_anteproyecto.alumno.ap_paterno} ${_anteproyecto.alumno.ap_materno}`.toUpperCase(),
                                // no_control: _anteproyecto.alumno.no_control,
                                interno: asesorinterno,
                                externo: `${_anteproyecto.asesor_externo.nombre}`.toUpperCase(),
                                residentes: residentes,

                            });

                            try {
                                //${moment().format('LL')} 
                                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                                doc.render()
                            }
                            catch (error) {
                                var e = {
                                    message: error.message,
                                    name: error.name,
                                    stack: error.stack,
                                    properties: error.properties,
                                }
                                console.log(JSON.stringify({ error: e }));
                                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                                throw error;
                            }

                            var buf = doc.getZip()
                                .generate({ type: 'nodebuffer' });

                            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
                            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/portada.docx`), buf);
                            // fs.href="/plantillas/solicitud.docx";
                            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/portada.docx`)
                            var pdf = fs.readFileSync(ruta_pdf);
                            res.contentType("application/docx");
                            res.send(pdf);
                        })

                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}

module.exports.generarCartaPresentacionword = (req, res) => {
    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/CartaPresentacion.docx'), 'binary');
    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the templateVariables
    const id_alumno = req.params.id;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({ where: { id_alumno }, include: [{ model: Docente, as: 'asesor_interno' }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] }] }, { model: Periodo, as: 'periodo' }, { model: Alumno, as: 'alumno', include: [{ model: tipo_seguro, as: 'seguro' }, { model: Usuario, as: 'usuario' }, { model: Carrera, as: 'carrera' }] }] }, { transaction: t })
            .then(anteproyecto => {
                return Departamento.findOne({ where: { nombre: 'GESTIÓN TECNOLÓGICA Y VINCULACIÓN' }, include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }, { transaction: t })
                    .then(division_estudios => {
                        return Empresa.findOne({
                            where: { nombre: 'INSTITUTO TECNOLOGICO DE CHILPANCINGO' }, include: [{ model: Titular, as: 'representante_legal' }]
                        }).then(coordinador => {
                            return Detalle_folio_residentes.findOne({
                                where: { id_alumno }
                            }).then(folio => {
                                var numero = "";
                                if (parseInt(folio.numero_de_folio) < 10) {
                                    numero = "00" + folio.numero_de_folio;
                                } else if (parseInt(folio.numero_de_folio) > 9 && parseInt(folio.numero_de_folio) < 100) {
                                    numero = "0" + folio.numero_de_folio;
                                } else {
                                    numero = folio.numero_de_folio;
                                }

                                var asesorinterno = "";
                                try {

                                    asesorinterno = `${anteproyecto.asesor_interno.titulo} ${anteproyecto.asesor_interno.nombre} ${anteproyecto.asesor_interno.ap_paterno} ${anteproyecto.asesor_interno.ap_materno}`.toUpperCase()


                                } catch (error) {
                                    asesorinterno = ""
                                }

                                doc.setData({
                                    folio: numero,
                                    fecha: moment().format('LL'),
                                    directora: `${coordinador.representante_legal.titulo}${coordinador.representante_legal.nombre}.`,
                                    puesto: `${coordinador.representante_legal.puesto}.`,
                                    alumno: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`,
                                    no_control: `${anteproyecto.alumno.no_control}`,
                                    carrera: `${anteproyecto.alumno.carrera.nombre}`,
                                    proyecto: `${anteproyecto.nombre}`,
                                    seguro: anteproyecto.alumno.no_seguro,
                                    nombre_seguro: anteproyecto.alumno.seguro.nombre,
                                    jefe: `${division_estudios.docentes[0].titulo} ${division_estudios.docentes[0].nombre} ${division_estudios.docentes[0].ap_paterno} ${division_estudios.docentes[0].ap_materno}`,


                                });

                                try {
                                    //${moment().format('LL')} 
                                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                                    doc.render()
                                }
                                catch (error) {
                                    var e = {
                                        message: error.message,
                                        name: error.name,
                                        stack: error.stack,
                                        properties: error.properties,
                                    }
                                    console.log(JSON.stringify({ error: e }));
                                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                                    throw error;
                                }

                                var buf = doc.getZip()
                                    .generate({ type: 'nodebuffer' });

                                // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
                                fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/portada.docx`), buf);
                                // fs.href="/plantillas/solicitud.docx";
                                const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/portada.docx`)
                                var pdf = fs.readFileSync(ruta_pdf);
                                res.contentType("application/docx");
                                res.send(pdf);
                            })
                        })

                    })
            })
    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}



module.exports.generarDictamenword = (req, res) => {
    const id_periodo = req.params.id;
    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/dictamen.docx'), 'binary');
    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    sequelize.transaction((t) => {
        return Periodo.findOne({
            where: { id: id_periodo },
            include: [
                { model: Carrera, as: 'carrera', include: [{ model: docente_carreras, as: 'docentes_carreras', where: { rol: 'presidente_academia' }, include: [{ model: Docente, as: 'docente' }] }, { model: Departamento, as: 'departamento', include: [{ model: Docente, as: 'docentes', include: [{ model: Usuario, as: 'usuario', where: { rol: 'jefe_departamento' } }] }] }] },
                { model: Anteproyecto, as: 'anteproyectos', include: [{ model: Alumno, as: 'alumno', include: [{ model: Usuario, as: 'usuario' }] }, { model: asesor_externo, as: 'asesor_externo', include: [{ model: Empresa, as: 'empresa', include: [{ model: Titular, as: 'titular' }] }] }, { model: Docente, as: 'asesor_interno' }], where: { dictamen: 'aprobado' }, required: false }
            ]
        }, { transaction: t }).then(_periodo => {
            // buscamos al subdirector jeje
            return Usuario.findOne({ where: { rol: 'subdirector_academico' } }, { transaction: t })
                .then(subdirector => {
                    return Docente.findOne({ where: { id_usuario: subdirector ? subdirector.id : null } }, { transaction: t })
                        .then(_subdirector => {
                            // generamos nuestro dictamen en pdf :D
                            console.log('todo debe marchar bien')
                            var residentes = _periodo.anteproyectos.map((anteproyecto, index) => {
                                return {
                                    num: `${(index + 1)}`,
                                    control: `${anteproyecto.alumno.no_control}`,
                                    estudiante: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`,
                                    s: `${anteproyecto.alumno.sexo}`,
                                    anteproyecto: `${anteproyecto.nombre}`,
                                    empresa: `${anteproyecto.asesor_externo.empresa.titular.nombre} \n ${anteproyecto.asesor_externo.empresa.titular.puesto}`,
                                    interno: `${anteproyecto.asesor_interno.titulo} ${anteproyecto.asesor_interno.nombre} ${anteproyecto.asesor_interno.ap_paterno} ${anteproyecto.asesor_interno.ap_materno}`,
                                    externo: `${anteproyecto.asesor_externo.nombre}`,
                                    dictamen: `${anteproyecto.dictamen.toUpperCase()}`,
                                    fecha: `${moment(anteproyecto.updatedAt, "YYYY-MM-DD HH:mm:ss").format('DD-MMMM-YYYY')}`,
                                }
                            });
                            doc.setData({
                                departamento: _periodo.carrera.departamento.nombre.toUpperCase(),
                                carrera: _periodo.carrera.nombre.toUpperCase(),
                                e: (_periodo.periodo === 'FEBRERO-JUNIO') ? 'X' : '',
                                a: (_periodo.periodo === 'AGOSTO-DICIEMBRE') ? 'X' : '',
                                residentes: residentes,
                                presidente: (_periodo.carrera.docentes_carreras) ? `${_periodo.carrera.docentes_carreras[0].docente.titulo} ${_periodo.carrera.docentes_carreras[0].docente.nombre} ${_periodo.carrera.docentes_carreras[0].docente.ap_paterno} ${_periodo.carrera.docentes_carreras[0].docente.ap_materno}` : '',
                                jefe_proyecto: (_periodo.carrera.departamento.docentes) ? `${_periodo.carrera.departamento.docentes[0].titulo} ${_periodo.carrera.departamento.docentes[0].nombre} ${_periodo.carrera.departamento.docentes[0].ap_materno} ${_periodo.carrera.departamento.docentes[0].ap_paterno}` : '',
                                subdirector: (_subdirector) ? `${_subdirector.titulo} ${_subdirector.nombre} ${_subdirector.ap_materno} ${_subdirector.ap_paterno}` : ''

                            });

                            try {
                                //${moment().format('LL')} 
                                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                                doc.render()
                            }
                            catch (error) {
                                var e = {
                                    message: error.message,
                                    name: error.name,
                                    stack: error.stack,
                                    properties: error.properties,
                                }
                                console.log(JSON.stringify({ error: e }));
                                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                                throw error;
                            }

                            var buf = doc.getZip()
                                .generate({ type: 'nodebuffer' });

                            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
                            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/dictamenes_word/${_periodo.id}.docx`), buf);
                            // fs.href="/plantillas/solicitud.docx";
                            // const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/dictamen.docx`)
                            // var pdf = fs.readFileSync(ruta_pdf);
                            // res.contentType("application/docx");
                            // res.send(pdf);


                            /////////////////////////////777
                            res.status(200).json("todo bien brous");

                        })
                })

        })

    }).then((_subdirector) => {
        res.status(200).json(_subdirector);
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

}


module.exports.getDictamenWord = (req, res) => {
    const filename = req.params.id;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/dictamenes_word/${filename}.docx`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/docx");
    res.send(pdf);
}


module.exports.generarSituacionWord = (req, res) => {
    const id_alumno = req.params.id;
    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/comprobante.docx'), 'binary');
    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);


    sequelize.transaction(t => {
        return Alumno.findOne({ where: { id: id_alumno }, include: [{ model: situacion, as: 'situacion', include: [{ model: Docente, as: 'jefe_division' }] }] }).then(alumno => {
            console.log(alumno.situacion[0].cd)
            doc.setData({
                residente: alumno.nombre + " " + alumno.ap_paterno + " " + alumno.ap_materno,
                fecha: moment().format('LL'),
                de1: alumno.situacion[0].cd ? '✓' : '',
                d2: alumno.situacion[0].liberacion_asesor_interno ? '✓' : '',
                d3: alumno.situacion[0].liberacion_asesor_externo ? '✓' : '',
                d4: alumno.situacion[0].carta_presentacion_agradecimientos ? '✓' : '',
                d5: alumno.situacion[0].copia_evaluacion ? '✓' : '',
                d6: alumno.situacion[0].portadas ? '✓' : '',
                jefe: alumno.situacion[0].jefe_division.titulo + "" + alumno.situacion[0].jefe_division.nombre + " " + alumno.situacion[0].jefe_division.ap_paterno + " " + alumno.situacion[0].jefe_division.ap_materno,

            });

            try {
                //${moment().format('LL')} 
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                throw error;
            }

            var buf = doc.getZip()
                .generate({ type: 'nodebuffer' });

            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/comprobante.docx`), buf);
            // fs.href="/plantillas/solicitud.docx";
            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/comprobante.docx`)
            var pdf = fs.readFileSync(ruta_pdf);
            res.contentType("application/docx");
            res.send(pdf);
        })


    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })
}


module.exports.reporteGeneralPorPeriodoword = (req, res) => {
    const periodo = req.params.id_periodo, ciclo = req.params.id_carrera;
    // console.log(id_carrera)
    filterPeriodo = {
        periodo: periodo,
        $and: [
            { ciclo: ciclo }
        ]
    }
    var content = fs
        .readFileSync(path.resolve(__dirname, '../word/periodo.docx'), 'binary');
    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);
    sequelize.transaction(t => {
        return Anteproyecto.findAll({ include: [{ model: Periodo, as: 'periodo', where: filterPeriodo }, { model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }, { transaction: t }).then(situaciones => {
            Array.prototype.unique = function (a) {
                return function () { return this.filter(a) }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            var carreras = [];
            var tabla = [];

            situaciones.map((anteproyecto, key) => {

                carreras.push(anteproyecto.alumno.carrera.nombre);


            });
            carreras = carreras.unique();
           var ciclo1=situaciones[0].periodo.ciclo
          var periodo1=situaciones[0].periodo.periodo
            var hombres = 0, mujeres = 0;
            carreras.forEach(function (valor, indice, array) {
                console.log("En el índice " + indice + " hay este valor: " + valor);
                var aux = true, hombre = 0, mujer = 0;
                situaciones.map((anteproyecto, key) => {

                    if (anteproyecto.alumno.carrera.nombre === valor) {

                        anteproyecto.alumno.sexo === 'H' ? hombre += 1 : mujer += 1
                    }



                })
                hombres += hombre;
                mujeres += mujer;
                tabla.push(
                    {
                        carrera: valor, nombre: hombre, mujer: mujer, to: hombre + mujer,
                       
                    }

                )
            });
            doc.setData({
                carreras: tabla,
                nombres: hombres,
                mujeres: mujeres,
                total: hombres + mujeres,
                ciclo: ciclo1, periodo: periodo1,
            });

            try {
                //${moment().format('LL')} 
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                throw error;
            }

            var buf = doc.getZip()
                .generate({ type: 'nodebuffer' });

            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/reporte_periodo.docx`), buf);
            // fs.href="/plantillas/solicitud.docx";
            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/reporte_periodo.docx`)
            var pdf = fs.readFileSync(ruta_pdf);
            res.contentType("application/docx");
            res.send(pdf);

        })


    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}

module.exports.reporteGeneralPorcicloword = (req, res) => {
    const ciclo = req.params.ciclo;
    // console.log(id_carrera)
    var content = fs
    .readFileSync(path.resolve(__dirname, '../word/ciclo.docx'), 'binary');
var zip = new JSZip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);
    sequelize.transaction(t => {
        return Anteproyecto.findAll({ include: [{ model: Periodo, as: 'periodo', where: { ciclo } }, { model: Alumno, as: 'alumno', include: [{ model: Carrera, as: 'carrera' }] }] }, { transaction: t }).then(situaciones => {
            var tabla = [];

            Array.prototype.unique = function (a) {
                return function () { return this.filter(a) }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            var carreras = [];
            situaciones.map((anteproyecto, key) => {
    
                carreras.push(anteproyecto.alumno.carrera.nombre);
    
    
            });
            carreras = carreras.unique();
            var hombresFebrero = 0, hombresAgosto = 0, mujeresFebrero = 0, mujeresAgosto = 0, hombres = 0, mujeres = 0;
            carreras.forEach(function (valor, indice, array) {
                console.log("En el índice " + indice + " hay este valor: " + valor);
                var aux = true, hombre = 0, mujer = 0, hombre2 = 0, mujer2 = 0;
                situaciones.map((anteproyecto, key) => {
    
                    if (anteproyecto.alumno.carrera.nombre === valor) {
                        anteproyecto.alumno.sexo === 'H' && anteproyecto.periodo.periodo === 'FEBRERO-JUNIO' ? hombre += 1 : ''
                        anteproyecto.alumno.sexo === 'M' && anteproyecto.periodo.periodo === 'FEBRERO-JUNIO' ? mujer += 1 : ''
                        anteproyecto.alumno.sexo === 'H' && anteproyecto.periodo.periodo === 'AGOSTO-DICIEMBRE' ? hombre2 += 1 : ''
                        anteproyecto.alumno.sexo === 'M' && anteproyecto.periodo.periodo === 'AGOSTO-DICIEMBRE' ? mujer2 += 1 : ''
                    }
    
    
    
                })
                hombres += hombre;
                mujeres += mujer;
                tabla.push(
                    {carrera:valor,h1:hombre,m1:mujer,h2:hombre2,m2:mujer2,h3:hombre+hombre2,m3: mujer+mujer2,t:mujer+mujer2+hombre+hombre2}
                    // [
                    //     { text: `${valor}`, style: 'row_table', alignment: 'left' },
                    //     { text: `${hombre}`, style: 'row_table' },
                    //     { text: `${mujer}`, style: 'row_table' },
                    //     { text: ``, style: 'row_table', fillColor: '#d7d9db' },
                    //     { text: `${hombre2}`, style: 'row_table' },
                    //     { text: `${mujer2}`, style: 'row_table' },
                    //     { text: ``, style: 'row_table', fillColor: '#d7d9db' },
                    //     { text: `${hombre + hombre2}`, style: 'row_table' },
                    //     { text: `${mujer + mujer2}`, style: 'row_table' },
                    //     { text: `${mujer + mujer2+hombre+hombre2}`, style: 'row_table' }
    
    
                    // ]
                )
                hombresFebrero += hombre;
                hombresAgosto += hombre2;
                mujeresFebrero += mujer;
                mujeresAgosto += mujer2;
            });
    
            doc.setData({
                carreras:tabla,
                th1:hombresFebrero,
                tm1:mujeresFebrero,
                th2:hombresAgosto,
                tm2:mujeresAgosto,
                th3:hombresFebrero+hombresAgosto,
                tm3:mujeresAgosto+mujeresFebrero,
                t2:hombresAgosto+hombresFebrero+mujeresAgosto+mujeresFebrero,
                ciclo:ciclo,
                
            });

            try {
                //${moment().format('LL')} 
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                throw error;
            }

            var buf = doc.getZip()
                .generate({ type: 'nodebuffer' });

            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/reporte_ciclo.docx`), buf);
            // fs.href="/plantillas/solicitud.docx";
            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/reporte_ciclo.docx`)
            var pdf = fs.readFileSync(ruta_pdf);
            res.contentType("application/docx");
            res.send(pdf);

        })
        

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })
}

module.exports.solicitudProrrogaWord = (req, res) => {
    const id_alumno = req.params.id;
    // console.log(id_carrera)
    var content = fs
    .readFileSync(path.resolve(__dirname, '../word/solicitudp.docx'), 'binary');
var zip = new JSZip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);
    sequelize.transaction(t => {
        return Anteproyecto.findOne({where:{id_alumno}, include: [{ model: Periodo, as: 'periodo'}, { model: Alumno, as: 'alumno', include: [{model: Usuario, as: 'usuario'},{ model: Carrera, as: 'carrera' },{ model: situacion, as: 'situacion', include: [{ model: Docente, as: 'jefe_division' }] }] }] }, { transaction: t }).then(anteproyecto => {
    
            doc.setData({
             jefe:anteproyecto.alumno.situacion[0].jefe_division.titulo+""+anteproyecto.alumno.situacion[0].jefe_division.nombre+" "+ anteproyecto.alumno.situacion[0].jefe_division.ap_paterno+" "+anteproyecto.alumno.situacion[0].jefe_division.ap_materno,
             alumno:anteproyecto.alumno.nombre+" "+anteproyecto.alumno.ap_paterno+" "+anteproyecto.alumno.ap_materno,
             carrera:anteproyecto.alumno.carrera.nombre,
             no_control:anteproyecto.alumno.no_control,
             casa:anteproyecto.alumno.numero_celular,
             email:anteproyecto.alumno.usuario.correo,
             fecha: moment().format('LL'),

                
            });

            try {
                //${moment().format('LL')} 
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                throw error;
            }

            var buf = doc.getZip()
                .generate({ type: 'nodebuffer' });

            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/solicitud_prorroga.docx`), buf);
            // fs.href="/plantillas/solicitud.docx";
            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/solicitud_prorroga.docx`)
            var pdf = fs.readFileSync(ruta_pdf);
            res.contentType("application/docx");
            res.send(pdf);

        })
        

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}

module.exports.oficioProrrogaWord = (req, res) => {
    const id_alumno = req.params.id;
    // console.log(id_carrera)
    var content = fs
    .readFileSync(path.resolve(__dirname, '../word/oficiop.docx'), 'binary');
var zip = new JSZip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);
    sequelize.transaction(t => {
        return Anteproyecto.findOne({where:{id_alumno}, include: [{model:Docente, as:'asesor_interno'},{ model: Periodo, as: 'periodo'}, { model: Alumno, as: 'alumno', include: [{model: Usuario, as: 'usuario'},{ model: Carrera, as: 'carrera', include:[{model: Departamento, as:'departamento', include:[{model: Docente, as:'docentes',include:[{model:Usuario,as:'usuario',where:{rol:'jefe_departamento'}}]}]}] },{ model: situacion, as: 'situacion', include: [{ model: Docente, as: 'jefe_division' }] }] }] }, { transaction: t }).then(anteproyecto => {
                  var periodo= anteproyecto.periodo.periodo.split('-');
            doc.setData({
             p:periodo[0].substr(0,1)+""+periodo[1].substr(0,1),
             c:anteproyecto.periodo.ciclo.substr(2,4),
             jefe_division:anteproyecto.alumno.situacion[0].jefe_division.titulo+""+anteproyecto.alumno.situacion[0].jefe_division.nombre+" "+ anteproyecto.alumno.situacion[0].jefe_division.ap_paterno+" "+anteproyecto.alumno.situacion[0].jefe_division.ap_materno,
             alumno:anteproyecto.alumno.nombre+" "+anteproyecto.alumno.ap_paterno+" "+anteproyecto.alumno.ap_materno,
             carrera:anteproyecto.alumno.carrera.nombre,
             no_control:anteproyecto.alumno.no_control,
             plan_estudios:anteproyecto.alumno.plan_estudios,
             proyecto:anteproyecto.nombre,
             asesor_interno:anteproyecto.asesor_interno.titulo+""+anteproyecto.asesor_interno.nombre+" "+anteproyecto.asesor_interno.ap_paterno+" "+anteproyecto.asesor_interno.ap_materno,
             fecha: moment().format('LL'),
             departamento:anteproyecto.alumno.carrera.departamento.nombre,
             jefe:anteproyecto.alumno.carrera.departamento.docentes[0].titulo+""+anteproyecto.alumno.carrera.departamento.docentes[0].nombre+" "+anteproyecto.alumno.carrera.departamento.docentes[0].ap_paterno+" "+anteproyecto.alumno.carrera.departamento.docentes[0].ap_materno,

                
            });

            try {
                //${moment().format('LL')} 
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).  ksks
                throw error;
            }

            var buf = doc.getZip()
                .generate({ type: 'nodebuffer' });

            // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve(__dirname, `../../storeFiles/solicitud/oficio_prorroga.docx`), buf);
            // fs.href="/plantillas/solicitud.docx";
            const ruta_pdf = path.join(__dirname, `../../storeFiles/solicitud/oficio_prorroga.docx`)
            var pdf = fs.readFileSync(ruta_pdf);
            res.contentType("application/docx");
            res.send(pdf);

        })
        

    }).catch(err => {
        console.log(err);
        res.status(406).json({ err: err });
    })


}