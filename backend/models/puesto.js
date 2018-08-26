'use strict';
module.exports = (sequelize, DataTypes) => {
  var Puesto = sequelize.define('Puesto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    
  });
 
  return Puesto;
};