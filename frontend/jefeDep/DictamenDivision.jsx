import React, { Component } from 'react';
import { message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Badge, Alert, Cascader } from 'antd';
const { Option, OptGroup } = Select;
const ButtonGroup = Button.Group;


import axios from 'axios';
import PDF2 from 'react-pdf-js-infinite';
import moment from 'moment';

export default class Dictamen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: props.usuario,
            departamento: props.departamento,
            periodo: null,
            dictamen_anteproyectos: null,
            docentes: null,
            options1: [],
        }
    }
    handleChangePeriodo = (id_periodo) => {
        axios.get(`/api/periodo/${id_periodo}/dictamen`)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res)
                    if (res.data.anteproyectos != null) {
                        const dictamen_anteproyectos = res.data.anteproyectos.map((anteproyecto, index) => {
                            return {
                                key: (index + 1),
                                id: anteproyecto.id,
                                no_control_alumno: anteproyecto.alumno.no_control,
                                nombre_alumno: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`,
                                sexo_alumno: anteproyecto.alumno.sexo,
                                nombre_anteproyecto: anteproyecto.nombre,
                                nombre_titular_empresa: `${anteproyecto.asesor_externo.empresa.titular.nombre} \n ${anteproyecto.asesor_externo.empresa.titular.puesto}`,
                                asesor_interno: `${anteproyecto.asesor_interno.titulo} ${anteproyecto.asesor_interno.nombre} ${anteproyecto.asesor_interno.ap_paterno} ${anteproyecto.asesor_interno.ap_materno}`,
                                id_asesor_interno: anteproyecto.asesor_interno.id,
                                asesor_externo: anteproyecto.asesor_externo.nombre,
                                dictamen: anteproyecto.dictamen.toUpperCase(),
                                fecha_dictamen: anteproyecto.updatedAt
                            }
                        })
                        this.setState({
                            periodo: res.data,
                            dictamen_anteproyectos
                        })
                    } else {
                        this.setState({
                            periodo: res.data,
                            dictamen_anteproyectos: null
                        })
                    }
                }
            })

    }
    eliminarObjetosDuplicados(arr, prop) {
        var nuevoArray = [];
        var lookup = {};

        for (var i in arr) {
            lookup[arr[i][prop]] = arr[i];
        }

        for (i in lookup) {
            nuevoArray.push(lookup[i]);
        }

        return nuevoArray;
    }
    componentWillMount() {

        axios.get('/api/seguimiento/carreras').then(res => {
            if (res.status == 200) {
                const carreras = res.data.map((seguimiento, key) => {

                    return {
                        value: `${seguimiento.periodo.carrera.id}`,
                        label: `${seguimiento.periodo.carrera.nombre}`,
                    }
                })


                const periodo = res.data.map((seguimiento, key) => {

                    return {
                        value: `${seguimiento.periodo.periodo + "," + seguimiento.periodo.ciclo}`,
                        label: `${seguimiento.periodo.periodo + "/" + seguimiento.periodo.ciclo}`,
                        children: this.eliminarObjetosDuplicados(carreras, 'value')

                    }


                })
                this.setState({
                    options1: this.eliminarObjetosDuplicados(periodo, 'value'),
                })
                // //
            }
        })
    }
    handleAsesorInterno = (id_asesor_interno, id_anteproyecto) => {
        axios.put('/api/anteproyecto/set_asesor_interno', {
            id_asesor_interno, id_anteproyecto
        }).then(res => {
            if (res.status === 200) {
                message.success('Anteproyecto actualizado!')
                // window.location.reload();
                // this.props.updatePeriodo();
            } else {
                Modal.error({
                    title: 'Error al actualizar anteproyecto. Revisar los siguientes campos',
                    content: (
                        <div>
                            {res.data.errores}
                        </div>
                    ), onOk() { },
                })
            }
        })
    }
    updatePeriodo = () => {
        axios.get(`/api/periodo/${this.state.periodo.id}/dictamen`)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                    if (res.data.anteproyectos != null) {
                        const dictamen_anteproyectos = res.data.anteproyectos.map((anteproyecto, index) => {

                            return {
                                key: (index + 1),
                                id: anteproyecto.id,
                                no_control_alumno: anteproyecto.alumno.no_control,
                                nombre_alumno: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`,
                                sexo_alumno: anteproyecto.alumno.sexo,
                                nombre_anteproyecto: anteproyecto.nombre,
                                nombre_titular_empresa: `${anteproyecto.asesor_externo.empresa.titular.nombre} \n ${anteproyecto.asesor_externo.empresa.titular.puesto}`,
                                asesor_interno: `${anteproyecto.asesor_interno.titulo} ${anteproyecto.asesor_interno.nombre} ${anteproyecto.asesor_interno.ap_paterno} ${anteproyecto.asesor_interno.ap_materno}`,
                                id_asesor_interno: anteproyecto.asesor_interno.id,
                                asesor_externo: anteproyecto.asesor_externo.nombre,
                                dictamen: anteproyecto.dictamen.toUpperCase(),
                                fecha_dictamen: anteproyecto.updatedAt,
                            }
                        })
                        this.setState({
                            periodo: res.data,
                            dictamen_anteproyectos
                        })
                    } else {
                        this.setState({
                            periodo: res.data,
                            dictamen_anteproyectos: null
                        })
                    }
                }
            })
    }
    handleGenerarDictamen = () => {
        // generar dictamen abrir una ventana con el pdf y actualizar la pagina del sitio jeje
        const { periodo } = this.state
        axios.post('/api/periodo/generar_dictamen', {
            id_periodo: periodo.id
        }).then((res) => {
            if (res.status === 200) {
                // form.resetFields();
                // console.log(res.data)
                message.success("Dictamen generado satisfactoriamente!")
                this.updatePeriodo()
            } else {
                Modal.error({
                    title: 'Error al intentar generar el dictamen',
                    content: (
                        <div>
                            {res.data.errores}
                        </div>
                    ), onOk() { },
                })
            }
        }).catch((err) => {
            message.error(err);
        })
    }
    handleSeguimientos = (id_seguimiento) => {
        id_seguimiento != '' ?
            axios.get(`/api/periodo/dictamen/${id_seguimiento}`)
                .then(res => {

                    if (res.status === 200) {
                        this.handleChangePeriodo(res.data.id);
                    }
                })
            :
            this.setState({
                dictamen_anteproyectos: null
            })
    }
    render() {
        const { departamento, dictamen_anteproyectos, periodo, options1 } = this.state;
        const currentDate = moment().format('YYYY-MM-DD');
        // console.log('=>>>', dictamen_anteproyectos);
        const columns = [
            {
                width: 50,
                fixed: 'left',
                className: 'center-text',
                title: 'NUM',
                dataIndex: 'key',
                key: 'key'
            },
            {
                width: 100,
                fixed: 'left',
                className: 'center-text',
                title: 'CONTROL',
                dataIndex: 'no_control_alumno',
                key: 'no_control_alumno'
            },
            {
                width: 200,
                fixed: 'left',
                className: 'center-text',
                title: 'NOMBRE DEL ESTUDIANTE',
                dataIndex: 'nombre_alumno',
                key: 'nombre_alumno'
            },
            {
                className: 'center-text',
                title: 'S',
                dataIndex: 'sexo_alumno',
                key: 'sexo_alumno'
            },
            {
                className: 'center-text',
                title: 'ANTEPROYECTO',
                dataIndex: 'nombre_anteproyecto',
                key: 'nombre_anteproyecto',
            },
            {
                className: 'center-text',
                title: 'NOMBRE Y CARGO DEL TITULAR DE LA EMPRESA',
                dataIndex: 'nombre_titular_empresa',
                key: 'nombre_titular_empresa',
                width: 300
            },
            {
                title: 'ASESORES',
                children: [
                    {
                        width: 300,
                        className: 'center-text',
                        title: 'INTERNO',
                        dataIndex: 'asesor_interno',
                        key: 'asesor_interno',
                        // render: (text, record) => (
                        //     <Select disabled
                        //         placeholder="Seleccione al asesor interno"
                        //         style={{ width: '100%' }}
                        //         onChange={(id_asesor_interno) => this.handleAsesorInterno(id_asesor_interno, record.id)}
                        //         defaultValue={record.id_asesor_interno ? `${record.id_asesor_interno}` : null}
                        //         >
                        //             {periodo !== null ? periodo.carrera.docentes_carreras.map((_docente, index) => {
                        //                 return <Option key={index} value={`${_docente.docente.id}`}>{`${_docente.docente.titulo} ${_docente.docente.nombre} ${_docente.docente.ap_paterno} ${_docente.docente.ap_materno}`}</Option>
                        //             }) : null}
                        //     </Select>
                        // )
                    },
                    {
                        className: 'center-text',
                        title: 'EXTERNO',
                        dataIndex: 'asesor_externo',
                        key: 'asesor_externo',
                        width: 300
                    }

                ]
            },
            {
                className: 'center-text',
                title: 'DICTAMEN',
                dataIndex: 'dictamen',
                key: 'dictamen',
                width: 150
            },
            {
                className: 'center-text',
                title: 'FECHA DE DICTAMEN',
                dataIndex: 'fecha_dictamen',
                key: 'fecha_dictamen',
                width: 100
            }
        ]
        var renderInformacionPeriodo = null;
        var renderButtonDictamen = null;
        if (periodo != null) {
            renderInformacionPeriodo = <Col xs={24} lg={24}>
                <h2 style={{ textAlign: 'center' }}>DEPARTAMENTO DE {periodo.carrera.departamento.nombre.toUpperCase()}</h2>
                <h3 style={{ textAlign: 'center' }}>CARRERA: {periodo.carrera.nombre.toUpperCase()}</h3>
            </Col>;
       
            if (periodo.filename_dictamen === null) {
                renderButtonDictamen = <Alert message={`No se ha generado el dictamen y solo se puede generar en las fechas ${periodo.fecha_inicio} al ${periodo.fecha_fin}`} type="info" showIcon />
            } else {
                renderButtonDictamen = <div><Button type="primary" icon="eye-o"> <a style={{ color: 'white' }} target="_blank" href={`/api/dictamens/pdf/${periodo.filename_dictamen}`}>Ver dictamen</a></Button>...
                <Button type="primary" icon="file-word"> <a style={{ color: 'white' }} target="_blank" href={`/api/dictamen/word/${periodo.id}/${periodo.carrera.nombre.toUpperCase()}-DICTAMEN.docx`}>Descargar dictamen</a></Button></div>
            }
            // }   
        }
        return (
            <div>
                <Row type="flex">
                    <Col xs={24} lg={6}>
                        <h1>Seleccione el periodo</h1>
                        <Cascader style={{ width: 400, fontSize: 14 }} options={options1} onChange={this.handleSeguimientos} placeholder="Seleccione el periodo" />

                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 20 }}>
                    {renderInformacionPeriodo}
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 20 }}>
                    <Col xs={24} lg={24} style={{ marginBottom: 20 }}>
                        {renderButtonDictamen}
                    </Col>
                    <Col xs={24} lg={24}>
                        <Table bordered title={() => 'Dictamen'} dataSource={dictamen_anteproyectos} className="full-width" columns={columns} pagination={{ pageSize: 8 }} scroll={{ x: 2200 }} />
                    </Col>
                </Row>
            </div>
        )
    }
}