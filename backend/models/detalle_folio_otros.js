'use strict';
module.exports = (sequelize, DataTypes) => {
    var Detalle_folio_otro = sequelize.define('Detalle_folio_otro', {
          
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
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo no debe estar vacio'}
            }
        },
        nombre_destinatario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo no debe estar vacio'}
            }
        },
        
    });
    Detalle_folio_otro.associate = (models) => {
        Detalle_folio_otro.belongsTo(models.Docente, {
            foreignKey: 'id_emisor',
            onDelete: 'CASCADE',
            as: 'emisor'
        });
        Detalle_folio_otro.belongsTo(models.Folio, {
            foreignKey: 'id_folio',
            onDelete: 'CASCADE',
            as: 'folio'
        });
        Detalle_folio_otro.belongsTo(models.Empresa, {
            foreignKey: 'id_empresa',
            onDelete: 'CASCADE',
            as: 'empresa'
        });
         
    }
    return Detalle_folio_otro;
};