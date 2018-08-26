// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, Layout, Button, Table, Modal, Select, message, Popconfirm } from 'antd';
const { Content, Header } = Layout;
const { Column, ColumnGroup } = Table;
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';
import { getIsAuth } from '../api.jsx';

// Components
import FormDepartamento from './components/FormDepartamento.jsx';
import FormEditDepartamento from './components/FormEditDepartamento.jsx';
import FormAddDocente from '../docente/components/FormAddDocente.jsx'
import FormAddCarrera from './components/FormAddCarrera.jsx';
import WrappedFormSubdirectorAcademico from './components/FormSubdirectorAcademico.jsx';

class Departamento extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            props_add_docente: {
                id_departamento: null,
                nombre_departamento: null
            },
            visible_add_carrera: false,
            props_add_carrera: {
                id_departamento: null,
                nombre_departamento: null
            },
            departamento: null,
            departamentoD: null,
            docentesAsignados: null,
            loadTable: true,
            carrerasd: null,
            idcarrera: null,
            docentes: []
        }

    }

    
    fetchDepartamento() {
        getIsAuth().then((usuario) => {
            if (usuario.rol === 'jefe_departamento') {

                this.setState({
                    props_add_docente: {
                        id_departamento: usuario.id_departamento,
                        nombre_departamento: 'Division de estudios profesionales'
                    }

                })
            }

        })
        axios.get('/api/docentesdivision')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        docentes: res.data,
                        // data: carreras,
                        loadTable: false,
                        visible_form_edit_departamento: false,
                        visible_add_docente:false,
                       
                    })
                    axios.get('/api/carrera_coordinadores')
                        .then(res => {
                            if (res.status === 200) {
                                this.setState({
                                    docentesAsignados: res.data
                                })
                                axios.get('/api/carreras')
                                    .then(res => {
                                        if (res.status === 200) {
                                            var carreras = res.data.carreras.map((carrera, index) => {
                                                const coordinador_carrera = this.state.docentesAsignados.find(docente => docente.id_carrera === carrera.id && docente.rol === 'coordinador_carrera') || null
                                                const coordinador = coordinador_carrera ? this.state.docentes.find(docentes => docentes.id === coordinador_carrera.id_docente) : ''

                                                return { key: index, id: carrera.id, nombre: carrera.nombre, coordinador_carrera: coordinador ? `${coordinador.titulo} ${coordinador.nombre} ${coordinador.ap_paterno} ${coordinador.ap_materno}` : 'no asignado', acciones: 'Editar departamento' }

                                            })
                                            this.setState({
                                                data: carreras,
                                                carrerasd: res.data,
                                            })

                                        }
                                        // console.log(res.data);
                                    });
                            }
                        });
                }
            })
      
          
        
    }
     actualizarSele (){
        this.fetchDepartamento();
        this.setState({
            visible_add_docente:false,
        })
        
    }
    handleAddDepartamento() {
        this.fetchDepartamento();
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
        })
    }
    componentDidMount() {
        this.fetchDepartamento();
    }
    showModalFormDepartamento = () => {
        this.setState({
            visible_form_departamento: true,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            visible_add_carrera: false
        })
    }
    showModalFormEditDepartamento = (id_carrera) => {
        axios.get(`/api/carreracoordinador/${id_carrera}`)
            .then(res => {

                this.setState({
                    visible_add_docente: false,
                    visible_add_carrera: false,
                    visible_form_departamento: false,
                    visible_form_edit_departamento: true,
                    departamentoD: res.data,
                    idcarrera: id_carrera,

                })
            })

    }
    showAddDocente = () => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_carrera: false,
            visible_add_docente: true,

        })
    }
    showAddCarrera = (id_departamento, nombre_departamento) => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            visible_add_carrera: true,
            props_add_carrera: {
                id_departamento: id_departamento,
                nombre_departamento: nombre_departamento
            }
        })
    }
    changeSubdirectorAcademico = (id_usuario) => {
         axios.put('/api/docente/jefeDivisionEstudiosProfesionales', { id_usuario: id_usuario ? id_usuario : null },
        )
            .then(res => {
                if (res.status === 200) {
                    message.success('Jefe de departamento actualizado satisfactoriamente');
                } else {
                    message.error('Tuvimos un error al asignar al subdirector academico.')
                }
            }).catch(err => {
                message.error('Error al asignar al subdirector academico');
            })
    }
    render() {
        const {idcarrera, carrerasd,departamentoD, visible_form_edit_departamento, visible_form_departamento, docentes, data, departamento, loadTable, visible_add_docente, props_add_docente, visible_add_carrera, props_add_carrera } = this.state;
        const subdirector_academico = docentes.find(docente => docente.usuario.rol === 'jefe_departamento' && docente.departamento_doce.nombre === 'DIVISION DE ESTUDIOS PROFESIONALES')
        return (
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{ marginRight: 20 }}>
                        <h1> Personal </h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus" onClick={this.showAddDocente}>Agregar</Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20, marginBottom: 20 }}>
                    <Col xs={24} lg={8}>
                        <h3>Seleccione al jefe de departamento</h3>

                        <Select
                            key={uuid.v4()}
                            style={{ width: '100%' }}
                            showSearch
                            placeholder="Seleccion el jefe de departamento"
                            optionFilterProp="children"
                            allowClear
                            onChange={(id_docente) => this.changeSubdirectorAcademico(id_docente)}
                            defaultValue={subdirector_academico ? `${subdirector_academico.titulo} ${subdirector_academico.nombre} ${subdirector_academico.ap_materno} ${subdirector_academico.ap_paterno}` : null}
                        >
                            {docentes.map((docente, index) => {
                                return (
                                    <Option
                                        key={uuid.v1()}
                                        value={`${docente.id_usuario}`}
                                    >
                                        {`${docente.titulo} ${docente.nombre} ${docente.ap_materno} ${docente.ap_paterno}`}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 30 }}>
                    <Table dataSource={data} className="full-width" pagination={{ pageSize: 5 }} loading={loadTable} scroll={{ x: 800 }} >
                        <Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                            className="center-text"
                        />
                        <Column
                            title="Nombre"
                            dataIndex="nombre"
                            key="nombre"
                            className="center-text"
                        />
                        <Column
                            title="Coordinador carrera"
                            dataIndex="coordinador_carrera"
                            key="coordinador_carrera"
                            className="center-text"
                        />
                        <Column
                            title="Acciones"
                            key="acciones"
                            render={(text, record) => (
                                <span>
                                    {/* {record.id} */}
                                    <Button style={{ marginRight: 5 }} icon="edit" onClick={() => this.showModalFormEditDepartamento(record.id)}>Carrera</Button>
                                    {/* <Button style={{ marginLeft: 5 }} icon="plus" onClick={() => this.showAddDocente(record.id, record.nombre)} >docente</Button> */}
                                    {/* <Button style={{ marginLeft: 5 }} icon="plus" onClick={() => this.showAddCarrera(record.id, record.nombre)} >carrera</Button> */}
                                </span>
                            )}
                            className="center-text"
                        />
                    </Table>
                </Row>
                <FormDepartamento visible={visible_form_departamento} onAddDepartamento={this.handleAddDepartamento.bind(this)} />
                <FormEditDepartamento visible={visible_form_edit_departamento} onReloadDepartamentos={this.fetchDepartamento.bind(this)} carrera={departamentoD} docentes={docentes}carreras={carrerasd} idcarrera={idcarrera} />
                <FormAddDocente visible={visible_add_docente} departamento={props_add_docente} onReloadDocente={this.fetchDepartamento.bind(this)} />
                <FormAddCarrera visible={visible_add_carrera} departamento={props_add_carrera} />
            </div>

        )
    }
}

export default Departamento;