import React, { Component } from 'react';
import { TreeSelect, Form, Tooltip, Select, Row, Col, Icon, Input, Upload, message, Button, Modal, Badge, Collapse, Alert, Popover, Radio } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

import axios from 'axios';
import moment from 'moment';
import '../../styling.css';
////sss
const CreateRegistrarEmpresa = Form.create()(
    (props => {
        const { handleSubmit, visible, onCancel, onCreate, form, normFile, beforeUpload, id_empresa } = props;
        const { getFieldDecorator } = form;
      const puestos = [],titulos=[],colonias=[];
      axios.get('/api/puesto')
      .then(res => {
          if(res.status == 200){
              res.data.map((puesto,index)=>{
                  puestos.push(<Option key={index} value={`${puesto.nombre}`}>{puesto.nombre}</Option>)
              })
          }
      })
      axios.get('/api/titulo')
      .then(res => {
          if(res.status == 200){
              res.data.map((titulo,index)=>{
                  titulos.push(<Option key={index} value={`${titulo.nombre}`}>{titulo.nombre}</Option>)
              })
          }
      })
      axios.get('/api/colonia')
      .then(res => {
          if(res.status == 200){
              res.data.map((colonia,index)=>{
                  colonias.push(<Option key={index} value={`${colonia.nombre}`}>{colonia.nombre}</Option>)
              })
          }
      })

        const prefixSelectorTituloTitular = getFieldDecorator('titulo_titular', {
            initialValue: 'ING.',
        })(
            <Select style={{ width: 80 }}>
                {/* <Option value="ING.">ING.</Option>
                <Option value="DR.">DR.</Option>
                <Option value="DRA.">DRA.</Option>
                <Option value="MTRO.">MTRO.</Option>
                <Option value="M.A.">M.A.</Option>
                <Option value="DIR.">DIR.</Option>
                <Option value="DIRA.">DIRA.</Option>
                <Option value="LIC.">LIC.</Option>
                <Option value="ISC.">ISC.</Option>
                <Option value="ISI.">ISI.</Option>
                <Option value="MAI.">MAI.</Option>
                <Option value="MBT.">MTB.</Option>
                <Option value="MCT.">MCT.</Option>
                <Option value="MTI.">MTI.</Option>
                <Option value="M.A.T.I.">M.A.T.I.</Option>
                <Option value="M.C.">M.C.</Option> */}
                {
                    titulos
                }
            </Select>
        );
        const prefixSelectorTituloFirmaElAcuerdo = getFieldDecorator('titulo_firma_acuerdo', {
            initialValue: 'ING.',
        })(
            <Select style={{ width: 80 }}>
                {/* <Option value="ING.">ING.</Option>
                <Option value="DR.">DR.</Option>
                <Option value="DRA.">DRA.</Option>
                <Option value="MTRO.">MTRO.</Option>
                <Option value="M.A.">M.A.</Option>
                <Option value="DIR.">DIR.</Option>
                <Option value="DIRA.">DIRA.</Option>
                <Option value="LIC.">LIC.</Option>
                <Option value="ISC.">ISC.</Option>
                <Option value="ISI.">ISI.</Option>
                <Option value="MAI.">MAI.</Option>
                <Option value="MBT.">MTB.</Option>
                <Option value="MCT.">MCT.</Option>
                <Option value="MTI.">MTI.</Option>
                <Option value="M.A.T.I.">M.A.T.I.</Option>
                <Option value="M.C.">M.C.</Option> */}
                {
                    titulos
                }
            </Select>
        );
        return (

            <Form layout="vertical" onSubmit={handleSubmit}>
                <Row gutter={16}>
                    <Col lg={14} xs={24} >
                        <FormItem label="Nombre de la empresa" hasFeedback>
                            {getFieldDecorator('nombre_empresa', {
                                rules: [{ required: true, message: 'La empresa debe tener un nombre.' }, { max: 200, message: 'El nombre de la empresa no debe pasar los 200 caracteres.' },]
                            })(<Input type="mayuscula" placeholder="Nombre de la empresa" />)}
                        </FormItem>
                    </Col>
                    <Col lg={10} xs={24} >
                        <FormItem
                            label="Seleccione la clasificación de la empresa"
                            hasFeedback
                        >
                            {getFieldDecorator('clasificacion', {
                                rules: [
                                    { required: true, message: 'Indique la clasificación de la empresa' },
                                ],
                            })(
                                <Select placeholder="Selecciona la clasificación de la empresa">
                                    <Option value="industrial">Industrial</Option>
                                    <Option value="servicios">Servicios</Option>
                                    <Option value="público">Público</Option>
                                    <Option value="privado">Privado</Option>
                                    {/* {
                                        puestos
                                    } */}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="RFC" hasFeedback>
                    {getFieldDecorator('rfc', {
                        rules: [{ required: true, message: 'La empresa debe tener un RFC' }, { min: 12, message: 'El RFC debe tener minimo 12 caracteres' }, { max: 13, message: 'El RFC debe tener maximo 12 caracteres' }]
                    })(<Input type="mayuscula" placeholder="RFC de la empresa" />)}
                </FormItem>
                <Row gutter={16}>
                    <Col xs={24} lg={12}>
                        <FormItem label="Domicilio" hasFeedback>
                            {getFieldDecorator('domicilio', {
                                rules: [{ max: 100, message: 'El domicilio solo debe tener 100 caracteres' }]
                            })(<Input type="mayuscula" placeholder="Domicilio de la empresa" />)}
                        </FormItem>
                    </Col>
                    <Col xs={24} lg={12}>
                        <FormItem label="Colonia" hasFeedback>
                            {getFieldDecorator('colonia', {
                                rules: [{ max: 100, message: 'La colonia solo debe tener 100 caracteres' }]
                            })( <Select placeholder="Seleccione la colonia">
                            
                            {
                                colonias
                            }
                        </Select>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>   
                    <Col lg={12} xs={24} >
                        <FormItem label="Codigo postal" hasFeedback>
                            {getFieldDecorator('codigo_postal', {
                                rules: [{ len: 5, message: 'El codigo postal solo debe tener 5 caracteres' }]
                            })(<Input type="mayuscula" placeholder="Codigo postal de la empresa" />)}
                        </FormItem>
                    </Col>
                    <Col lg={12} xs={24} >
                        <FormItem label="Fax" hasFeedback>
                            {getFieldDecorator('fax', {
                                rules: [{ max: 15, message: 'El fax debe tener como maximo 15 caracteres' }]
                            })(<Input placeholder="Fax de la empresa" />)}
                        </FormItem>
                    </Col>
                    <Col lg={24} xs={24} >
                        <FormItem label="Misión de la empresa" hasFeedback>
                            {getFieldDecorator('mision', {
                                rules: [{ max: 600, message: 'La misión debe tener como maximo 600 caracteres' }]
                            })(<Input.TextArea className="textarea" placeholder="Misión de la empresa" autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6} lg={6}>
                        <FormItem label="Puesto del titular" hasFeedback>
                            {getFieldDecorator('puesto_titular', {
                                rules: [{ required: true, message: 'El titular debe tener un puesto.' }, { max: 100, message: 'El puesto del titular no debe ser mayor a 100 caracteres' },]
                            })(  <Select placeholder="Seleccione el puesto">
                            
                            {
                                puestos
                            }
                        </Select>)}
                        </FormItem>
                    </Col>
                    <Col xs={18} lg={18}>
                        <FormItem label="Nombre completo del titular" hasFeedback>
                            {getFieldDecorator('nombre_titular', {
                                rules: [{ required: true, message: 'El titular debe tener un nombre.' }, { max: 100, message: 'El nombre del titular no debe ser mayor a 100 caracteres' },]
                            })(<Input type="mayuscula" addonBefore={prefixSelectorTituloTitular} placeholder="Nombre completo del titular" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6} lg={6}>
                        <FormItem label="Puesto del que firma el acuerdo" hasFeedback>
                            {getFieldDecorator('puesto_firma_acuerdo', {
                                rules: [{ required: true, message: 'El que firma el acuerdo debe tener un puesto.' }, { max: 100, message: 'El puesto del del que firma el acuerdo no debe ser mayor a 100 caracteres' },]
                            })( 
                                <Select placeholder="Selecciona el puesto">
                              
                                { puestos}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={18} lg={18}>
                        <FormItem label="Nombre completo del que firma el acuerdo de colaboración" hasFeedback>
                            {getFieldDecorator('nombre_firma_acuerdo', {
                                rules: [{ required: true, message: 'El que firma el acuerdo debe tener un nombre.' }, { max: 100, message: 'El nombre completo del que firma el acuerdo  no debe ser mayor a 100 caracteres' },]
                            })(<Input type="mayuscula" addonBefore={prefixSelectorTituloFirmaElAcuerdo} placeholder="Nombre completo del que firma el acuerdo de colaboración" />)}
                        </FormItem>

                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6} lg={6}>

                        <FormItem label="Ingrese numero telefonico de la empresa" hasFeedback>
                            {getFieldDecorator('telefono', {
                                rules: [{ required: true, message: 'la empresa necesita un telefono' }]
                            })(<Input  type="phone" placeholder="Ingrese el telefono oficial de la empresa" />)}
                        </FormItem>
                    </Col>
                    <Col xs={18} lg={18}>
                        <FormItem label="Ingrese correo electronico de la empresa" hasFeedback>
                            {getFieldDecorator('correo', {
                                rules: [{ required: true, message: 'la empresa necesita un correo' }]
                            })(<Input type="email" placeholder="Ingrese el correo oficial de la empresa" />)}
                        </FormItem>

                    </Col>
                </Row>
                <Col xs={18} lg={18}>
                    <FormItem
                        label="Seleccione Documento de verificación de empresa"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('file_comprobacion', {
                                valuePropName: 'fileList',
                                getValueFromEvent: normFile,
                                rules: [{ required: true, message: 'se requiere el documento de comprobación' }]
                            })(
                                <Upload.Dragger
                                    name="filecomprobante"
                                    action={`/api/alumno/file_comprobante/${id_empresa}`}
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
                    <Button size="large" icon="save" type="primary" htmlType="submit" style={{ marginTop: 40, marginBottom: 20 }}>
                        Guardar cambios
                </Button>
                </Col>



            </Form>


        );
    })
)

export default class RegistrarEmpresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_empresa: props.id_empresa,
            value: 1,
        }
    }
    componentWillReceiveProps(nextProps) {
        const { id_empresa } = nextProps;
        this.setState({
            id_empresa: id_empresa,

        })
    }
    componentDidMount() {

    }
    // FUNCTIONS UPLOAD FILE
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

    // END FUNCTIONS UPLOAD FILE
    saveFormRef = (form) => {
        this.form = form;
    }
    handleSubmit = (e) => {
        const { id_empresa } = this.state;
        e.preventDefault();
        const form = this.form;
        const { anteproyecto } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            axios.put(`/api/empresa/nueva/registro/${id_empresa}`, {
                nombre: values.nombre_empresa,
                rfc: values.rfc,
                domicilio: values.domicilio || '',
                colonia: values.colonia || '',
                codigo_postal: values.codigo_postal || '',
                fax: values.fax || '',
                mision: values.mision || '',
                // id_titular: empresa.titular.id,
                titulo_titular: values.titulo_titular,
                puesto_titular: values.puesto_titular,
                nombre_titular: `${values.nombre_titular}`,
                // id_firma_acuerdo: empresa.representante_legal.id,
                titulo_firma_acuerdo: values.titulo_firma_acuerdo,
                puesto_firma_acuerdo: values.puesto_firma_acuerdo,
                nombre_firma_acuerdo: `${values.nombre_firma_acuerdo}`,
                clasificacion: values.clasificacion,
                correo: values.correo,
                telefono: values.telefono,
            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    form.resetFields();
                    message.success("Empresa actualizada satisfactoriamente")
                    // this.setState({ visible: false });
                    // this.props.onReloadFetch();
                } else {
                    Modal.error({
                        title: 'Error al actualizar la empresa. Revisar los siguientes campos',
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
    handleaddColaborador = () => {
        this.setState({
            visibleColaborador: true,
        });

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
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const { id_empresa } = this.state;
        const customPanelStyle = {
            background: '#f4f8f9',
            borderRadius: 10,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        // console.warn(')>', anteproyecto.periodo)
        // const fecha_inicio_entrega = anteproyecto.periodo.fecha_inicio_entrega_anteproyecto,
        //     fecha_fin_entrega = anteproyecto.periodo.fecha_fin_entrega_anteproyecto;
        // const currentDate = moment().format('YYYY-MM-DD');


        return (
            <div>
                <Row type="flex" justify="center">


                    <Col xs={26} lg={20}>
                        <CreateRegistrarEmpresa
                            // anteproyecto={anteproyecto}
                            handleSubmit={this.handleSubmit}
                            ref={this.saveFormRef}
                            id_empresa={id_empresa}
                            normFile={this.normFile}
                            beforeUpload={this.beforeUpload}
                        />
                    </Col>


                </Row>
                {/* <FormAddColaborador visible={visibleColaborador} id_alumno={id_alumnoC} /> */}
            </div>
        )
    }
}