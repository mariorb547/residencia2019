import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal, Form, Input, Radio, Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import '../../styling.css';
import axios from 'axios';
const CreateFormDepartamento = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, carrera, docentes, carreras, idcarrera } = props;
        console.log('===>-_-', idcarrera)
        const { getFieldDecorator } = form;

        
        var encargado = null
        if (carrera)
        encargado = carrera.find(carrera => carrera.rol === 'encargado') || null;
       
        var carreranombre = null
        if (carreras){
            carreras.oficinas.map((carrera,key)=>{
                console.log(carrera.id,carrera.nombre)
                if(carrera.id === idcarrera){
                  return   carreranombre= carrera.nombre;
                }
            })
        }
            
        return (
            <Modal
                visible={visible}
                title="Editar oficina"
                okText="Actualizar"
                onCancel={onCancel}
                onOk={onCreate}
                width={600}
                className="full-width"
            >
                <Form layout="vertical">
                    <FormItem label="Nombre de la Oficina" initialValue="" hasFeedback>
                        {getFieldDecorator('nombre_carrera', {
                            rules: [{ required: true, message: 'La Oficina debe tener un nombre.' }],
                            initialValue: carreranombre ? carreranombre : null
                        })(<Input type="mayuscula" placeholder="Nombre de la Oficina" />)}
                    </FormItem>
                    <FormItem
                        label="Seleccione al encargado de la oficina"
                        hasFeedback
                    >
                        {getFieldDecorator('id_coordinador', {
                            rules: [
                                { required: true, message: 'La ofcina debe tener un encargado.' },
                            ], initialValue: encargado ? `${docentes.find(docentes => docentes.id === encargado.id_docente).id}` : null
                        })(
                            <Select placeholder="Seleccione un docente">
                                {docentes ?
                                    docentes.map((docente, index) => {
                                        return <Option key={index} value={`${docente.id}`}>{`${docente.titulo} ${docente.nombre} ${docente.ap_paterno} ${docente.ap_materno}`}</Option>
                                    }) : ''
                                }

                            </Select>
                            )}
                    </FormItem>

                </Form>

            </Modal>
        );
    })
)

export default class FormDepartamento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            carrera: props.carrera,
            docentes: props.docentes,
            carreras: props.carreras,
            idcarrera: props.idcarrera,
        }
    }
    componentWillReceiveProps(nextProps) {
        const { visible, carrera, docentes, carreras, idcarrera } = nextProps;
        this.setState({
            visible,
            carrera,
            docentes,
            carreras,
            idcarrera,
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        const form = this.form;
        form.resetFields();

    }
    handleCreate = () => {
        const form = this.form;
        const { idcarrera } = this.state
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.put(`/api/oficinaD/${idcarrera}`, {
                nombre: values.nombre_carrera,
                id_coordinador: values.id_coordinador,
            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    form.resetFields();
                    message.success("Oficina actualizado satisfactoriamente")
                    this.setState({ visible: false });
                    this.props.onReloadDepartamentos();
                } else {
                    Modal.error({
                        title: 'Error al actualizar la oficina. Revisar los siguientes campos',
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
        const { carrera, docentes, carreras, idcarrera } = this.state
        return (
            <div>
                <CreateFormDepartamento
                    carrera={carrera}
                    docentes={docentes}
                    carreras={carreras}
                    idcarrera={idcarrera}
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
