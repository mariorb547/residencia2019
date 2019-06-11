'use strict';
'use strict';
module.exports = (sequelize, DataTypes) => {
  var actividades_generales = sequelize.define('actividades_generales', {
    id_orden:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
  actividades_generales.associate = (models) => {
    actividades_generales.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'Proyecto'
    })
    actividades_generales.hasMany(models.subactividades, {
      foreignKey: 'id_actividad_general',
      as: 'subactividades'
    })
  }
  return actividades_generales;
};