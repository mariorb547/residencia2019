'use strict';
module.exports = (sequelize, DataTypes) => {
  const Oficina = sequelize.define('Oficina', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {msg: 'El campo no debe estar vacio'}
        }
    }
  });
  Oficina.associate = (models) => {
    Oficina.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      onDelete: 'CASCADE',
      as: 'departamento'
    });
    
    Oficina.hasMany(models.docente_oficinas, {
      foreignKey: 'id_oficina',
      as: 'docente_oficina'
    }) ;
    
  }
  return Oficina;
};