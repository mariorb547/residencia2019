'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empresa = sequelize.define('Empresa', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    clasificacion: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['industrial','servicios','público','privado','otro']
    },
    mision: {
      type: DataTypes.STRING(600),
      allowNull: true,
      defaultValue: ''
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    codigo_postal: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    fax: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    convenio:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
       url_documentos_de_validacion: {
        type: DataTypes.STRING(300),
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: { msg: 'Debe indicar la url del del convenio' }
        }
      },
      correo:{ 
        type: DataTypes.STRING,
        allowNull: true
        ,
        unique: true,
        validate: {
            isEmail: {msg: 'Debe tener un formato de email.'},
            notEmpty: {msg: 'El campo debe tener un valor'}
        }
      },
  });
  Empresa.associate = (models) => {
    Empresa.hasMany(models.asesor_externo, {
      foreignKey: 'id_empresa',
      as: 'asesor_externos'
    });
    Empresa.hasMany(models.Convenio, {
      foreignKey: 'id_empresa',
      as: 'convenioss'
    });
    Empresa.belongsTo(models.Titular, {
      foreignKey: 'id_titular',
      as: 'titular'
    });
    Empresa.belongsTo(models.Titular, {
      foreignKey: 'id_representante_legal',
      as: 'representante_legal'
    });
    Empresa.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
      as: 'usuario',
    });
  
 
  }
  return Empresa;
};