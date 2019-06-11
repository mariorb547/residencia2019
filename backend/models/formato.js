'use strict';
'use strict';
module.exports = (sequelize, DataTypes) => {
  var formatos = sequelize.define('formato', {
    semana: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    url_formato: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
  });
  formatos.associate = (models) => {
    formatos.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'Proyecto'
    })
   
  }
  return formatos;
};