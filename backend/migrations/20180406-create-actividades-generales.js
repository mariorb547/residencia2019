'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actividades_generales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },id_orden: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      actividad: {
        type: Sequelize.STRING(400),
        allowNull: true,
      },
      objetivo: {
        type: Sequelize.STRING(400),
        defaultValue: false
      },
     entregable: {
        type: Sequelize.STRING(400),
        allowNull: true,
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Proyectos',
          key: 'id',
          as: 'id_Proyecto'
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
    return queryInterface.dropTable('actividades_generales');
  }
};