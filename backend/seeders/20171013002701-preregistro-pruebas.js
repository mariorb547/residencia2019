'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Pre_registros', [
      {
        no_control: '13520541',
        nombre: 'FRANCISCO',
        ap_paterno: 'ARCOS',
        ap_materno: 'JAIMES',
        correo: 'farcosj51@gmail.com',
        estado: true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }, {
        no_control: '13520050',
        nombre: 'OSCAR FRANCISCO',
        ap_paterno: 'HERRERA',
        ap_materno: 'VAZQUEZ',
        correo: 'oscar33@gmail.com',
        estado: true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }, {
        no_control: '13520451',
        nombre: 'RAFAEL  DE JESUS',
        ap_paterno: 'REBOLLEDO',
        ap_materno: 'HERNANDEZ',
        correo: 'rafa@gmail.com',
        estado: true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520520',
        nombre: 'RODRIGO',
        ap_paterno: 'REYES',
        ap_materno: 'HERNANDEZ',
        correo: 'rodrigo@gmail.com',
        estado:true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520123',
        nombre: 'OSVALDO DANIEL',
        ap_paterno: 'AMADOR',
        ap_materno: 'SALINAS',
        correo: 'gorda@gmail.com',
        estado:true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520450',
        nombre: 'ISAI',
        ap_paterno: 'ARCOS',
        ap_materno: 'SOLANO',
        correo: 'isai@gmail.com',
        estado: true,
        id_carrera:5, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520200',
        nombre: 'ANA',
        ap_paterno: 'BELTRAN',
        ap_materno: 'LEYBA',
        correo: 'ana@gmail.com',
        estado: true,
        id_carrera:1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      ,





      {
        no_control: '13520124',
        nombre: 'ANA CECILIA',
        ap_paterno: 'PASTOR',
        ap_materno: 'RENTERIA',
        correo: 'apr@gmail.com',
        estado: true,
        id_carrera:2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }, {
        no_control: '13520125',
        nombre: 'OSCAR DANIEL',
        ap_paterno: 'HERRERA',
        ap_materno: 'VAZQUEZ',
        correo: 'oscar2@gmail.com',
        estado: true,
        id_carrera:2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }, {
        no_control: '13520126',
        nombre: 'RAFAEL  DE JESUS',
        ap_paterno: 'BELTRAN',
        ap_materno: 'HERNANDEZ',
        correo: 'rafa2@gmail.com',
        estado: true,
        id_carrera:2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520128',
        nombre: 'RODRIGO FERNANDO',
        ap_paterno: 'REYES',
        ap_materno: 'HERNANDEZ',
        correo: 'rodrigo2@gmail.com',
        estado:true,
        id_carrera:2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520501',
        nombre: 'OSVALDO JESUS',
        ap_paterno: 'AMADOR',
        ap_materno: 'SALINAS',
        correo: 'gorda1@gmail.com',
        estado:true,
        id_carrera:2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520455',
        nombre: 'ISAIAS',
        ap_paterno: 'ARCOS',
        ap_materno: 'SOLANO',
        correo: 'isai2@gmail.com',
        estado: true,
        id_carrera:3, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        no_control: '13520210',
        nombre: 'ANALIA',
        ap_paterno: 'BELTRAN',
        ap_materno: 'LEYBA',
        correo: 'ana2@gmail.com',
        estado: true,
        id_carrera:4, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
