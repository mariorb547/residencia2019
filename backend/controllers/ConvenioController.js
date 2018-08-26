 
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const Convenio = require('../models').Convenio


module.exports.ConvenioActualizacion = (req, res) => {
    // console.log(req.body);
    const id=req.body.id_convenio, fecha_inicial= req.body.fecha_inicial,
    fecha_final= req.body.fecha_final

    sequelize.transaction( t => {
        return Convenio.update({  fecha_inicial,fecha_final},{where:{id}}, {transaction: t})
    }).then(convenio => {
        res.status(200).json(convenio)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.actualizarconvenio = (req, res) => {
    // console.log(req.body);
    const fecha= req.body.currentDate;
//    console.log(fecha+"------------------------------")
    sequelize.query(`update convenios set convenio=0 where fecha_final<='${fecha}';` )
    .then((convenio) => {
        res.status(200).json(convenio);
    }).catch(err => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}   

module.exports.eliminarvacios  = (req, res) => {
 
    sequelize.query(`delete from empresas where id_titular is null ;` )
    .then((convenio) => {
        res.status(200).json(convenio);
    }).catch(err => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}

module.exports.eliminarvaciosconvenios  = (req, res) => {
 
    sequelize.query(`delete from convenios where fecha_inicial is null  and fecha_final is null;` )
    .then((convenio) => {
        res.status(200).json(convenio);
    }).catch(err => {
        console.log(err)
        res.status(406).json({ err: err })
    })
}