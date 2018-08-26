import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal, Form, Input, Row, Col, Icon, message, Upload, Collapse, Badge, Alert, Table } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Panel } = Collapse;
import axios from 'axios';
import moment from 'moment';

class FormSeguimiento extends Component {
 
    render() {
        const { getFieldDecorator } = this.props.form;
        const {   residentes, periodo  } = this.props;
       
   
        const loadTable = false;
        const columns = [
            {
                title: 'No',
                dataIndex: 'NO',
                key: 'NO',
                fixed: 'left',

            },

            {
                title: 'No. Control',
                dataIndex: 'control',
                key: 'control',
                fixed: 'left',
                width: 100
            },

            {
                title: 'Nombre del Residente',
                dataIndex: 'nombre',
                key: 'nombre',
                fixed: 'left',
                width: 200,
            },
            {

                title: 'INSTITUTO TECNOLOGICO DE CHILPANCINGO',
                dataIndex: 'Anteproyecto1',
                key: 'Anteproyecto1',


                children: [


                    {
                        title: 'Anteproyecto',
                        dataIndex: 'Anteproyecto',
                        key: 'Anteproyecto',
                        width: 300

                    }, {
                        title: 'Fecha de entrega',
                        dataIndex: 'fecha',
                        key: 'fecha', width: 120


                    }, {
                        title: 'Asesor Interno',
                        dataIndex: 'asesor',
                        key: 'asesor', width: 200

                    }, {
                        title: 'Lugar',
                        dataIndex: 'lugar',
                        key: 'lugar',
                        width: 200

                    },

                ]


            },
            {
                title: 'Estado',
                dataIndex: 'cumplio',
                key: 'cumplio',
                fixed: 'right',
                width: 100,
                render: (text, record) => {
                    if (record.cumplio === 'SI') {
                        return (
                            <p style={{ color: '#080C27' }}  >CUMPLIO</p>
                        )
                    } else {
                        return (
                            <p style={{ color: '#FF0000' }}  > NO CUMPLIO</p>
                        )
                    }

                },
                filters: [
                    {
                        text: 'CUMPLIERON',
                        value: 'SI'
                    },
                    {
                        text: 'NO COMPLIERON',
                        value: 'NO'
                    }

                ],
                onFilter: (value, record) => record.cumplio.indexOf(value) === 0,
            },
            {
                title: 'Situacion',
                dataIndex: 'estado',
                key: 'estado',
                fixed: 'right',
                width: 100,
                
                filters: [
                    {
                        text: 'Activo',
                        value: 'acvito'
                    },
                    {
                        text: 'Cancelado',
                        value: 'cancelado'
                    },
                    {
                        text: 'Prorroga',
                        value: 'prorroga'
                    },
                    {
                        text: 'Abandonado',
                        value: 'abandonado'
                    }
                    , {
                        text: 'Termino satisfactoriamente',
                        value: 'termino satisfactoriamente'
                    }

                ],
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
            }





        ]
        const panelStyleSolucionado = {
            background: '#f4f8f9',
            borderRadius: 10,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        // console.log('aui', seguimiento)
        // axios.get(`/api/seguimiento/generar/${seguimiento.id}`).then(res=>{
        //     if(res.status == 200 ){
        //           residentes = res.data.map((seguimiento, key) => {
        //             return {
        //                 NO:key+1,
        //                 control: seguimiento.proyecto.anteproyecto.alumno.no_control,
        //                 nombre: seguimiento.proyecto.anteproyecto.alumno.nombre+" "+seguimiento.proyecto.anteproyecto.alumno.ap_paterno+" "+seguimiento.proyecto.anteproyecto.alumno.ap_materno,
        //                 Anteproyecto:seguimiento.proyecto.anteproyecto.nombre,
        //                 asesor:seguimiento.proyecto.anteproyecto.asesor_interno.titulo+". "+seguimiento.proyecto.anteproyecto.asesor_interno.nombre+" "+seguimiento.proyecto.anteproyecto.asesor_interno.ap_paterno+" "+seguimiento.proyecto.anteproyecto.asesor_interno.ap_materno,
        //                 fecha:seguimiento.seguimiento_proyecto.fecha_final,
        //                 lugar:seguimiento.proyecto.anteproyecto.asesor_interno.empresa.domicilio,
        //                 cumplio:seguimiento.url_seguimiento? 'SI':'NO',
        //                 key,
        //             }
        //         })
                
                
        //     }
        // })   
        return (
            <div>




                <Row  >
                    <Col xs={24} lg={24}>
                        //<Button  icon="file-pdf" style={{ left: 800 }}><a href={`/api/generar/${periodo.id}/seguimiento/seguimientofinal`} target="_blank">Genera</a></Button>
                        <br /><br />
                        <Table bordered title={() => 'Reporte final'} columns={columns} dataSource={residentes} pagination={{ pageSize: 5 }} className="full-width" loading={loadTable} scroll={{ x: 1350 }} />
                    </Col>
                </Row>
            </div >

        )
    }
}

const WrappedFormSeguimientoFinal = Form.create({
    mapPropsToFields(props) {
        return {
            props
        }
    }
})(FormSeguimiento);
export default WrappedFormSeguimientoFinal;