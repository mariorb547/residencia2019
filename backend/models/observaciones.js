'use strict';
module.exports = (sequelize, DataTypes) => {
  var observaciones = sequelize.define('observaciones', {
    observacion:{
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tipo_observacion: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['plan_de_trabajo','revision_semanal','revision_mensual']
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    estado_alumno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  /*observaciones.associate = (models) => {
    observaciones.belongsTo(models.tareas, {
      foreignKey: 'id_tareas',
      onDelete: 'CASCADE',
      as: 'tareas'
    });
    
  }*/
  observaciones.associate = (models) => {
    observaciones.belongsTo(models.tareas, {
      foreignKey: 'id_tarea',
      onDelete: 'CASCADE',
      as: 'tareas'
    });
    observaciones.belongsTo(models.subactividades, {
      foreignKey: 'id_tarea',
      onDelete: 'CASCADE',
      as: 'subactividades'
    });
    observaciones.belongsTo(models.actividades_generales, {
      foreignKey: 'id_tarea',
      onDelete: 'CASCADE',
      as: 'actividades_generales'
    });
    observaciones.belongsTo(models.Docente, {
      foreignKey: 'id_asesor_interno',
      onDelete: 'CASCADE',
      as: 'asesor_interno'
    });
    
  }
  return observaciones;
};