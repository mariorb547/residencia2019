'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.addConstraint('colaboracions', ['idalumno'], {
        type: 'FOREIGN KEY',
        name: 'fk_colaboracion_alumno',
        references: {
          table: 'Alumnos',
          field: 'id',
        }
      })
    );
    migrations.push(
      queryInterface.addConstraint('colaboracions', ['idcolaborador'], {
        type: 'FOREIGN KEY',
        name: 'fk_colaborador',
        references: { //Required field
          table: 'Alumnos',
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
      queryInterface.removeConstraint('colaboracion', 'idalumno')
    )
    migrations.push(
      queryInterface.removeConstraint('colaboracion', 'idcolaborador')
    )
    return Sequelize.Promise.all(migrations);
  }
};

