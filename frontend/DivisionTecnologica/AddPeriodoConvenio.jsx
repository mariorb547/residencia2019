import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input,Icon, message, DatePicker, Upload} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;


import axios from 'axios';
import moment from 'moment';


const CreateFormAddSeguimiento= Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, normFile, beforeUpload, id_empresa,id_convenio} = props;
         const { getFieldDecorator} = form;
        const rangeConfigPeriodoSeguimiento = {
            rules: [{ type: 'array', required: true, message: 'Seleccione la fecha de inicio y fin del convenio' }],
        };  
        
        return(
            <Modal
                visible={visible}
                title="Agregar convenio a la empresa"
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical" style={{width: '100%'}}>
                    <FormItem
                        label="Seleccione la fecha de inicio y fin del tiempo del convenio"
                        style={{width: '100%'}}
                        >
                        {getFieldDecorator('fechas_seguimiento', rangeConfigPeriodoSeguimiento)(
                            <RangePicker format="ll" disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} />
                        )}
                    </FormItem>
                    <FormItem
                    label="Seleccione convenio digitalizado"
                >
                    <div className="dropbox">
                        {getFieldDecorator('file_convenio' , {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            rules: [{ required: true, message: 'se requiere el documento de convenio' } ]
                        })(
                            <Upload.Dragger
                                name="fileconvenio"
                                action={`/api/empresa/file_convenio/${id_convenio}`}
                                beforeUpload={beforeUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Da click para seleccionar o arrastra tu archivo .pdf</p>
                                <p className="ant-upload-hint">Tu archivo debe pesar menos de 10 MB.</p>
                            </Upload.Dragger>
                            )}
                    </div>
                </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormAddSeguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_convenio:props.id_convenio,
            id_empresa: props.id_empresa, 
            id_docente:props.id_docente,
            visible: props.visible,
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, id_empresa,id_docente,id_convenio} = nextProps;
        this.setState({
            id_empresa: id_empresa,
            id_convenio:id_convenio,
            id_docente:id_docente,
            visible: visible
        })
    }
    normFile = (e) => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    beforeUpload(file) {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
            message.error('El archivo debe ser PDF!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('El archivo debe tener un tamaño menor de 10 MB.');
        }
        return isPDF && isLt10M;
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

            const fecha_inicial = values.fechas_seguimiento[0].format('YYYY-MM-DD'),
                fecha_final = values.fechas_seguimiento[1].format('YYYY-MM-DD');
           
            axios.put('/api/empresa/convenio/actual', {
                fecha_inicial,
                fecha_final,
               id_convenio:this.state.id_convenio
            }).then(res => {
                if(res.status === 200 ){
                    message.success('Se agrego satisfactoriamente!')
                    form.resetFields();
                    this.props.onAddEmpresa();
                    this.setState({
                        visible: false
                    })
                    
                }else{
                    Modal.error({
                        title: 'Error al agregar el tiempo del periodo. Revisar los siguientes campos',
                        content:(
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk(){}, 
                    })
                }
            }).catch(err => {
                    message.error('Error en el servidor verificar con el encargado.');   
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render(){
        return(
            <div>
                <CreateFormAddSeguimiento
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    normFile={this.normFile}
                    beforeUpload={this.beforeUpload}
                    id_empresa={this.state.id_empresa}
                    id_convenio={this.state.id_convenio}
                />
            </div>
        )
    }
}
