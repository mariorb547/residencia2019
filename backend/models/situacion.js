'use strict';
module.exports = (sequelize, DataTypes) => {
    var situacion = sequelize.define('situacion', {

        idalumno: {
            type: DataTypes.INTEGER,
        },
        idperiodo: {
            type: DataTypes.INTEGER,
        },
        estado: {
            type: DataTypes.ENUM,
            values: ['activo', 'cancelado', 'prorroga', 'termino satisfactoriamente','abandonado'],
            defaultValue: 'activo'
        },
        numeroseguimientos: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        solicitud_academica:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        aprobacion_academica:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        cd:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        liberacion_asesor_interno:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        liberacion_asesor_externo:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        carta_presentacion_agradecimientos:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        copia_evaluacion:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        portadas:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,

        }
    });

    situacion.associate = (models) => {
        situacion.belongsTo(models.Alumno, {
            foreignKey: 'idalumno',
            as: 'alumno'
        });
        situacion.belongsTo(models.Periodo, {
            foreignKey: 'idperiodo',
            onDelete: 'CASCADE',
            as: 'periodo'
        });
        situacion.belongsTo(models.Docente, {
            foreignKey: 'id_jefe_division',
            onDelete: 'CASCADE',
            as: 'jefe_division'
          })
         
    }
    return situacion;
};