'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('departamentos', [
      // {
      //   nombre: 'Sistemas y computación',
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   nombre: 'Ciencias de la tierra',
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   nombre: 'Ciencias económico-admisnitrativas',
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      {
        nombre: 'DIVISION DE ESTUDIOS PROFESIONALES',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'GESTIÓN TECNOLÓGICA Y VINCULACIÓN',
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
