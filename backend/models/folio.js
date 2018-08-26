'use strict';
module.exports = (sequelize, DataTypes) => {
    var Folio = sequelize.define('Folio', {
          
        numero_folio: {
            type: DataTypes.INTEGER,
            defaultValue:0
        }, ciclo: {
            type: DataTypes.INTEGER,
            unique:true,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
          }

       
    });
    // Folio.associate = (models) => {
    //     Folio.belongsTo(models.Periodo, {
    //         foreignKey: 'id_periodo',
    //         onDelete: 'CASCADE',
    //         as: 'folio'
    //     });
    // }
    return Folio;
};