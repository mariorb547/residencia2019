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
         
       
        return (
            <Modal
                visible={visible}
                title={`Reservar folios`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}


            >

              <Form layout="vertical">
                    <FormItem label="Numero de folio actual">
                        {getFieldDecorator('folio_inicio', {
                            rules: [{ required: true, message: 'El registro debe tener un numero de inicio de folios' }],
                            initialValue:numero
                        })(<Input type="number" disabled style={{ width: '100%' }} placeholder="Numero de inicio" />)}
                    </FormItem>
                    </Form>
                <Form layout="vertical">
                    <FormItem label="Numero estimado a reservar de folios">
                        {getFieldDecorator('folio_termino', {
                            rules: [{ required: true, message: 'El registro debe terner un numero de folio termino' }],
                            
                        })(<Input type="number"   style={{ width: '100%' }} placeholder="Numero de inicio" />)}
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
            
             if(values.folio_termino>0){
                axios.post('/api/folio/residentes', {
                    id_folio: this.state.id_folio,
                    folio_inicio:values.folio_inicio,
                    folio_actual:values.folio_inicio,
                    folio_termino:(parseInt(values.folio_inicio)+parseInt(values.folio_termino))
    
    
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
             }else{
                 message.warning('Advertencia el numero de folios a reservar debe ser mayor a cero')
             }
           
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
