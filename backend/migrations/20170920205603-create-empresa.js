'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: true,
        unique: true
      },
      clasificacion: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['industrial', 'servicios', 'público', 'privado', 'otro']
      },
      rfc: {
        type: Sequelize.STRING(13),
        allowNull: true,
        defaultValue: null
      },
      domicilio: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null

      },
      colonia: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      mision: {
        type: Sequelize.STRING(600),
        allowNull: false,
        defaultValue: ''
      },
      codigo_postal: {
        type: Sequelize.STRING(5),
        allowNull: true,
        defaultValue: null
      },
      fax: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      },telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
      },
      convenio: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, url_documentos_de_validacion: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null
      },
      correo: {
        type: Sequelize.STRING(60),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      id_titular: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      id_representante_legal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('Empresas');
  }
};