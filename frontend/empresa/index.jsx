// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, Layout, Button, Table, Modal, Input, Icon, Switch, message, Collapse, Select } from 'antd';
const { Content, Header } = Layout;
const { Column, ColumnGroup } = Table;
import axios from 'axios';
const Panel = Collapse.Panel;
const Option = Select.Option;
import PDF2 from 'react-pdf-js-infinite';
// Components
import FormEmpresa from './components/FormEmpresa.jsx';
import FormEditEmpresa from './components/FormEditEmpresa.jsx';
import FormAddAsesorExterno from '../asesor_externo/components/FormAddAsesorExterno.jsx'
class Empresa extends Component {
    constructor() {
        super();
        this.state = {
            empresas: [],
            filterEmpresas: [],
            visible: false,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
            loadTable: true,
            visibleFormAddAsesorExterno: false,
            visibleFormEditEmpresa: false,
            props_add_asesor: {
                id_empresa: null,
                nombre_empresa: null
            },
            props_edit_empresa: {
                detalles: null
            }
        }

    }
    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    onSearch = () => {
        const { searchText, empresas } = this.state
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            visible: false,
            filterDropdownVisible: false,
            filtered: !!searchText,
            filterEmpresas: empresas.map((record) => {
                console.warn(record)
                const match = record.nombre.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    nombre: (
                        <span>
                            {record.nombre.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    )
                }
            }).filter(record => !!record),
        })
    }
    fetchEmpresas() {
        axios.get('/api/empresa')
            .then(res => {
                if (res.status === 200) {
                    // var empresas = res.data.empresas.map((empresa, index) => {
                    // var empresas = res.data.empresas.filter(function (empresa) {return empresa.convenio ===true}).map((empresa, index) => {
                    // console.log('EMPRESA: ', empresa);
                    var empresas = res.data.empresas.filter(function (empresa) { return (empresa.convenioss.filter(function (empre) { return empre.convenio === true }).map((empre, indexs) => { return empre.convenio; }).length > 0 || empresa.convenio === true) }).map((empresa, index) => {

                        return {
                            key: index,
                            id: empresa.id,
                            nombre: empresa.nombre,
                            clasificacion: empresa.clasificacion,
                            titular: empresa.titular,
                            representante_legal: empresa.representante_legal,
                            convenio: empresa.convenio,
                            detalles: {
                                rfc: empresa.rfc,
                                domicilio: `${empresa.domicilio} colonia ${empresa.colonia}`,
                                domicilio_only: empresa.domicilio,
                                colonia: empresa.colonia,
                                codigo_postal: empresa.codigo_postal,
                                fax: empresa.fax,
                                mision: empresa.mision,
                                puesto_titular: empresa.puesto_titular,
                                nombre_titular: empresa.nombre_titular,
                                puesto_firma_acuerdo: empresa.puesto_firma_acuerdo,
                                nombre_firma_acuerdo: empresa.nombre_firma_acuerdo,
                                asesores_externos: empresa.asesor_externos,
                                convenios: empresa.convenioss,
                            },

                            acciones: 'acctions'
                        }
                    })
                    this.setState({
                        loadTable: false,
                        empresas,
                        filterEmpresas: empresas,
                        visibleFormAddAsesorExterno: false,
                        visibleFormEditEmpresa: false
                    })
                }
                // console.log(res.data);
            }).catch(err => {
                this.setState({
                    loadTable: false
                })
            })
    }
    componentDidMount() {
        this.fetchEmpresas();

    }
    showModal = () => {
        this.setState({
            visible: true,
            visibleFormEditEmpresa: false,
            visibleFormAddAsesorExterno: false,
        })
    }
    handleAddEmpresa() {
        this.fetchEmpresas();
        this.setState({
            visible: false
        })
    }
    showModalFormEditEmpresa = (id_empresa) => {
        const { empresas } = this.state;
        const empresa = empresas.find((empresa) => { return empresa.id === id_empresa });
        this.setState({
            visible: false,
            visibleFormEditEmpresa: true,
            visibleFormAddAsesorExterno: false,
            props_edit_empresa: empresa
        })
    }
    showAnteproyecto = (filename) => {
        Modal.info({
            maskClosable: true,
            width: '85%',
            title: `Anteproyecto`,
            content: (
                <div>
                    {/* <PDF className="pdf" file="/api/anteproyecto/pdf/9f3d7eb9866269c6793c64f1ff5a3c19" /> */}
                    <PDF2 file={`/api/convenios/pdf/${filename}`} scale={1.5} />
                </div>
            ), onOk() { }
        });
    }
    showAddAsesorExterno = (id_empresa, nombre_empresa) => {
        this.setState({
            visible: false,
            visibleFormEditEmpresa: false,
            visibleFormAddAsesorExterno: true,
            props_add_asesor: {
                id_empresa: id_empresa,
                nombre_empresa: nombre_empresa
            }
        })

    }
    expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre'
            },
            {
                title: 'Puesto',
                dataIndex: 'puesto'
            }
        ]

        const columnsConvenio = [
            {
                title: 'Estado de convenio',
                dataIndex: 'convenio',
                filters: [
                    {
                        text: 'Vigente',
                        value: 'Vigente'
                    },
                    {
                        text: 'Terminado',
                        value: 'Terminado'
                    },

                ], filterMultiple: false,
                onFilter: (value, record) => record.convenio.indexOf(value) === 0,

            },
            {
                title: 'Fecha inicio',
                dataIndex: 'fecha'
            },
            {
                title: 'Fecha final',
                dataIndex: 'fecha_f'
            },

            {
                title: 'Documentos de validacion',
                key: 'acciones',

                render: (text, record) => (
                    <span>
                        <Button style={{ color: '#ff5757', marginRight: 3 }} icon="file-pdf" onClick={() => this.showAnteproyecto(record.url_convenio_firmado_digitalizado)} ></Button>
                        <a style={{ color: '#ff5757', marginLeft: 3 }} target="_blank" href={`/api/convenios/pdf/${record.url_convenio_firmado_digitalizado}`}><Icon type="select" /></a>
                    </span>

                    // <p style={{color: '#ff5757'}}>Aun no sube comprobación</p>
                ),
                className: 'center-text'
            },
        ]

        return (
            <div>
                <span>
                    <strong>RFC</strong><p>{record.detalles.rfc}</p>
                    <strong>Domicilio</strong><p>{record.detalles.domicilio}</p>
                    <strong>Codigo postal</strong><p>{record.detalles.codigo_postal}</p>
                </span>
                <span>
                    <strong>Nombre y puesto del titular de la empresa</strong><p>{`${record.titular.titulo} ${record.titular.nombre} ${record.titular.puesto}`}</p>
                    <strong>Nombre y puesto de quien firma el acuerdo con el ITCH</strong><p>{`${record.representante_legal.titulo} ${record.representante_legal.nombre} ${record.representante_legal.puesto}`}</p>
                </span>

                <Collapse defaultActiveKey={['1']}  >
                    <Panel header="Asesores externos de la empresa" key="1">
                        <Table style={{ marginTop: 10 }} columns={columns} size="small" dataSource={record.detalles.asesores_externos.map((asesor, index) => { return { key: index, nombre: asesor.nombre, puesto: asesor.puesto } })} />

                    </Panel>
                    <Panel header="Convenios de la empresa" key="2">

                        <Table style={{ marginTop: 10 }} columns={columnsConvenio} size="small" dataSource={
                            record.detalles.convenios.map((conveni, index) => {
                                console.log(conveni)
                                return { key: index, convenio: conveni.convenio ? 'Vigente' : 'Terminado', fecha: conveni.fecha_inicial, fecha_f: conveni.fecha_final, url_convenio_firmado_digitalizado: conveni.url_convenio_firmado_digitalizado }
                            })} />

                    </Panel>

                </Collapse>
            </div>
        )
    }
    handleconvenio = (id, estado, ) => {

        axios.put('/api/convenio/empresa', {
            id,
            estado,
        }).then((res) => {
            if (res.status = 200) {

                message.success("Se actualizo correctamente")
                // this.fetchEmpresas();

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })

    }
    handleConveniopdf = (value) => {
        // message.success(value)

        if (value === 'vigente') {
            message.success(value)
            return (
                <a href={`/api/alumno/${1}/solicitud_residencia`} />
            )
        }


    }
    render() {
        const { visible, filterEmpresas, loadTable, visibleFormAddAsesorExterno, props_add_asesor, visibleFormEditEmpresa, props_edit_empresa } = this.state;
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar por nombre"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Buscar</Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                        visible: false,
                        visibleFormAddAsesorExterno: false,
                        visibleFormEditEmpresa: false,
                    }, () => this.searchInput.focus())
                }
            },
            {
                title: 'Clasificación',
                dataIndex: 'clasificacion',
                key: 'clasificacion',
                filters: [
                    {
                        text: 'Público',
                        value: 'público'
                    },
                    {
                        text: 'Privado',
                        value: 'privado'
                    },
                    {
                        text: 'Industrial',
                        value: 'industrial'
                    },
                    {
                        text: 'Servicios',
                        value: 'servicios'
                    }
                ], filterMultiple: false,
                onFilter: (value, record) => record.clasificacion.indexOf(value) === 0,

            },
            {
                title: 'Tipo de convenio',
                key: 'tipo',
                render: (text, record) => (
                    <span>
                        {
                            record.convenio ?
                                <Switch checkedChildren='Indifinido' defaultChecked={record.convenio ? true : false} unCheckedChildren="Temporal" onChange={(checked) => this.handleconvenio(record.id, checked)} />

                                : 'Temporal'
                        }


                    </span>
                ),
                className: 'center-text'
            },
            {
                title: 'Acciones',
                key: 'acciones',
                render: (text, record) => (
                    <span>
                        <Button style={{ marginRight: 5 }} icon="edit" onClick={() => this.showModalFormEditEmpresa(record.id)}>Empresa</Button>
                        <Button style={{ marginLeft: 5 }} icon="team" onClick={() => this.showAddAsesorExterno(record.id, record.nombre)} >Agregar asesor externo</Button>



                    </span>
                ),
                className: 'center-text'
            }
        ]


        return (

            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{ marginRight: 20 }}>
                        <h1> Empresas </h1>
                    </Col>
                    {/* <Col>
                        <Button type="primary" icon="plus" onClick={this.showModal}>Agregar</Button>

                    </Col> */}
                    <Col>
                        <div >

                            <Select placeholder="Convenios"
                                // onChange={this.handleConveniopdf}
                                style={{ width: 200, left: 650, fontSize: 20 }}>
                                <Option value="vigente">
                                    <a href={`/api/jefe/vigente/convenios`}>
                                        Vigentes</a>
                                </Option>
                                <Option value="indifinidos">  <a href={`/api/jefe/indifinido/convenios`}>
                                    Indifinidos</a></Option>
                                <Option value="terminado">
                                    <a href={`/api/jefe/terminados/convenios`}>
                                        Terminados</a>
                                </Option>
                               
                                <Option value="todos">
                                    <a href={`/api/jefe/todos/convenios`}>
                                        Todos</a></Option>
                            </Select>

                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 30 }}>
                    <Table dataSource={filterEmpresas} className="full-width" columns={columns} pagination={{ pageSize: 5 }} loading={loadTable} scroll={{ x: 800 }} expandedRowRender={this.expandedRowRender} />
                </Row>
                <FormEmpresa visible={visible} onAddEmpresa={this.handleAddEmpresa.bind(this)} />
                <FormEditEmpresa visible={visibleFormEditEmpresa} empresa={props_edit_empresa} onReloadFetch={this.fetchEmpresas.bind(this)} />
                <FormAddAsesorExterno visible={visibleFormAddAsesorExterno} empresa={props_add_asesor} onReloadFetch={this.fetchEmpresas.bind(this)} />
            </div>

        )
    }
}

export default Empresa;