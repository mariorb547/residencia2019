'use strict';
module.exports = (sequelize, DataTypes) => {
  var Convenio = sequelize.define('Convenio', {
    convenio:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      fecha_inicial: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validates: {
          isDate: {msg: 'La fecha inicial debe ser de tipo fecha'}
        }
      },
      fecha_final: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validates: {
          isDate: {msg: 'La fecha final debe ser de tipo fecha'}
        }
      }
      ,
      url_convenio_firmado_digitalizado: {
        type: DataTypes.STRING(300),
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: { msg: 'Debe indicar la url del del convenio' }
        }
      },
  });
  Convenio.associate = (models) => {
    Convenio.belongsTo(models.Empresa, {
      foreignKey: 'id_empresa',
      onDelete: 'CASCADE',
      as: 'empresa'
    });
    Convenio.belongsTo(models.Docente, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente'
    });
    
  }
  return Convenio;
};