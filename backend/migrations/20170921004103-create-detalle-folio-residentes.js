'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Detalle_folio_residentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_de_folio: {
        type: Sequelize.INTEGER,
      },
      id_docente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_docente'
        }
      },   
      id_alumno: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Alumnos',
          key: 'id',
          as: 'id_alumno'
        }
      }, id_folio_detalle: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Folio_residencias',
          key: 'id',
          as: 'id_folio_detalle'
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
    return queryInterface.dropTable('Detalle_folio_residentes');
  }
};