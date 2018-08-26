'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente_oficinas = sequelize.define('docente_oficinas', {
    rol: {
      type: DataTypes.ENUM,
      values: ['docente', 'deshabilitado','encargado'],
      allowNull: false
    }
  }, {indexes: [{unique: true, fields: ['id_docente', 'rol']}]});

  docente_oficinas.associate = (models) => {
    docente_oficinas.belongsTo(models.Docente, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente'
    })

    
    docente_oficinas.belongsTo(models.Oficina, {
      foreignKey: 'id_oficina',
      onDelete: 'CASCADE',
      as: 'oficina'
    })
  }
  return docente_oficinas;
};