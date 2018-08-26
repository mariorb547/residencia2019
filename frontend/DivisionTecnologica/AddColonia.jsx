import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';
// import '../../styling.css';
const CreateformAddColonia = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator} = form;
        return(
            <Modal
                visible={visible}
                title={`Agregar Colonia`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Escribe la colonia ">
                        {getFieldDecorator('nombre', {
                            rules: [{required: true, message: 'La colonia debe tener un nombre'}]
                        })(<Input type="mayuscula" style={{ width: '100%' }} placeholder="Nombre de la colonia"/>)}
                    </FormItem>
                </Form>

            </Modal>
        );
    })
)

export default class FormAddColonia extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
           
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;
        this.setState({
            visible: visible,
       
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        // this.props.onload();
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            
            // crear post al servidor
            axios.post('/api/colonia', {
                nombre: values.nombre,
                
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    message.success("Colonia agregada satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    // this.props.onload();
                }else{
                    Modal.error({
                        title: 'Error al guardar la colonia. Revisar los siguientes campos',
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
        return(
            <div>
                    <CreateformAddColonia
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    
                />
            </div>
        )
    }
}
