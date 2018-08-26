'use strict';
module.exports = (sequelize, DataTypes) => {
  var Titulo = sequelize.define('Titulo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    
  });
 
  return Titulo;
};