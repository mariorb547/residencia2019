import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal, Form, Input, Radio, Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import uuid from 'uuid';
import axios from 'axios';
// import '../../styling.css';
var emisores=null;
const CreateFormAddFolios = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, numero } = props;
        const { getFieldDecorator } = form;
        const destinatarios=[];
         emisores?'':
        axios.get('/api/docentesGestion').then(res => {if(res.status == 200){emisores=res.data}})
            
        axios.get('/api/asesor_externos1').then(res => {
            if(res.status == 200){
                res.data.map((docente,index)=>{
                    destinatarios.push(<Option  key={index} value={`${docente.id_empresa}-Asesor-${docente.nombre}`}>{docente.nombre}</Option>)
                })
            }
        })
        axios.get('/api/empresa').then(res => {
            if(res.status == 200){
                 res.data.empresas.map((empresa,index)=>{ 
                    // destinatarios.push(<Option  key={index} value={`Titular-${empresa.titular.titulo}${empresa.titular.nombre}`}>{empresa.titular.titulo+""+empresa.titular.nombre}</Option>)
                    destinatarios.push(<Option  key={index+'A'} value={`${empresa.id}-Representante-${empresa.representante_legal.titulo}${empresa.representante_legal.nombre}`}>{empresa.representante_legal.titulo+""+empresa.representante_legal.nombre}</Option>)
                })
            }
        })
        return (
            <Modal
                visible={visible}
                title={`Agregar Folios`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}


            >

              <Form layout="vertical">
                    <FormItem label="Numero de folio Asignado">
                        {getFieldDecorator('numero_actual', {
                            rules: [{ required: true, message: 'El registro debe tener un numero de inicio de folios' }],
                            initialValue:numero
                        })(<Input type="number" disabled style={{ width: '100%' }} placeholder="Numero de inicio" />)}
                    </FormItem>
                    </Form>
                <Form layout="vertical">
                    <FormItem label="Seleccione el emisor "
                        style={{ width: '100%' }}
                        // hasFeedback
                    >
                        {getFieldDecorator('emisor', {
                            rules: [{ required: true, message: 'el registro necesita un emisor' }],
                        })(
                            
                            <Select   placeholder="Seleccione el Emisor">
                               {
                                   emisores?emisores.map((docente,index)=>{
                                    return <Option key={index} value={`${docente.id}`}>{`${docente.titulo} ${docente.nombre} ${docente.ap_paterno} ${docente.ap_materno}`}</Option>

                                   }):''
                               }
                                 
                            </Select>
                        )}
                    </FormItem>
                </Form>

                 <Form layout="vertical">
                    <FormItem label="Seleccione el Destinatario "
                        style={{ width: '100%' }}
                        // hasFeedback
                    >
                        {getFieldDecorator('destinatario', {
                            rules: [{ required: true, message: 'el registro necesita un destinatario' }]
                        })(
                            <Select placeholder="Seleccione el destinatario">
                                {destinatarios}
                                 
                            </Select>
                        )}
                    </FormItem>
                </Form>
                <Form layout="vertical">
                    <FormItem label="Escriba una breve descripcion">
                        {getFieldDecorator('descripcion', {
                            rules: [{ required: true, message: 'El registro debe tener una descripcion' }],
                        })(<Input type="text" style={{ width: '100%' }} placeholder="Escriba la descripcion" />)}
                    </FormItem>
                 
                </Form>

            </Modal>
        );
    })
)

export default class FormAddOficina extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            numero: props.numero,
            id_folio: props.id_folio,
            // emisores: props.emisores,

        }
    }
 
    componentWillReceiveProps(nextProps) {
        const { visible, numero, id_folio } = nextProps;
        this.setState({
            visible: visible,
            numero: numero,
            id_folio:id_folio,
            // emisores: emisores,

        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);

            // crear post al servidor
            var emisor=values.destinatario.split("-");
            axios.post('/api/folio/otros', {
                id_folio: this.state.id_folio,
                numero:this.state.numero,
                id_empresa:emisor[0],
                tipo:emisor[1],
                nombre_destinatario:emisor[2],
                id_emisor:values.emisor,
                descripcion:values.descripcion


            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    message.success("Folio consumido  satisfactoriamente")
                    this.props.recargar();
                    this.setState({ visible: false });
                    form.resetFields();
             
                } else {
                    Modal.error({
                        title: 'Error al consumir. Revisar los siguientes campos',
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
        return (
            <div  >
                <CreateFormAddFolios
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    numero={this.state.numero}
                    // emisores={this.emisores}


                />
            </div>
        )
    }
}
