'use strict';
module.exports = (sequelize, DataTypes) => {
    var Folio_residencias = sequelize.define('Folio_residencias', {
          
        folio_inicio: {
            type: DataTypes.INTEGER
        },
        folio_termino: {
            type: DataTypes.INTEGER,
           
        },
        folio_actual: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
          }
    });
    Folio_residencias.associate = (models) => {
        Folio_residencias.belongsTo(models.Folio, {
            foreignKey: 'id_folio',
            onDelete: 'CASCADE',
            as: 'folio'
        });
    }
    return Folio_residencias;
};