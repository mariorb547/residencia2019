'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('colaboracions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idalumno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
      },
      idcolaborador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
      },  createdAt: {
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
    return queryInterface.dropTable('colaboracions');
  }
};