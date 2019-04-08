'use strict';
module.exports = (sequelize, DataTypes) => {
  var actividad_general = sequelize.define('actividad_general', {
   
    id_orden:{
      type: DataTypes.STRING(10),
      defaultValue: false
    },
     actividad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    entregable:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
  });
  actividad_general.associate = (models) => {
    actividad_general.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'Proyecto'
    })
    actividad_general.hasMany(models.subactividades, {
      foreignKey: 'id_actividad_general',
      as: 'subactividades'
    })
  }
  return actividad_general;
};