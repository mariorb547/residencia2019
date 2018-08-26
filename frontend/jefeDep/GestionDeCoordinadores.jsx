import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, DatePicker, Button, message, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import axios from 'axios';
import moment from 'moment';

const CreateFormGestionDeCoordinadores = Form.create()(
    (props => {
        const { onCreate, form, carreras } = props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Form layout="vertical" onSubmit={onCreate} >
                    <Row>
                        <Col xs={24} lg={8}>
                            <FormItem label="Carrera" hasFeedback>
                                {getFieldDecorator('id_carrera', {
                                    rules: [{ required: true, message: 'Debe indicar la carrera' }]
                                })(
                                    <Select placeholder="Seleccione una carrera">
                                        {carreras.carreras.map((carrera, index) => {
                                            return (<Option key={index} value={`${carrera.id}`}>{carrera.nombre}</Option>)
                                        })}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={18} lg={8}>
                            <FormItem label="Periodo de residencia" hasFeedback>
                                {getFieldDecorator('periodo', {
                                    rules: [{ required: true, message: 'Debe poner el nombre del Coordinador de la carrera' }]
                                })(
                                    <Input addonBefore={
                                        <Select placeholder="ING." style={{ width: 70 }}>

                                            <Option key="1" value="ISC">MTRO.</Option>
                                            <Option key="2" value="INF">LIC.</Option>
                                            <Option key="3" value="IGE">MTRA.</Option>
                                            <Option key="4" value="IC">DR.</Option>

                                        </Select>
                                    } placeholder="Ingrese el nombre del Coordinador" type="text" style={{ width: 500 }} />

                                    )}
                            </FormItem>
                        </Col>

                    </Row>

                    <Button icon="save" type="primary" htmlType="submit" style={{ marginTop: 20, marginBottom: 20 }}>
                        Actualizar
                    </Button>
                </Form>
            </div>
        )
    })
)
export default class GestionDeCoordinadores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carreras: props.carreras
        }
    }
    handleCreate = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }




        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        const { carreras } = this.state
        console.log(".c.c..c.c.c.c.c", carreras);
        return (

            <div>
                <CreateFormGestionDeCoordinadores
                    ref={this.saveFormRef}
                    onCreate={this.handleCreate}
                    carreras={carreras}
                // checkPeriodoEntregaAnteproyecto={this.checkPeriodoEntregaAnteproyecto}
                />
            </div>
            // <Form
            //     layout="vertical"
            // >
            //     <FormItem
            //         label="Carrera" hasFeedback
            //     >
            //         <Select placeholder="Seleccione una carrera" style={{ width: 500 }}>

            //         {carreras.carreras.map((carrera, index) => {
            //             return (<Option key={index} value={`${carrera.id}`}>{carrera.nombre}</Option>)
            //         })}

            //         </Select>
            //     </FormItem>
            //     <FormItem
            //         label="Coordinador"

            //     >


            //         <Input addonBefore={
            //             <Select placeholder="ING." style={{ width: 70 }}>

            //             <Option key="1" value="ISC">MTRO.</Option>
            //             <Option key="2" value="INF">LIC.</Option>
            //             <Option key="3" value="IGE">MTRA.</Option>
            //             <Option key="4" value="IC">DR.</Option>

            //         </Select>
            //         } placeholder="Ingrese el nombre del Coordinador" type="text"  style={{ width: 500 }}/>

            //     </FormItem>
            //     <Button icon="sync" type="primary" htmlType="submit" style={{marginTop: 20, marginBottom: 20}}>
            //             Actualizar Informacion
            //         </Button>
            // </Form>
        )
    }
}