'use strict';
module.exports = (sequelize, DataTypes) => {
  var Docente = sequelize.define('Docente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_materno:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    titulo:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    }
  }
  );
  Docente.associate = (models) => {
    Docente.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
      as: 'usuario',
    });
    Docente.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      onDelete: 'CASCADE',
      as:'departamento_doce'
    })

    Docente.hasMany(models.docente_carreras, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente_carrera'
    });
    Docente.hasMany(models.docente_oficinas, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente_oficina'
    });
  }
  return Docente;
};