import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, DatePicker, Button, message, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import axios from 'axios';
import moment from 'moment';

const CreateFormAperturaPeriodoDeResidencia = Form.create()(
    (props => {
        const { onCreate, form, carreras, checkPeriodoEntregaAnteproyecto } = props;
        const { getFieldDecorator } = form;
        var yearIterator = 2017;
        const rangeConfigPeriodoResidencia = {
            rules: [{ type: 'array', required: true, message: 'Seleccione la fecha de inicio y fin del periodo' }],
        };
        // {validator: checkPeriodoEntregaAnteproyecto},
        const rangeConfigPeriodoEntregaAnteproyecto = {
            rules: [{ validator: checkPeriodoEntregaAnteproyecto }, { type: 'array', required: true, message: 'Seleccione la fecha de inicio y fin del periodo' }],
        };
        return (
            <div>
                <Form layout="vertical" onSubmit={onCreate}>

                    <Row gutter={16}>
                    <h1>Perido de residencia</h1>
                        <Col xs={18} lg={8}>
                            <FormItem label="Periodo" hasFeedback>
                                {getFieldDecorator('periodo', {
                                    rules: [{ required: true, message: 'Debe indicar el periodo de la residencia' }]
                                })(
                                    <Select placeholder="Seleccione un periodo">
                                        <Option value="FEBRERO-JUNIO">FEBRERO-JUNIO</Option>
                                        <Option value="AGOSTO-DICIEMBRE">AGOSTO-DICIEMBRE</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={6} lg={4}>
                            <FormItem label="Ciclo" hasFeedback>
                                {getFieldDecorator('ciclo', {
                                    rules: [{ required: true, message: 'Debe indicar el ciclo de la residencia' }]
                                })(
                                    <Select placeholder="Seleccione un ciclo">
                                        {Array(50).fill(1).map((e, i) => {
                                            yearIterator++;
                                            return <Option key={i} value={`${yearIterator}`}>{yearIterator}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} lg={8}>
                            <FormItem
                                label="Seleccione la fecha de inicio y fin del periodo"
                                style={{ width: '100%' }}
                            >
                                {getFieldDecorator('fechas_periodo', rangeConfigPeriodoResidencia)(
                                    <RangePicker format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={24} lg={8}>
                            <FormItem
                                label="Seleccione la fecha de inicio y fin de la entrega de anteproyectos"
                            >
                                {getFieldDecorator('fechas_entrega_anteproyecto', rangeConfigPeriodoEntregaAnteproyecto)(
                                    <RangePicker format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <h1>Fecha de turno de dictamen para los presidentes academicos </h1>
                        <Col xs={24} lg={12}>
                            <FormItem
                                label="Seleccione la fecha de inicio y fin de de turno de dictamen para los presidentes academicos"
                            >
                                {getFieldDecorator('fechas_entrega_dictamen',{
                                    rules:[{required:true, message:'Debe indicar una fecha para  los dictamentes'}]
                                })(
                                    <RangePicker format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <h1>Fechas de Conclusión </h1>
                        <Col xs={24} lg={12}>
                            <FormItem
                                label="Seleccione la fecha de inicio y fin para la liberacion del asesor interno"
                            >
                                {getFieldDecorator('fechas_entrega_liberacion_interno',{
                                     rules:[{required:true, message:'Debe indicar una fecha para la liberacion del asesor interno'}]
                                })(
                                    <RangePicker format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                                )}
                            </FormItem>
                        </Col>
                     
                    <Col xs={24} lg={12}>
                        <FormItem
                            label="Seleccione la fecha de inicio y fin para la liberacion del asesor externo"
                            >
                            {getFieldDecorator('fechas_entrega_liberacion_externo',{
                                 rules:[{required:true, message:'Debe indicar una fecha para  la liberacion del asesor externo'}]
                            })(
                                <RangePicker  format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                            )}
                        </FormItem>
                        </Col>
                        </Row>
                        <Row>
                    <Col xs={24} lg={12}>
                        <FormItem
                            label="Seleccione la fecha de inicio y fin para Emitir la Evolucion final"
                            >
                            {getFieldDecorator('fechas_emitir_evolucion_final',{
                                 rules:[{required:true, message:'Debe indicar una fecha para Emitir la  evolucion final'}]
                            })(
                                <RangePicker  format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                            )}
                        </FormItem>
                        </Col>
                        
                    <Col xs={24} lg={12}>
                        <FormItem
                            label="Seleccione la fecha de inicio y fin  para la liberacion de la empresa"
                            >
                            {getFieldDecorator('fecha_entrega_empresa',{
                                 rules:[{required:true, message:'Debe indicar una fecha para la liberacion de la empresa'}]
                            })(
                                <RangePicker  format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                            )}
                        </FormItem>
                        </Col>
                        
                    <Col xs={24} lg={12}>
                        <FormItem
                            label="Seleccione la fecha de inicio y fin  para la liberacion de la empresa"
                            >
                            {getFieldDecorator('fechas_liberacion',{
                                 rules:[{required:true, message:'Debe indicar una fecha para  la liberacion de la empresa'}]
                            })(
                                <RangePicker  format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                            )}
                        </FormItem>
                        </Col>
                        </Row>
                    <Button icon="save" type="primary" htmlType="submit" style={{ marginTop: 20, marginBottom: 20 }}>
                        Aperturar periodo
                    </Button>
                </Form>
            </div>
        )
    })
)
export default class FormAperturaPeriodoDeResidencia extends Component {
    constructor() {
        super();
        this.state = {
            carreras: null,
        }
    }
    checkPeriodoEntregaAnteproyecto = (rule, value, callback) => {
        const form = this.form;
        const fechas_periodo = form.getFieldValue('fechas_periodo');
        console.log(value)
        console.log(fechas_periodo)
        if (fechas_periodo) {
            // console.log(value[0].format('YYYY-MM-DD') < fechas_periodo[0].format('YYYY-MM-DD'));
            // console.log(value[0].valueOf() < fechas_periodo[0].valueOf());
            // console.log('aqui',value[0].format('YYYY-MM-DD') < fechas_periodo[0].format('YYYY-MM-DD'))
            if (value[0].format('YYYY-MM-DD') < fechas_periodo[0].format('YYYY-MM-DD')) {
                callback(`La fecha de inicio de entrega de anteproyecto debe ser despues de: ${fechas_periodo[0].format('ll')}`);
            } else if (value[1].format('YYYY-MM-DD') > fechas_periodo[1].format('YYYY-MM-DD')) {
                callback(`La fecha de fin de entrega de anteproyecto debe ser antes que: ${fechas_periodo[1].format('ll')}`);

            } else {
                callback();
            }
        } else {
            callback('Primero seleccione la fecha del periodo.')
        }

    }
    handleCreate = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            const
                id_carrera = values.id_carrera,
                periodo_residencia = values.periodo,
                ciclo = values.ciclo,
                fechas_periodo = [values.fechas_periodo[0].format('YYYY-MM-DD'), values.fechas_periodo[1].format('YYYY-MM-DD')],
                fechas_entrega_anteproyecto = [values.fechas_entrega_anteproyecto[0].format('YYYY-MM-DD'), values.fechas_entrega_anteproyecto[1].format('YYYY-MM-DD')],
                fechas_dictamen =[values.fechas_entrega_dictamen[0].format('YYYY-MM-DD'), values.fechas_entrega_dictamen[1].format('YYYY-MM-DD')],
                fechas_liberacion_asesor_interno =[values.fechas_entrega_liberacion_interno[0].format('YYYY-MM-DD'), values.fechas_entrega_liberacion_interno[1].format('YYYY-MM-DD')],
                fechas_liberacion_asesor_externo =[values.fechas_entrega_liberacion_externo[0].format('YYYY-MM-DD'), values.fechas_entrega_liberacion_externo[1].format('YYYY-MM-DD')],
            //////////////7--------------
            fechas_emitir_evolucion_final =[values.fechas_emitir_evolucion_final[0].format('YYYY-MM-DD'), values.fechas_emitir_evolucion_final[1].format('YYYY-MM-DD')],
            fechas_entrega_empresa =[values.fecha_entrega_empresa[0].format('YYYY-MM-DD'), values.fecha_entrega_empresa[1].format('YYYY-MM-DD')],
            fechas_liberacion_empresa =[values.fechas_liberacion[0].format('YYYY-MM-DD'), values.fechas_liberacion[1].format('YYYY-MM-DD')];
  

            axios.post('/api/carrera/periodos', {

                periodo_residencia,
                ciclo,
                fechas_periodo,
                fechas_entrega_anteproyecto,
                fechas_dictamen,
                fechas_liberacion_asesor_interno,
                fechas_liberacion_asesor_externo,
                fechas_emitir_evolucion_final,
                fechas_entrega_empresa,
                fechas_liberacion_empresa

            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    form.resetFields();
                    message.success("Periodo agregado satisfactoriamente!")
                } else {
                    Modal.error({
                        title: 'Error al guardar el el periodo. Revisar los siguientes campos',
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



        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { carreras } = this.state
        return (
            <div>
                <CreateFormAperturaPeriodoDeResidencia
                    ref={this.saveFormRef}
                    onCreate={this.handleCreate}
                    carreras={carreras}
                    checkPeriodoEntregaAnteproyecto={this.checkPeriodoEntregaAnteproyecto}
                />
            </div>
        )
    }
}