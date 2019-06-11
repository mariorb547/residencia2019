'use strict';
module.exports = (sequelize, DataTypes) => {
  var tareas = sequelize.define('tareas', {
    id_orden:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tarea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'},
        }
      },
      entregable: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'},
        }
      },
      fecha_entrega: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        }
      }, 
      estado_revision_plan: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['revision', 'aprobado','no_aprobado'],
        defaultValue: 'revision'
      },
      estado_revision_semanal: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['revision', 'aprobado','no aprobado'],
        defaultValue: 'revision'
      },
      estado_revision_mensual: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['revision', 'aprobado','no aprobado'],
        defaultValue: 'revision'
      },
  });

  tareas.associate = (models) => {
    tareas.belongsTo(models.subactividades, {
      foreignKey: 'id_subactividad',
      onDelete: 'CASCADE',
      as: 'subactividades'
    });
    tareas.hasMany(models.observaciones, {
        foreignKey: 'id_tarea',
        as: 'observaciones'
      });
      tareas.hasMany(models.evidencias, {
        foreignKey: 'id_tarea',
        as: 'evidencias'
      });
   
}

return tareas;
};