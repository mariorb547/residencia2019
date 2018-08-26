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
import FormAddOficina from './components/FormAddOficina.jsx';
import WrappedFormSubdirectorAcademico from './components/FormSubdirectorAcademico.jsx';

class Departamento extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            // visible_add_docente: false,
            props_add_docente: {
                id_departamento: null,
                nombre_departamento: null
            },
            visible_add_oficina: false,
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
                    props_add_carrera: {
                        id_departamento: usuario.id_departamento,
                        nombre_departamento: 'Gestión Tecnólogica y Vinculación'
                    }

                })
            }

        })
        axios.get('/api/docentesgestion')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.setState({
                        docentes: res.data,
                      
                        loadTable: false,
                        visible_form_edit_departamento: false,
                        visible_add_oficina:false,
                       
                    })
                    axios.get('/api/oficina_encargados')
                        .then(res => {
                            if (res.status === 200) {
                                this.setState({
                                    docentesAsignados: res.data
                                })
                                axios.get(`/api/oficinas/${this.state.props_add_carrera.id_departamento}`)
                                    .then(res => {
                                        if (res.status === 200) {
                                            var oficinas = res.data.oficinas.map((oficina, index) => {
                                                const encargado_oficina = this.state.docentesAsignados.find(docente => docente.id_oficina=== oficina.id && docente.rol === 'encargado') || null
                                                const encargado = encargado_oficina ? this.state.docentes.find(docentes => docentes.id === encargado_oficina.id_docente) : ''

                                                return { key: index, id: oficina.id, nombre: oficina.nombre, encargado_oficina: encargado ? `${encargado.titulo} ${encargado.nombre} ${encargado.ap_paterno} ${encargado.ap_materno}` : 'no asignado', acciones: 'Editar oficina' }

                                            })
                                            this.setState({
                                                data: oficinas,
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
            // visible_add_docente: false,
            visible_add_carrera: false
        })
    }
    showModalFormEditDepartamento = (id_carrera) => {
        axios.get(`/api/encargadooficinas/${id_carrera}`)
            .then(res => {

                this.setState({
                    // visible_add_docente: false,
                    visible_add_carrera: false,
                    visible_form_departamento: false,
                    visible_add_oficina: false,
                    visible_form_edit_departamento: true,
                    departamentoD: res.data,
                    idcarrera: id_carrera,

                })
            })

    }
    showAddOficina = () => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_oficina: true,
            // visible_add_docente: false,

        })
    }
    showAddCarrera = (id_departamento, nombre_departamento) => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            // visible_add_docente: false,
            visible_add_carrera: true,
            props_add_carrera: {
                id_departamento: id_departamento,
                nombre_departamento: nombre_departamento
            }
        })
    }
   
    render() {
        const {idcarrera, carrerasd,departamentoD, visible_form_edit_departamento, visible_form_departamento, docentes, data, departamento, loadTable, visible_add_oficina, props_add_docente, visible_add_carrera, props_add_carrera } = this.state;
        // const subdirector_academico = docentes.find(docente => docente.usuario.rol === 'jefe_departamento' && docente.departamento_doce.nombre === 'DIVISION DE ESTUDIOS PROFESIONALES')
        return (
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{ marginRight: 20 }}>
                        <h1> Oficina </h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus" onClick={this.showAddOficina}>Agregar</Button>
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: 20, marginBottom: 20 }}>
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
                </Row> */}
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
                            title="Encargado de oficina"
                            dataIndex="encargado_oficina"
                            key="encargado_oficina"
                            className="center-text"
                        />
                        <Column
                            title="Acciones"
                            key="acciones"
                            render={(text, record) => (
                                <span>
                                    {/* {record.id} */}
                                    <Button style={{ marginRight: 5 }} icon="edit" onClick={() => this.showModalFormEditDepartamento(record.id)}>Oficina</Button>
                                    {/* <Button style={{ marginLeft: 5 }} icon="plus" onClick={() => this.showAddDocente(record.id, record.nombre)} >docente</Button> */}
                                    {/* <Button style={{ marginLeft: 5 }} icon="plus" onClick={() => this.showAddCarrera(record.id, record.nombre)} >carrera</Button> */}
                                </span>
                            )}
                            className="center-text"
                        />
                    </Table>
                </Row>
                {/* <FormDepartamento visible={visible_form_departamento} onAddDepartamento={this.handleAddDepartamento.bind(this)} /> */}
                <FormEditDepartamento visible={visible_form_edit_departamento} onReloadDepartamentos={this.fetchDepartamento.bind(this)} carrera={departamentoD} docentes={docentes}carreras={carrerasd} idcarrera={idcarrera} />
                {/* <FormAddDocente visible={visible_add_docente} departamento={props_add_docente} onReloadDocente={this.fetchDepartamento.bind(this)} /> */}
                <FormAddOficina visible={visible_add_oficina} departamento={props_add_carrera} onReloadDepartamentos={this.fetchDepartamento.bind(this)} />
            </div>

        )
    }
}

export default Departamento;