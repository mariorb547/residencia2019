const Titulo = require('../models').Titulo;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;

module.exports.add = (req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    Titulo.create({
        nombre,
    }).then((titulo) => {
        res.status(200).json(titulo)
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


module.exports.titulos = (req, res) => {
    
    Titulo.findAll()
    .then(titulo => {
        // console.log(pues)
        res.status(200).json(titulo)
    }).catch(err => {
        res.status(406).json({err})
    })
}