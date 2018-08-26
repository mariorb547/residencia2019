'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Convenios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      convenio:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      fecha_inicial: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      fecha_final: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
     
      url_convenio_firmado_digitalizado: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Empresas',
          key: 'id',
          as: 'id_empresa'
        }
      },
      id_docente:{ 
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_docente'
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
    return queryInterface.dropTable('Convenios');
  }
};