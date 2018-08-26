'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Detalle_folio_otros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_de_folio: {
        type: Sequelize.INTEGER,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombre_destinatario: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_emisor: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_emisor'
        }
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
      }, id_empresa: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // unique: true,
        allowNull: false,
        references: {
          model: 'Empresas',
          key: 'id',
          as: 'id_empresa'
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
    return queryInterface.dropTable('Detalle_folio_otros');
  }
};