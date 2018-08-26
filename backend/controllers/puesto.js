const Puesto = require('../models').Puesto;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;

module.exports.add = (req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    Puesto.create({
        nombre,
    }).then((puesto) => {
        res.status(200).json(puesto)
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


module.exports.puestos = (req, res) => {
    
    Puesto.findAll()
    .then(puestos => {
        // console.log(pues)
        res.status(200).json(puestos)
    }).catch(err => {
        res.status(406).json({err})
    })
}