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
    fetchPeriodos = () => {

        axios.get(`/api/periodoss`)
            .then(res => {
                if (res.status === 200) {
                    console.log("==>", res.data)
                    this.setState({
                        periodos: res.data,
                    })
                }
            })
    }
    fetchUsuarios = () => {
        axios.get('/api/pre_registro')
            .then(res => {
                if (res.status === 200) {
                    console.log("alumnos" + res.data)
                    const usuarios = res.data.map((registro, key) => {
                        return {
                            id: registro.no_control,
                            nombre: registro.nombre + " " + registro.ap_paterno + " " + registro.ap_materno,
                            correo: registro.correo,
                            carrera: registro.carreraPre.nombre,
                            id_carrera: registro.carreraPre.id,
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
        this.fetchPeriodos();
    }
    enviarContrasenia = (id_usuario, correo, id_carrera) => {
        const { periodo } = this.state;
        periodo ?


            axios.get(`/api/alumno/periodot/${periodo + '+' + id_usuario + '+' + id_carrera}`).then(res => {
                if (res.status === 200) {
                    this.fetchUsuarios();
                    message.success('El usuario y la constraseña enviaron al correo del candidato a residente');
                } else {
                    message.error('ups hubo un error inesperado favor de contactar al administrador')
                }
            })
            : openNotificationWithIcon();

    }

    handlePeriodo = (value) => {
        var cadena = value.split("#")
        var periodo = cadena[0];
        var fechas = cadena[1].split('+');

        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate + " =>>>>: " + fechas[0] + "------" + fechas[1]);
        if (currentDate >= fechas[0] && currentDate <= fechas[1]) {
            this.setState({
                periodo: periodo,
            })

        } else {
            message.warning('no se puede agregar residentes a ese perido ya que las fechas puestas hasta este momento no cumplen')
            this.setState({
                periodo: null,
            })
        }


    }
    render() {
        const { usuarios, loadTable, periodos } = this.state;
        console.log(periodos, "----sl,s,oms");

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
            {
                className: 'center-text',
                title: 'Accion',
                dataIndex: 'key',
                key: 'key',
                render: (text, record) => {
                    return (
                        <Button icon="reload" onClick={() => this.enviarContrasenia(record.id, record.correo, record.id_carrera)}>Enviar usuario y constraseña  a su correo</Button>
                    )

                }

            }
        ]
        return (
            <div>
                <div >

                    <Select placeholder="Seleccione el periodo"
                        onChange={this.handlePeriodo}
                        style={{ width: 300, left: 450, fontSize: 20 }}>
                        {periodos ? periodos.map((periodo, index) => {
                            const currentDate = moment().format('YYYY-MM-DD');
                            return (

                                // currentDate >= periodo.fecha_inicio_entrega_anteproyecto && currentDate <= periodo.fecha_fin_entrega_anteproyecto ?
                                        currentDate <= periodo.fecha_fin_entrega_anteproyecto ?
                                        <Option key={index} value={`${periodo.periodo}+${periodo.ciclo}#${periodo.fecha_inicio_entrega_anteproyecto}+${periodo.fecha_fin_entrega_anteproyecto}`} >{periodo.periodo + "/" + periodo.ciclo}</Option>
                                    : ''


                            )


                        }) : ''}
                    </Select>

                </div>
                <h3>Residentes</h3>
                <Col xs={24} lg={24}>

                    <Table dataSource={usuarios} columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 1100 }} />
                </Col>
            </div>
        )
    }
}