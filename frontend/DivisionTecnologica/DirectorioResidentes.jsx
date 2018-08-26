import React, { Component } from 'react';
import render from 'react-dom';
import { Col, Table, Button, Select, message, notification } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import moment from 'moment';
const openNotificationWithIcon = () => {
    notification['warning']({
        message: 'Notificación del sistema',
        description: 'Para poder asignar el usuario y constraseña al candidato a residente debes haber seleccionado un periodo en el combobox de arriba por ejemplo periodo FEBRERO-JUNIO/2018.',
    });
};
notification.config({
    placement: 'topRight',
    bottom: 50,
    duration: 13,
});
 

export default class AsginacionUsuario extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            loadTable: true,
            periodos: null,
            periodo: null,

        }
    }
  
    fetchUsuarios = () => {
        axios.get('/api/directorio/telefonico')
            .then(res => {
                if (res.status === 200) {
                    console.log("alumnos" + res.data)
                    const usuarios = res.data.map((alumno, key) => {
                        return {
                            id: alumno.no_control,
                            nombre: alumno.nombre + " " + alumno.ap_paterno + " " + alumno.ap_materno,
                            telefono:alumno.numero_celular,
                            correo: alumno.usuario.correo,
                            carrera: alumno.carrera.nombre,
                            id_carrera: alumno.carrera.id,
                            key,
                        }
                    })
                    this.setState({
                        usuarios,
                        loadTable: false,
                    })
                }
            })
    }
    componentDidMount() {
        this.fetchUsuarios();
        
    }
   

    
    render() {
        const { usuarios, loadTable    } = this.state;
        

        const columns = [
            {
                title: 'No.Control',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre'
            }, {
                title: 'Telefono',
                dataIndex: 'telefono',
                key: 'telefono'
            },

            {
                title: 'correo',
                dataIndex: 'correo',
                key: 'correo'
            }, {
                title: 'Carrera',
                dataIndex: 'carrera',
                key: 'id_carrera',
                filters: [
                    {
                        text: 'Ingeniería en sistemas computacionales',
                        value: 'Ingeniería en sistemas computacionales'
                    },
                    {
                        text: 'Ingeniería informática',
                        value: 'Ingeniería informática'
                    },
                    {
                        text: 'Ingeniería civil',
                        value: 'Ingeniería civil'
                    },
                    {
                        text: 'Ingeniería en gestión empresarial',
                        value: 'Ingeniería en gestión empresarial'
                    },
                    {
                        text: 'Contador público',
                        value: 'Contador público'
                    },

                ],
                onFilter: (value, record) => record.carrera.indexOf(value) === 0,
            },
            
        ]
        return (
            <div>
               
                <h3>Residentes</h3>
                <Col xs={24} lg={24}>

                    <Table dataSource={usuarios} columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 1100 }} />
                </Col>
            </div>
        )
    }
}