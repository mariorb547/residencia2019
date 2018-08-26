'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Folio_residencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      folio_inicio: {
        type: Sequelize.INTEGER,
       
      },
      folio_termino: {
        type: Sequelize.INTEGER,
        // unique:true,
       
      },
      folio_actual: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      estado:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }, 
      id_folio: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Folios',
          key: 'id',
          as: 'id_folio'
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
    return queryInterface.dropTable('Folio_residencias');
  }
};