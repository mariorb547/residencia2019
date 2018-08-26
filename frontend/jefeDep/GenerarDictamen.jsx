import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Badge, Alert} from 'antd';
const {Option, OptGroup}  = Select;
const ButtonGroup = Button.Group;


import axios from 'axios';
import PDF2 from 'react-pdf-js-infinite';
import moment from 'moment';

export default class GenerarDictamen extends Component{
    
    
    
    render(){
    
        const currentDate = moment().format('YYYY-MM-DD');
        // console.log('=>>>', dictamen_anteproyectos);
        const alumnos = [{
            key:'1',
            no_control_alumno:'135205410',
            nombre_alumno:'Francisco Arcos Jaimes',
            sexo_alumno:'H',
            nombre_anteproyecto:'Administracion de un sistema web',
            nombre_titular_empresa:'Ing.Francisco Arcos Jaimes, Directos',
            asesor_interno:'Ing.Mauricio Cordova Portillo',
            asesor_externo:'Ing.Jose Daniel Rodriguez',
            dictamen:'APROBADO ',
            fecha_dictamen:'2018-02-20T14:05:26.000Z'

        }]
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
                key: 'nombre_titular_empresa'
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
                        //render: 
                    },
                    {
                        className: 'center-text',
                        title: 'EXTERNO',
                        dataIndex: 'asesor_externo',
                        key: 'asesor_externo'
                    }

                ]
            },
            {
                className: 'center-text',
                title: 'DICTAMEN',
                dataIndex: 'dictamen',
                key: 'dictamen'
            },
            {
                className: 'center-text',
                title: 'FECHA DE DICTAMEN',
                dataIndex: 'fecha_dictamen',
                key: 'fecha_dictamen'
            }
        ]
   
        return (
            <div>
                <Row type="flex">
                    <Col xs={24} lg={6}>
                        <p>Seleccione el periodo</p>
                        <Select 
                    
                            style={{width: '100%'}}
                        >   
                      
                             
                                    <OptGroup key="1"label="Ingenerieria en sistemas computacionales">
                                      
                                      <Option key="1"value="1">FEBRERO-JUNIO-2018</Option>
                                       
                                    </OptGroup>
                                    <OptGroup key="2"label="Ingenerieria en Informatica">
                                      
                                      <Option key="2"value="2">FEBRERO-JUNIO-2018</Option>
                                       
                                    </OptGroup>
                        </Select>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                <ButtonGroup> <Button icon="file-pdf" type="primary" htmlType="submit" style={{ marginTop: 20, marginBottom: 20 }}>
                        Descargar Dictamen
                    </Button>  <Button type="primary" icon="eye-o"> <a style={{ color: 'white' }} target="_blank" >Ver</a></Button>
                    </ButtonGroup>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                    <Col xs={24} lg={24} style={{marginBottom: 20}}>
                     
                    </Col>
                    <Col xs={24} lg={24}>
                        <Table bordered title={() => 'Dictamen'}  className="full-width" dataSource={alumnos} columns={columns} pagination={{ pageSize: 8 }}  scroll={{ x: 1700 }} />
                    </Col>
                </Row> 
            </div>
        )
    }
}