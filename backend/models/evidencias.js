'use strict';
module.exports = (sequelize, DataTypes) => {
  var evidencias = sequelize.define('evidencias', {
    filename_evidencia:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  
  evidencias.associate = (models) => {
    evidencias.belongsTo(models.tareas, {
      foreignKey: 'id_tarea',
      onDelete: 'CASCADE',
      as: 'tareas'
    });
  }
  return evidencias;
};