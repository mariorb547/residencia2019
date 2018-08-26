import React, { Component } from 'react';

import { Select, Row, Col, message, Radio, Input, Tabs, Icon, Form, Collapse, Table, Alert, Steps, Switch } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Step = Steps.Step;
const Item = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import WrappedFormSeguimiento from '../../jefeDep/RevisionDivision.jsx';
var params = require(__dirname + '/../../../config/params.json');

// import { Button, Modal, , Input, Row, Col, Icon, message, Upload, Collapse, Badge, Alert, Table } from 'antd';
const FormItem = Form.Item;
import moment from 'moment';
import { Button } from 'antd/lib/radio';


class FormInformacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderSeguimiento: null,

        }
    }
    onChangeSeguimiento = (id_seguimiento) => {
        const { seguimientos } = this.props;
        const currentDate = moment().format('YYYY-MM-DD');
        if (id_seguimiento === 'seguimiento_final') {
            // console.log('aqui', );
            // const periodo = seguimientos[0][0].proyecto.anteproyecto.periodo; // ver si no es diferente la primera y la ultima vez jeje
            // console.warn('Periodo',periodo.fecha_fin)
            // el seguimiento final esta habilitado 10 dias antes y 10 dias despues de la fecha final del periodo
            // console.log('params.days', params.periodo_residencia.dias_habiles_seguimiento_final);
            if (currentDate >= moment(periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD') && currentDate <= moment(periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD')) {
                // this.setState({
                //     renderSeguimiento: <WrappedFormSeguimientoFinal proyecto={seguimientos[0][0].proyecto} />
                // })
            } else {
                //     this.setState({
                //         renderSeguimiento: <Alert message={`El seguimiento final no esta disponible,\n Fecha inicial: ${moment(periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')} - Fecha final: ${moment(periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')}`} type="warning" showIcon />
                //     })
            }

        } else {
            const seguimiento = seguimientos.find(seg => seg.id == id_seguimiento);
            console.log(seguimiento)
            if (currentDate >= seguimiento.fecha_inicial && currentDate <= seguimiento.fecha_final) {
                // this.setState({
                //     renderSeguimiento: <WrappedFormSeguimiento seguimiento={seguimiento} />
                // })
            } else {
                this.setState({
                    renderSeguimiento: <Alert message={`No puede acceder al seguimiento, Fecha final: ${moment(seguimiento.fecha_final, 'YYYY-MM-DD').format('LL')}`} type="warning" showIcon />
                })
            }
        }


    }
    handleStatus = (id, estado) => {

        axios.put('/api/alumno/situacion', {
            id,
            estado: estado ? 'prorroga' : 'cancelado'
        }).then((res) => {
            if (res.status = 200) {
                this.props.refrescar();
                message.success("Se actualizo correctamente")

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })

    }
    verificacion = (id, estado) => {
        estado === 'no cumplio' ?
            axios.put('/api/alumno/situacion', {
                id,
                estado: 'cancelado'
            }).then((res) => {
                if (res.status = 200) {

                    console.log('ok no hacemos nada va bien el amigo')
                } else {
                    message.error("Ups ha visto un problema, favor de contactar al administrador")
                }
            }) : console.log('ok no hacemos nada va bien el amigo')
    }
    handleEntregrables = (id, estado, entregable) => {

        axios.put('/api/alumno/entregables', {
            id,
            estado,
            entregable

        }).then((res) => {
            if (res.status = 200) {

                message.success("Se actualizo correctamente")

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })

    }
    render() {
        const { renderSeguimiento } = this.state;
        const { alumno, interno, externo, empresa, proyecto, anteproyecto, carrera, seguimientos, seguimiento_proyectos, situacion } = this.props;
        console.log('paco que pasa:',seguimiento_proyectos)
        const customPanelStyle = {
            background: '#f4f8f9',
            borderRadius: 10,
            marginBottom: 24,
            border: 0,
            // overflow: 'hidden',

        };



        const columnsEntregables = [{
            // className: 'center-text',
            title: 'Documento',
            dataIndex: 'dato',
            key: 'dato',
            width: 500,

        }, {
            className: 'center-text',
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            width: 100,
            render: (text, record) => {
                return (
                    <Switch checkedChildren='Entrego' defaultChecked={record.estado ? true : false} unCheckedChildren="No ah entregado" onChange={(checked) => this.handleEntregrables(alumno.id, checked, record.key)} />
                )

            }

        }]
        const dataSourceEntregables = [{
            key: 'cd',
            dato: 'CD que contiene en formato digital (PDF): A. Informe Técnico de Residencia Profesional, (debidamente etiquetado) B. Portada del  informe ténico rubricada por los Asesores externo e interno, sellada por la entidad donde se realizó la Residencia Profesional.',
            estado: situacion.cd ? true : false,
        }, {
            key: 'liberacion_asesor_interno',
            dato: 'Copia* del oficio de Liberación del Proyecto de Residencia Profesional por parte del Asesor Interno.',
            estado: situacion.liberacion_asesor_interno ? true : false,
        }, {
            key: 'liberacion_asesor_externo',
            dato: 'Copia* del oficio de Liberación del Asesor Externo, del informe Técnico del Proyecto de Residencia Profesional.',
            estado: situacion.liberacion_asesor_externo ? true : false,
        }, {
            key: 'carta_presentacion_agradecimientos',
            dato: 'Copia* del oficio de recepción de la carta de presentación y agradecimientos, del Informe Técnico del Proyecto de Residencia, Profesional. (firmada de recibido por la empresae institución).',
            estado: situacion.carta_presentacion_agradecimientos ? true : false,
        }, {
            key: 'copia_evaluacion',
            dato: 'Copia* de la Evaluación a las Estudiantes Residentes por los Asesores Externo e Interno. (firmada y sellada por el asesor interno, asesor externo, Departamento de Gestión Tecnológica y Vinculación y Departamento Académico correspondiente).',
            estado: situacion.copia_evaluacion ? true : false,
        }, {
            key: 'portadas',
            dato: 'Dos portadas originales firmadas por el asesor interno y externo, con  los sellos correspondientes.',
            estado: situacion.portadas ? true : false,
        }]
        const currentDate = moment().format('YYYY-MM-DD');
        return (
            <div>
                {/* <Icon type={(alumno.sexo === 'H' ? 'man' : 'woman')} /> */}
                <Row  >
                    <Col xs={24} lg={24}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span className="texto" ><Icon type='book' /> Proyecto </span>} key="1">
                                {/* <Collapse bordered={true} defaultActiveKey={['1']}>
                                    <Panel header="PROYECTO:" style={customPanelStyle} key="1"> */}
                                <h2>PERIODO: {anteproyecto.periodo.periodo + " / " + anteproyecto.periodo.ciclo}   CARRERA: {carrera.nombre}</h2>
                                {/* <Table bordered title={() => 'Proyecto de residencia profesional'}dataSource={dataSource} columns={columns} bordered pagination={false} /> */}
                                <Form>
                                    <Item label="Título: ">
                                        <Input.TextArea value={anteproyecto.nombre} readOnly autosize={{ minRows: 1, maxRows: 6 }} />
                                    </Item>
                                    <Item label="Objetivo general: ">
                                        <Input.TextArea value={anteproyecto.objetivo_general} readOnly autosize={{ minRows: 1, maxRows: 6 }} />
                                    </Item>
                                    <Item label="Lugar de residencia: ">
                                        <Input.TextArea value={empresa.nombre} readOnly autosize={{ minRows: 1, maxRows: 6 }} />
                                    </Item>

                                    <Item label="Asesor interno: ">
                                        <Input.TextArea value={interno ? (interno.titulo + " " + interno.nombre + " " + interno.ap_paterno + " " + interno.ap_materno ): 'Aun no esta asignado'} readOnly autosize={{ minRows: 1, maxRows: 6 }} />
                                    </Item>
                                    <Item label="Asesor externo: ">
                                        <Input.TextArea value={externo ? externo.nombre : 'Aun no esta asigndo'} readOnly autosize={{ minRows: 1, maxRows: 6 }} />
                                    </Item>


                                </Form>



                            </TabPane>
                            <TabPane tab={<span className="texto"    ><Icon type="schedule" /> Seguimientos </span>} key="2">
                                <Steps current={1}   >
                                    {seguimiento_proyectos.map((seguimiento, index) => {
                                        const seguimientost = seguimientos.find(seg => seg.id == seguimiento.id_seguimiento);
                                        // {
                                        //    this.verificacion(alumno.id,seguimiento.estado_seguimiento)
                                        // }
                                        return (

                                            <Step title={`Seguimiento ${index + 1}`} key={seguimiento.id}
                                                status={
                                                    (
                                                        currentDate >= seguimientost.fecha_final ?
                                                            (seguimiento.estado_seguimiento === 'cumplio' ? 'finish' :
                                                                'error')
                                                            : 'process'

                                                    )
                                                } description={
                                                    (
                                                        currentDate >= seguimientost.fecha_final ?
                                                            (seguimiento.estado_seguimiento === 'cumplio' ? 'Cumplio' : 'No cumplio ')
                                                            : 'En proceso'

                                                    )
                                                }

                                            />


                                        )
                                    })}



                                </Steps>
                                <br/>
                                <br/>
                                <RadioButton className="botongenerarinformeseguimiento" icon="file-pdf" style={{backgroundColor:"#108ee8" }} ><a href={`/api/alumno/${anteproyecto.id_alumno}/situacion`} target="_blank" style={{color:"#FBFBEF"}} >Generar informe</a> </RadioButton>
                            </TabPane>

                            <TabPane tab={<span className="texto" ><Icon type="edit" /> Situacion </span>} key="3">
                                <div style={{ left: 120 }}>
                                  
                                    <h2>Situacion:</h2><br />
                                    <RadioGroup onChange={this.handleStatus} defaultValue={`${situacion.estado}`}>
                                        {situacion.estado === 'activo' ? <RadioButton value="activo" >Activo</RadioButton> : <RadioButton value="activo" disabled >Activo</RadioButton>}
                                        {situacion.estado === 'cancelado' ? <RadioButton value="cancelado"  >Cancelado</RadioButton> : <RadioButton value="cancelado" disabled >Cancelado</RadioButton>}
                                        {situacion.estado === 'abandonado' ? <RadioButton value="abandonado"  >Abandonado</RadioButton> : <RadioButton value="abandonado" disabled >Abandonado</RadioButton>}
                                        {situacion.estado === 'prorroga' ? <RadioButton value="prorroga" >Prorroga</RadioButton> : <RadioButton value="prorroga" disabled >Prorroga</RadioButton>}
                                        {situacion.estado === 'termino satisfactoriamente' ? <RadioButton value="termino satisfactoriamente"  >Termino satisfactoriamente</RadioButton> : <RadioButton disabled value="termino satisfactoriamente"  >Termino satisfactoriamente</RadioButton>}
                                    </RadioGroup>
                                    <br />
                                    <br />

                                    {
                                        (situacion.estado === 'prorroga' || situacion.estado === 'cancelado') ?


                                            <div  >
                                                <h3>Formatos que se deben entregar para prorroga o cancelacion de residencia </h3>
                                                <Collapse bordered={true}>
                                                    <Panel header="Solicitud ante comite academico" style={customPanelStyle} key="1">

                                                        <Switch checkedChildren='Entrego' defaultChecked={situacion.solicitud_academica ? true : false} unCheckedChildren="No ah entregado" onChange={(checked) => this.handleEntregrables(alumno.id, checked, 'solicitud')} />
                                                    </Panel>

                                                    <Panel header="Aprovacion de comite academico" style={customPanelStyle} key="2">
                                                        <Switch checkedChildren='Entrego' defaultChecked={situacion.aprobacion_academica ? true : false} unCheckedChildren="No ah entregado" onChange={(checked) => this.handleEntregrables(alumno.id, checked, 'aprobacion')} />

                                                    </Panel>
                                                    {

                                                        situacion.estado != 'prorroga' ?
                                                            <Panel header="Prorroga" style={customPanelStyle} key="3">

                                                                <Switch checkedChildren='SOLICITO' defaultChecked={(situacion.estado === 'prorroga') ? true : false} unCheckedChildren="NO AH SOLICITADO" onChange={(checked) => this.handleStatus(alumno.id, checked)} />
                                                            </Panel> : ''
                                                    }
                                                    <Panel header="Cancelar de residencia" style={customPanelStyle} key="4">
                                                        <Button style={{ background: '#FF0000', color: '#FAF2F1' }} >Cancelar residencia</Button>
                                                    </Panel>
                                                </Collapse>

                                            </div>
                                            :
                                            (<div  >

                                                {
                                                    (situacion.estado === 'activo' || situacion.estado === 'termino satisfactoriamente') ?

                                                        'Todo marcha bien ' :
                                                        <div  >
                                                            <h3>{situacion.estado === 'abandonado' ? 'C' : 'Prorroga o c'}ancelacion del proyecto de residencia </h3>
                                                            <Collapse bordered={true}>


                                                                <Panel header="Cancelar de residencia" style={customPanelStyle} key="2">
                                                                    <Button style={{ background: '#FF0000', color: '#FAF2F1' }} >Cancelar residencia</Button>
                                                                </Panel>
                                                            </Collapse>
                                                        </div>
                                                }


                                            </div>)
                                    }
                                </div>

                            </TabPane>
                            {
                                //  (  currentDate> anteproyecto.periodo.fecha_fin)?
                                true ?
                                    <TabPane tab={<span className="texto" ><Icon type="database" />Entregables</span>} key="4">
                                       <RadioButton className="botongenerarinformeseguimiento" icon="file-word" style={{backgroundColor:"#108ee8" }} ><a href={`/api/alumno/comprobante/${anteproyecto.id_alumno}/comprobante.docx`} target="_blank" style={{color:"#FBFBEF"}} >Generar informe</a> </RadioButton>

                                        <Col xs={24} lg={24}>
                                            <Table bordered title={() => 'Documentos a entregar'} dataSource={dataSourceEntregables} pagination={false} columns={columnsEntregables} />
                                        </Col>
                                    </TabPane> : ''
                            }
                        </Tabs>

                    </Col>

                </Row>
            </div >

        )
    }
}

const Informacion = Form.create({
    mapPropsToFields(props) {
        return {
            props,

        }
    }
})(FormInformacion);
export default Informacion;