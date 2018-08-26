'use strict';
module.exports = (sequelize, DataTypes) => {
  var pre_registro = sequelize.define('pre_registro', {
    no_control: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: {msg: 'El numero de control debe ser numerico'},
        notEmpty: {msg: 'El campo no debe estar vacio'},
        len: [8,8]
      }
    }, nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    ap_materno: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    }, correo:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: {msg: 'Debe tener un formato de email.'},
          notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },estado:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
  pre_registro.associate = function(models) {
    pre_registro.belongsTo(models.Carrera, {
      foreignKey: 'id_carrera',
      onDelete: 'CASCADE',
      as: 'carreraPre'
    })
  };
  return pre_registro;
};