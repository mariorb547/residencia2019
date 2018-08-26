'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pre_registros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_control: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },  nombre: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      ap_paterno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      ap_materno: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      correo:{ 
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      },estado:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      id_carrera: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'carreras',
          key: 'id',
          as: 'id_carrera'
        }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pre_registros');
  }
};


