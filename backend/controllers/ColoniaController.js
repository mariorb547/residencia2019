const Colonia = require('../models').Colonia;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;

module.exports.add = (req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    Colonia.create({
        nombre,
    }).then((colonia) => {
        res.status(200).json(colonia)
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


module.exports.colonias = (req, res) => {
    
    Colonia.findAll()
    .then(colonias => {
        // console.log(pues)
        res.status(200).json(colonias)
    }).catch(err => {
        res.status(406).json({err})
    })
}