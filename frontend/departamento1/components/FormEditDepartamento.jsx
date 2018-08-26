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

        
        var coordinador = null
        if (carrera)
            coordinador = carrera.find(carrera => carrera.rol === 'coordinador_carrera') || null;
        coordinador ? console.log("---", coordinador.carrera.nombre, "El coordinador ") : ''
        var carreranombre = null
        if (carreras){
            carreras.carreras.map((carrera,key)=>{
                console.log(carrera.id,carrera.nombre)
                if(carrera.id === idcarrera){
                  return   carreranombre= carrera.nombre;
                }
            })
        }
            
        return (
            <Modal
                visible={visible}
                title="Editar Carrera"
                okText="Actualizar"
                onCancel={onCancel}
                onOk={onCreate}
                width={600}
                className="full-width"
            >
                <Form layout="vertical">
                    <FormItem label="Nombre de la carrera" initialValue="" hasFeedback>
                        {getFieldDecorator('nombre_carrera', {
                            rules: [{ required: true, message: 'La carrera debe tener un nombre.' }],
                            initialValue: carreranombre ? carreranombre : null
                        })(<Input type="mayuscula" placeholder="Nombre de la carrera" />)}
                    </FormItem>
                    <FormItem
                        label="Seleccione al coordinador de la carrera"
                        hasFeedback
                    >
                        {getFieldDecorator('id_coordinador', {
                            rules: [
                                { required: true, message: 'La carrera debe tener un coordinador.' },
                            ], initialValue: coordinador ? `${docentes.find(docentes => docentes.id === coordinador.id_docente).id}` : null
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
            axios.put(`/api/carreraD/${idcarrera}`, {
                nombre: values.nombre_carrera,
                id_coordinador: values.id_coordinador,
            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    form.resetFields();
                    message.success("Carrera actualizado satisfactoriamente")
                    this.setState({ visible: false });
                    this.props.onReloadDepartamentos();
                } else {
                    Modal.error({
                        title: 'Error al actualizar el departzamento. Revisar los siguientes campos',
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
