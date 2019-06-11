'use strict';
module.exports = (sequelize, DataTypes) => {
  var subactividades = sequelize.define('subactividades', {
    id_orden:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actividad: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
  });

  subactividades.associate = (models) => {
    subactividades.belongsTo(models.actividades_generales, {
      foreignKey: 'id_actividad_general',
      onDelete: 'CASCADE',
      as: 'actividad_general'
    });
    subactividades.hasMany(models.tareas, {
      foreignKey: 'id_subactividad',
      as: 'tareas'
    });
}

return subactividades;
};