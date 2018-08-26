'use strict';
const bCrypt = require('bcrypt-nodejs');

const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    correo:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: {msg: 'Debe tener un formato de email.'},
          notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },
    rol: {
      type: DataTypes.ENUM, 
      allowNull: false, 
      values: ['candidato_residente','residente','docente','admin','jefe_departamento', 'asesor_externo', 'subdirector_academico', 'empresa', 'nuevo','encargado'],
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },
    path_file_foto:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  });
  Usuario.beforeCreate((usuario, options) => {
        usuario.contrasenia = generateHash(usuario.contrasenia);
  });
  return Usuario;
  
};