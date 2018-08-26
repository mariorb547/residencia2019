'use strict';
module.exports = (sequelize, DataTypes) => {
  var Colonia = sequelize.define('Colonia', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    
  });
 
  return Colonia;
};