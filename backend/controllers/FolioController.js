const Folio = require('../models').Folio;
const Detalle_folio_otros = require('../models').Detalle_folio_otro;
const Detalle_folio_residentes = require('../models').Detalle_folio_residente;
const Folio_residencias = require('../models').Folio_residencias;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;
const Docente = require('../models').Docente;
const Departamento = require('../models').Departamento;
const Usuario = require('../models').Usuario;
const Empresa = require('../models').Empresa;
const Alumno = require('../models').Alumno;
module.exports.add = (req, res) => {
    const anio = req.body.anio;

    ///------
    sequelize.query(`update folios set estado=0 where estado=1`)
        .then(usuarios => {
            sequelize.query(`update folio_residencias set estado=0 `)
                .then(usuarioss => {
                    Folio.create({ ciclo: anio }).then((ciclo) => {
                        res.status(200).json(ciclo)
                    });
                });
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            res.status(202).json({ errores })
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}

module.exports.update = (req, res) => {
    const estado = false;
    Folio.update({
        estado,
    }).then((ciclo) => {
        res.status(200).json(ciclo)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.folios = (req, res) => {

    Folio.findAll()
        .then(folios => {
            // console.log(pues)
            res.status(200).json(folios)
        }).catch(err => {
            res.status(406).json({ err })
        })
}


module.exports.addDetalleFolioOtros = (req, res) => {
    const id_folio = req.body.id_folio,
        numero = req.body.numero, tipo = req.body.tipo, nombre_destinatario = req.body.nombre_destinatario,
        descripcion = req.body.descripcion, id_emisor = req.body.id_emisor, id_empresa = req.body.id_empresa;
    //    console.log(id_folio+"--"+numero+"-"+)

    sequelize.query(`update folios set numero_folio=${numero} where id=${id_folio}`)
        .then(usuarios => {

            Detalle_folio_otros.create({
                numero_de_folio: numero,
                id_folio,
                descripcion,
                tipo,
                nombre_destinatario,
                id_emisor,
                id_empresa

            }).then((otros) => {
                res.status(200).json(otros)
            });

        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            res.status(202).json({ errores })
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}


module.exports.addDetalleFolioResidentes = (req, res) => {
    const id_folio = req.body.id_folio,
        folio_inicio = req.body.folio_inicio, folio_termino = req.body.folio_termino;
    //    console.log(id_folio+"--"+numero+"-"+)

    sequelize.query(`update folios set numero_folio=${(folio_termino-1)} where id=${id_folio}`)
        .then(usuarios => {
            sequelize.query(`update folio_residencias set estado=0 where id_folio=${id_folio}`)
                .then(usuarioss => {

                    Folio_residencias.create({

                        id_folio,
                        folio_inicio:parseInt(folio_inicio)-1,
                        folio_termino:parseInt(folio_termino)-1,
                        folio_actual: parseInt(folio_inicio)-1

                    }).then((otros) => {
                        res.status(200).json(otros)
                    });
                })

        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            res.status(202).json({ errores })
        }).catch((err) => {
            console.log(err)
            res.status(406).json({ err: err })
        })
}

module.exports.generarFolioCartaYAgradecimientos = (req, res) => {
    const id_alumno = req.body.id_alumno;
       
    Detalle_folio_residentes.findOne({ where: { id_alumno } }).then(detalle_folio_residente => {
        detalle_folio_residente ? 
            res.status(200).json(detalle_folio_residente)
            :

            Folio_residencias.findOne({ where: { estado: true } }).then(detalle => {
                 detalle.folio_actual === detalle.folio_termino?
                 res.status(200).json('agotados')
                 :
                sequelize.query(`update folio_residencias set folio_actual=folio_actual+1 where id=${detalle.id}`)
                    .then(usuarios => {
                        Docente.findOne({
                            include: [{ model: Usuario, as: 'usuario',where:{rol:'jefe_departamento'} }, { model: Departamento, as: 'departamento_doce', where: { nombre: 'GESTIÓN TECNOLÓGICA Y VINCULACIÓN' } }]
                        }).then(docente => {

                            Detalle_folio_residentes.create({
                                id_folio_detalle:detalle.id,
                                descripcion:'Carta de presentacion y agradecimientos',
                                numero_de_folio:parseInt(detalle.folio_actual)+1,
                                id_docente:docente.id,
                                id_alumno,
                              

                            }).then((otros) => {
                                res.status(200).json(otros)
                            });
                        })

                    })
            })
    

    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({ errores })
    }).catch((err) => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.folios_otros = (req, res) => {

    Detalle_folio_otros.findAll( {include: [{model: Docente, as: 'emisor'},{model:Empresa, as:'empresa'},{model:Folio, as:'folio'}]})
        .then(folios => {
            // console.log(pues)
            res.status(200).json(folios)
        }).catch(err => {
            res.status(406).json({ err })
        })
}
module.exports.folios_residentes = (req, res) => {

    Detalle_folio_residentes.findAll( {include: [{model: Docente, as: 'docente'},{model:Alumno, as:'alumno'},{model:Folio_residencias, as:'folios',include:[{model:Folio, as:'folio'}]}]})
        .then(folios => {
            // console.log(pues)
            res.status(200).json(folios)
        }).catch(err => {
            res.status(406).json({ err })
        })
}