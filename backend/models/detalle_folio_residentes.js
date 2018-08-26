'use strict';
module.exports = (sequelize, DataTypes) => {
    var Detalle_folio_residente = sequelize.define('Detalle_folio_residente', {
          
        numero_de_folio: {
            type: DataTypes.INTEGER
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo no debe estar vacio'}
            }
        },
        
    });
    Detalle_folio_residente.associate = (models) => {
        Detalle_folio_residente.belongsTo(models.Docente, {
            foreignKey: 'id_docente',
            onDelete: 'CASCADE',
            as: 'docente'
        });
        Detalle_folio_residente.belongsTo(models.Alumno, {
            foreignKey: 'id_alumno',
            onDelete: 'CASCADE',
            as: 'alumno'
        });
      
            Detalle_folio_residente.belongsTo(models.Folio_residencias, {
                foreignKey: 'id_folio_detalle',
                onDelete: 'CASCADE',
                as: 'folios'
            });
     
    }
    return Detalle_folio_residente;
};