const Empresa = require('../models').Empresa
const Titular = require('../models').Titular
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const asesor_externo = require('../models').asesor_externo
const Convenio = require('../models').Convenio
const generator = require('generate-password');
const transporter = require('../../config/email');
const Usuario = require('../models').Usuario;

module.exports.findAll = (req, res) => {
    // {include: [{model: asesor_externo, as: 'asesores_externos'}]}...
    Empresa.findAll({ include: [{ model: asesor_externo, as: 'asesor_externos' }, { model: Convenio, as: 'convenioss' }, { model: Titular, as: 'titular' }, { model: Titular, as: 'representante_legal' }] })
        .then(empresas => {

            res.status(200).json({ empresas })
        }).catch(err => {
            res.status(406).json({ err })
        })
}



module.exports.directorio = (req, res) => {
    // {include: [{model: asesor_externo, as: 'asesores_externos'}]}...
    Empresa.findAll()
        .then(empresas => {

            res.status(200).json(empresas)
        }).catch(err => {
            res.status(406).json({ err })
        })
}

module.exports.add = (req, res) => {
    // console.log(req.body);
    const nombre = req.body.nombre,
        clasificacion = req.body.clasificacion,
        rfc = req.body.rfc,
        domicilio = req.body.domicilio.toUpperCase() || '',
        colonia = req.body.colonia.toUpperCase() || '',
        codigo_postal = req.body.codigo_postal || '',
        fax = req.body.fax || '',
        mision = req.body.mision.toUpperCase() || '',
        puesto_titular = req.body.puesto_titular.toUpperCase(),
        titulo_titular = req.body.titulo_titular.toUpperCase(),
        nombre_titular = req.body.nombre_titular.toUpperCase(),
        titulo_firma_acuerdo = req.body.titulo_firma_acuerdo.toUpperCase(),
        puesto_firma_acuerdo = req.body.puesto_firma_acuerdo.toUpperCase(),
        nombre_firma_acuerdo = req.body.nombre_firma_acuerdo.toUpperCase();

    sequelize.transaction(t => {
        return Titular.create({ titulo: titulo_titular, nombre: nombre_titular, puesto: puesto_titular }, { transaction: t })
            .then(titular => {
                return Titular.create({ titulo: titulo_firma_acuerdo, nombre: nombre_firma_acuerdo, puesto: puesto_firma_acuerdo }, { transaction: t })
                    .then(firma_acuerdo => {
                        return Empresa.create({
                            nombre,
                            clasificacion,
                            rfc,
                            domicilio,
                            colonia,
                            codigo_postal,
                            fax,
                            mision,
                            id_titular: titular.id,
                            id_representante_legal: firma_acuerdo.id
                        }, { transaction: t })
                    })
            })
    }).then(empresa => {
        res.status(200).json(empresa)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}

module.exports.update = (req, res) => {
    console.log(req.body);
    const id = req.params.id,
        rfc = req.body.rfc,
        domicilio = req.body.domicilio.toUpperCase() || '',
        colonia = req.body.colonia.toUpperCase() || '',
        codigo_postal = req.body.codigo_postal || '',
        fax = req.body.fax || '',
        mision = req.body.mision.toUpperCase() || '',
        id_titular = req.body.id_titular,
        titulo_titular = req.body.titulo_titular.toUpperCase(),
        puesto_titular = req.body.puesto_titular.toUpperCase(),
        nombre_titular = req.body.nombre_titular.toUpperCase(),
        id_firma_acuerdo = req.body.id_firma_acuerdo
    titulo_firma_acuerdo = req.body.titulo_firma_acuerdo.toUpperCase(),
        puesto_firma_acuerdo = req.body.puesto_firma_acuerdo.toUpperCase(),
        nombre_firma_acuerdo = req.body.nombre_firma_acuerdo.toUpperCase()
    sequelize.transaction(t => {
        return Titular.update({ titulo: titulo_titular, nombre: nombre_titular, puesto: puesto_titular }, { where: { id: id_titular }, transaction: t })
            .then(titular => {
                return Titular.update({ titulo: titulo_firma_acuerdo, nombre: nombre_firma_acuerdo, puesto: puesto_firma_acuerdo }, { where: { id: id_firma_acuerdo }, transaction: t })
                    .then(representate => {
                        return Empresa.update({
                            rfc,
                            domicilio,
                            colonia,
                            codigo_postal,
                            fax,
                            mision,
                        }, { where: { id } });
                    })
            })
    }).then(empresa => {
        res.status(200).json(empresa)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}


module.exports.convenio = (req, res) => {
    var id = req.body.id, convenio = req.body.estado
    return Empresa.update({ convenio }, { where: { id } }).then(sit => {
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

module.exports.verificar = (req, res) => {
    const id = req.params.id
    Empresa.findOne({
        where: { id }
    }).then((empresa) => {
        res.status(200).json(empresa);
    }).catch(err => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}


module.exports.addConvenio = (req, res) => {
    // console.log(req.body);
    const
        id_empresa = req.body.id_empresa,
        id_docente = req.body.id_docente

    sequelize.transaction(t => {
        return Convenio.create({ id_empresa, id_docente }, { transaction: t })
    }).then(convenio => {
        res.status(200).json(convenio)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log(errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}
module.exports.addEmpresaNueva = (req, res) => {
    // console.log(req.body);
    // const id_empresa= req.body.id;

    sequelize.transaction(t => {
        return Empresa.create({}, { transaction: t })
    }).then(empresa => {
        res.status(200).json(empresa)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        console.log(errores)
        res.status(202).json({ errores })
    }).catch((err) => {
        res.status(406).json({ err: err })
    })
}

module.exports.actualizarRegistroEmpresa = (req, res) => {
    console.log(req.body);
    const id = req.params.id,
        nombre = req.body.nombre.toUpperCase() || '',
        rfc = req.body.rfc,
        domicilio = req.body.domicilio.toUpperCase() || '',
        colonia = req.body.colonia.toUpperCase() || '',
        codigo_postal = req.body.codigo_postal || '',
        fax = req.body.fax || '',
        mision = req.body.mision.toUpperCase() || '',
        // id_titular = req.body.id_titular,
        titulo_titular = req.body.titulo_titular.toUpperCase(),
        puesto_titular = req.body.puesto_titular.toUpperCase(),
        nombre_titular = req.body.nombre_titular.toUpperCase(),
        // id_firma_acuerdo = req.body.id_firma_acuerdo
        titulo_firma_acuerdo = req.body.titulo_firma_acuerdo.toUpperCase(),
        puesto_firma_acuerdo = req.body.puesto_firma_acuerdo.toUpperCase(),
        nombre_firma_acuerdo = req.body.nombre_firma_acuerdo.toUpperCase(),
        clasificacion = req.body.clasificacion,
        correo = req.body.correo;
        telefono =req.body.telefono
        const contrasenia = generator.generate({length: 8});
        var f=new Date();
        console.log(rfc.charAt(0)+""+rfc.charAt(1)+""+rfc.charAt(2)+""+rfc.charAt(3)+""+f.getDate()+""+f.getMonth()+""+f.getFullYear())
    return Titular.create({ titulo: titulo_titular, nombre: nombre_titular, puesto: puesto_titular })
        .then(titular => {
            return Titular.create({ titulo: titulo_firma_acuerdo, nombre: nombre_firma_acuerdo, puesto: puesto_firma_acuerdo })
                .then(representate => {
                    return Usuario.create({  correo,
                        contrasenia: contrasenia,
                        rol: 'empresa' })
                        .then(usuario => {
                            return Empresa.update({
                                nombre,
                                rfc,
                                clasificacion,
                                domicilio,
                                colonia,
                                codigo_postal,
                                fax,
                                mision,
                                id_titular: titular.id,
                                id_representante_legal: representate.id,
                                correo,
                                telefono,
                                id_usuario:usuario.id,

                            }, { where: { id } })
                        })
                        })
                }).then(empresa => {

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
                    res.status(200).json(empresa)
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