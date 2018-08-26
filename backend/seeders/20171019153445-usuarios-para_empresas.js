'use strict';
const bCrypt = require('bcrypt-nodejs');
const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        // empienza en id_usuario 13
        correo: 'contacto@itchilpancingo.edu.mx',
        rol: 'empresa',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // {
      //   correo: 'empresa2@gmail.com',
      //   rol: 'empresa',
      //   contrasenia: generateHash('123456'),
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   correo: 'empresa3@gmail.com',
      //   rol: 'empresa',
      //   contrasenia: generateHash('123456'),
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   correo: 'empresa4@gmail.com',
      //   rol: 'empresa',
      //   contrasenia: generateHash('123456'),
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      
      
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
