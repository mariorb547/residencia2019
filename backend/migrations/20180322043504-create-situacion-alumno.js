'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('situacions', {
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
      idperiodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

      },
      id_jefe_division: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_jefe_division'
        }
      },
      estado: {
        type: Sequelize.ENUM,
        values: ['activo', 'cancelado', 'prorroga', 'termino satisfactoriamente', 'abandonado'],
        allowNull: true,
        defaultValue: 'activo'
      }, numeroseguimientos: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      solicitud_academica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      aprobacion_academica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      cd: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      liberacion_asesor_interno: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      liberacion_asesor_externo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      carta_presentacion_agradecimientos: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      copia_evaluacion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, portadas: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      observacion: {
        type: Sequelize.STRING(500),
        allowNull: true
      }
      , createdAt: {
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
    return queryInterface.dropTable('situacions');
  }
};