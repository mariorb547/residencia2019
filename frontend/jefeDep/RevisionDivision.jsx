import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input,Icon, message, Upload, Collapse, Badge, Alert} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const {Panel} = Collapse;
import axios from 'axios';
import moment from 'moment';

class FormSeguimiento extends Component{
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            axios.put('/api/proyecto/seguimiento',{
                id_seguimiento: this.props.seguimiento.id,
                url_seguimiento: values.url_seguimiento
            }).then(res => {
                if(res.status === 200){
                    message.success('Seguimiento actualizado satisfactoriamente');
                }else{
                    message.error('Error al actualizar al seguimiento, favor de reportar al administrador.')
                }
            })
          }
        });
      }
    render(){
        const {getFieldDecorator} = this.props.form;
        const {seguimiento} = this.props
        const panelStyleSolucionado = {
            background: '#f4f8f9',
            borderRadius: 10,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
          };
        // console.log('aui', seguimiento)
        return (
            <div>
                <Form onSubmit={this.handleSubmit} >
                    
                </Form>
                 
                
                 
            </div>

        )
    }
}

const WrappedFormSeguimiento = Form.create({
    mapPropsToFields(props) {
      return {
        props
      }
    }
  })(FormSeguimiento);
export default WrappedFormSeguimiento;