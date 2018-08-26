'use strict';
module.exports = (sequelize, DataTypes) => {
  var colaboracion = sequelize.define('colaboracion', {
    idalumno: {
      type: DataTypes.INTEGER,
     },
    idcolaborador: {
      type: DataTypes.INTEGER,
     }

  }, {});
  colaboracion.associate = function(models) {
    
    colaboracion.belongsTo(models.Alumno,{
      foreignKey: 'idalumno',
 
      as: 'alumnoid'
    }),
    colaboracion.belongsTo(models.Alumno,{
      foreignKey:'idcolaborador',
 
      as: 'colaboradores'
    })  
  };
  return colaboracion;
};