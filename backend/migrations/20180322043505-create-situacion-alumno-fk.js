'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.addConstraint('situacions', ['idalumno'], {
        type: 'FOREIGN KEY',
        name: 'fk_sitiacion_alumno',
        references: {
          table: 'Alumnos',
          field: 'id',
        }
      })
    );
    migrations.push(
      queryInterface.addConstraint('situacions', ['idperiodo'], {
        type: 'FOREIGN KEY',
        name: 'fk_situacion_periodo',
        references: { //Required field
          table: 'Periodos',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    );
    return Sequelize.Promise.all(migrations);
  },

  down: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.removeConstraint('situacions', 'idalumno')
    )
    migrations.push(
      queryInterface.removeConstraint('situacions', 'idperiodo')
    )
    return Sequelize.Promise.all(migrations);
  }
};

