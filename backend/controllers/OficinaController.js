const Oficina = require('../models').Oficina;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;

module.exports.add = (req, res) => {
    const nombre = req.body.nombre.toUpperCase(),
        id_departamento = req.body.id_departamento;
    Oficina.create({
        nombre,
        id_departamento
    }).then((oficina) => {
        res.status(200).json(oficina)
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


module.exports.oficinas = (req, res) => {
    const id_departamento= req.params.id;
    console.log('hooallalal')
    Oficina.findAll({where:{id_departamento}})
    .then(oficinas => {
        console.log(oficinas)
        res.status(200).json({oficinas})
    }).catch(err => {
        res.status(406).json({err})
    })
}