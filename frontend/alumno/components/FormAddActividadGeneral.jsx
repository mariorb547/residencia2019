import React, {Component} from 'react';
import {render} from 'react-dom';
import {TreeSelect,Button, Modal, Form, Input, Radio,Select, Icon, message, Tabs, Timeline, Tooltip, DatePicker, AutoComplete,Row, Col,Menu, Dropdown, InputNumber, Alert } from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import axios from 'axios';
import moment from 'moment';

//import FormAddSubactividad from './FormAddSubactividad.jsx';


const CreateFormAddActividadGeneral = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, carrera, alumnos_rechazados, addToPeriodo} = props;
        const { getFieldDecorator} = form;
        const menu = (
            <Menu onClick={onClick}>
              <Menu.Item key="1">Incremental</Menu.Item>
              <Menu.Item key="2">RUP</Menu.Item>
              <Menu.Item key="3">Prototipos</Menu.Item>
            </Menu>
          );
          function onChange(value) {
            console.log('changed', value);
          }
          
          const onClick = ({ key }) => {
            message.info(`Click on item ${key}`);
          }; 
       
          const Add = props => {
              return(
                <Col span={24}>
                <FormItem label="Modelo de desarrollo">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                    Metodología <Icon type="down" />
                    </a>
                </Dropdown>
                </FormItem>
            </Col>
              )
          }
         
        
          
        // console.warn(alumnos_rechazados)
        return(
            <Modal
                visible={visible}
                title={`Registrar asesoría`}
                //okText="Guardar"
                onCancel={onCancel}
                width={1000}
                
            >
                <Form layout="vertical">
                    <Row>
                        
                        
                        <Col span={20}>
                            <FormItem label="Actividad principal">
                                {getFieldDecorator('actividad_principal', {
                                    rules: [{required: true, message: 'Actividad principal es obligatoria.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Actividad Principal"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem label="Nueva actividad ">
                                 <Button type="primary">Generar</Button>
    
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem label="Objetivo">
                                {getFieldDecorator('objetivo', {
                                    rules: [{required: true, message: 'Objetivo es obligatorio.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Objetivo"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem label="Entregable">
                                {getFieldDecorator('entregable', {
                                    rules: [{required: true, message: 'Entregable es obligatorio.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Entregable"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        <Col span={20}>
                        <FormItem label="Subactividades">
                       
                        </FormItem>
                        </Col>
                        <Col span={20}>
                        <FormItem label="Actividad">
                                {getFieldDecorator('actividad', {
                                    rules: [{required: true, message: 'Actividad es obligatoria.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Actividad"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        
                        <Col span={4}>
                            <FormItem label="Nueva actividad">
                                 <Button type="primary">Generar</Button>
    
                            </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="Tarea">
                                {getFieldDecorator('tarea', {
                                    rules: [{required: true, message: 'Tarea es obligatoria.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Tarea"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        <Col span={6}>
                        <FormItem label="Entregable">
                                {getFieldDecorator('entregable', {
                                    rules: [{required: true, message: 'Entregable es obligatoria.'}]
                                })(
                                    <Input  prefix={<Icon type="laptop" style={{ fontSize: 12 }} />} placeholder="Entregable"/>
                                )
                                }
                            </FormItem>
                        </Col>
                        <Col span={2}>
                            <FormItem label="Horas">
                                 <InputNumber min={1} max={50} defaultValue={3} onChange={onChange} />
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem label="Fecha entrega">
                            <DatePicker onChange={onChange} />
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem label="Nueva tarea">
                                 <Button type="primary">Generar</Button>
    
                            </FormItem>
                        </Col>
                        

                    </Row>

                    
                   
                    
                </Form>
            </Modal>
        );
    })
)

export default class FormAddActividadGeneral extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            proyecto: props.proyecto,
            
        }
        
    }
    componentWillReceiveProps(nextProps) {
        const {visible, proyecto, usuario} = nextProps;
        this.setState({
            visible,
            proyecto,
        })
    }
  
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        const form = this.form;
        form.resetFields();
        this.setState({ visible: false });

    }
    handleCreate = () => {
        const {proyecto} = this.state
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }            
            // crear post al servidor
            axios.post('/api/proyecto/asesoria', {
                id_proyecto: proyecto.id,
                id_asesor_interno: proyecto.anteproyecto.id_asesor_interno,
                fecha: values.fecha,
                url_avance: values.url_avance,
                temas_a_asesorar: values.temas_a_asesorar
            }).then((res) => {
                // console.log(res)
                if(res.status === 200){
                    message.success("Asesoría registrada satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.updateAsesorias();
                }else{
                    Modal.error({
                        title: 'Error al registrar asesoría. Revisar los siguientes campos',
                        content:(
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk(){}, 
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
   
      
    render(){
        // console.warn(this.state.proyecto)
        return(
            <div>

                <CreateFormAddActividadGeneral
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    //onCreate={this.handleCreate}
                />
                  <Button type="primary" >Nueva actividad </Button>
                 
            </div>
        )
    }
}
