// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, Layout, Button, Table, Modal, Input, Icon, Switch, message } from 'antd';
const { Content, Header } = Layout;
const { Column, ColumnGroup } = Table;
import axios from 'axios';
import PDF2 from 'react-pdf-js-infinite';
import { getIsAuth } from '../api.jsx';
import moment from 'moment';
// Components
// import FormEmpresa from './components/FormEmpresa.jsx';
import FormEmpresa from '../empresa/components/FormEmpresa.jsx';
import FormEditEmpresa from '../empresa/components/FormEditEmpresa.jsx';
import FormAddAsesorExterno from '../asesor_externo/components/FormAddAsesorExterno.jsx'
import FromAddPeriodoSeguimiento from './AddPeriodoConvenio.jsx';

class Empresa extends Component {
    constructor() {
        super();
        this.state = {
            id_docente: null,
            id_empresaU: null,
            id_convenio: null,
            empresas: [],
            filterEmpresas: [],
            visible: false,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
            loadTable: true,
            visibleFormAddAsesorExterno: false,
            visibleFormEditEmpresa: false,
            visibleFromAddPeriodo:false,
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
    getIsAuth() {
        getIsAuth().then((usuario) => {
            // console.log('--------------------------------------------------------')
            //  console.log(usuario)
            if (usuario.rol === 'jefe_departamento' || usuario.rol ==='encargado') {
                this.setState({
                    id_docente: usuario.id_docente,
                })
            }
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
        axios.put('/api/convenio/empresa/eliminar', {
         
        }).then((res) => {
            if (res.status = 200) {
             console.log(res.data)
            }
        })
        axios.put('/api/convenio/empresa/eliminar/convenios', {
         
        }).then((res) => {
            if (res.status = 200) {
             console.log(res.data)
            }
        })
        axios.get('/api/empresa')
            .then(res => {
                if (res.status === 200) {
                    var empresas = res.data.empresas.filter(function (empresa) {return ( empresa.convenioss.filter(function (empre) {return empre.convenio ===true  }).map((empre, indexs) => {return empre.convenio;}).length===0 && empresa.convenio===false)  }).map((empresa, index) => {
                        //         var content_table = anteproyectos != '' ? anteproyectos.filter(function (anteproyecto) { return anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_interno && anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_externo; }).map(function (anteproyecto) {
                        var contador=0;
                        console.log( empresa.convenioss.filter(function (empre) {return empre.convenio ===true  }).map((empre, indexs) => {return contador++;}).length) 
                        // empresa.convenioss.map((empr,i)=>{
                        //     console.log(empr.fecha_inicial)
                        //   })
                       
                        return {
                            key: index,
                            id: empresa.id,
                            nombre: empresa.nombre,
                            clasificacion: empresa.clasificacion,
                            titular: empresa.titular,
                            representante_legal: empresa.representante_legal,
                            convenio:empresa.convenio,
                            url_documentos_de_validacion:empresa.url_documentos_de_validacion,
                            // convenio:empresa.convenioss,
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
                                asesores_externos: empresa.asesor_externos
                            },
                            acciones: 'acctions'
                        }
                    })
                    this.setState({
                        loadTable: false,
                        empresas,
                        filterEmpresas: empresas,
                        visibleFormAddAsesorExterno: false,
                        visibleFormEditEmpresa: false,
                        visibleFromAddPeriodo:false,
                    })
                }
                // console.log(res.data); solo
            }).catch(err => {
                this.setState({
                    loadTable: false
                })
            })
    }
    componentDidMount() {
        this.fetchEmpresas();
        this.getIsAuth();
        this.actualizarconvenis();

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
                {/* <Table style={{ marginTop: 10 }} title={() => 'Asesores externos de la empresa'} columns={columns} size="small" dataSource={record.detalles.asesores_externos.map((asesor, index) => { return { key: index, nombre: asesor.nombre, puesto: asesor.puesto } })} /> */}
            </div>
        )
    }
    actualizarconvenis =()=>{
        const currentDate = moment().format('YYYY-MM-DD');
        axios.put('/api/convenio/empresa/actualizar', {
            currentDate
        }).then((res) => {
            if (res.status = 200) {
             console.log(res.data)
            }
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
                    <PDF2 file={`/api/comprobantes/pdf/${filename}`} scale={1.5} />
                </div>
            ), onOk(){}
        });
    }
    handleconvenio = (id, estado,) => {

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
    showAddPeriodo = (id,estado )=>{
      var id_empresas= id;
        axios.get(`/api/empresa/verificar/${id}`)
        .then(res => {
            console.log(res.data.convenio)
            if (res.status === 200) {
               if(res.data.convenio){
                   message.warning('Si el tiempo del convenio es tipo indifinido no es necesario agregar tiempo de convenio')
               }else{
                axios.post('/api/empresa/convenio', {
                   
                    id_empresa :id,
                    id_docente: this.state.id_docente
                }).then(res => {
                    if(res.status === 200 ){
                        this.setState({
                            id_convenio: res.data.id,
                            id_empresaU: id_empresas,
                            visibleFromAddPeriodo:true,
                        }) 
                    }
                })

               
                }
            }
        })
    
    }
    render() {
        const { visible,id_docente,id_empresaU, id_convenio, filterEmpresas,visibleFromAddPeriodo, loadTable, visibleFormAddAsesorExterno, props_add_asesor, visibleFormEditEmpresa, props_edit_empresa } = this.state;
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                width:250,
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
                title: 'Documentos de validacion',
                key: 'acciones',
                width:150,
                render: (text, record) => (
                    <span>
                        <Button style={{ color: '#ff5757', marginRight: 3 }} icon="file-pdf"  onClick={() => this.showAnteproyecto(record.url_documentos_de_validacion)} ></Button>
                        <a style={{ color: '#ff5757', marginLeft: 3 }} target="_blank" href={`/api/comprobantes/pdf/${record.url_documentos_de_validacion}`}><Icon type="select" /></a>
                    </span>

                    // <p style={{color: '#ff5757'}}>Aun no sube comprobación</p>
                ),
                className: 'center-text'
            },
            {
                title: 'Tiempo de convenio',
                dataIndex: 'convenio',
                key: 'convenio',
                width:150,
                render: (text, record) => (
                    <span>
                        <Switch  checkedChildren='Indifinido' defaultChecked={record.convenio ? true : false} unCheckedChildren="Temporal" onChange={(checked) => this.handleconvenio(record.id, checked)} />
                    </span>
                ),
                className: 'center-text'
            },
            {
                title: 'tiempo de convenio',
                dataIndex: 'tiempo',
                key: 'tiempo',
                width:150,
                render: (text, record) => (
                    <span>
                        <Button style={{marginLeft: 5}} icon="plus-circle-o"  onClick={() => this.showAddPeriodo(record.id, record.nombre)} >Agregar periodo</Button>
                    </span>
                ),
                className: 'center-text'
            }
        ]
        return (

            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{ marginRight: 20 }}>
                        {/* <h1> Empresas </h1> */}
                    </Col>
                    {/* <Col>
                        <Button type="primary" icon="plus" onClick={this.showModal}>Agregar</Button>
                    </Col> */}
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 30 }}>
                    <Table dataSource={filterEmpresas} className="full-width" columns={columns} pagination={{ pageSize: 5 }} loading={loadTable} scroll={{ x: 800, y:250 }} expandedRowRender={this.expandedRowRender} />
                </Row>
                {/* <FormEmpresa visible={visible}  id_empresa={id_empresaU} id_docente={id_docente} onAddEmpresa={this.handleAddEmpresa.bind(this)} /> */}
                <FormEditEmpresa visible={visibleFormEditEmpresa} empresa={props_edit_empresa} onReloadFetch={this.fetchEmpresas.bind(this)} />
                <FormAddAsesorExterno visible={visibleFormAddAsesorExterno} empresa={props_add_asesor} onReloadFetch={this.fetchEmpresas.bind(this)} />
                <FromAddPeriodoSeguimiento visible={visibleFromAddPeriodo}  id_convenio={id_convenio}   id_empresa={id_empresaU} id_docente={id_docente} onAddEmpresa={this.fetchEmpresas.bind(this)} />
    
            </div>

        )
    }
}

export default Empresa;