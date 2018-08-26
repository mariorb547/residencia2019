import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
///crearsss
import { Layout, Menu, Breadcrumb, Icon, Modal, Input, Button, Form, Badge, Avatar, Card, Affix, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { Meta } = Card;
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { getIsAuth } from '../api.jsx';
import Empresa from '../empresa/index.jsx';
import Usuario from '../usuario/index.jsx'
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import Residente from '../jefeDep/InformacionResidente.jsx';
import Foto from '../jefeDep/Foto.jsx';
import Oficina from '../departamento2/index.jsx';
import '../styling.css';
import FormAddDocente from '../docente/components/FormAddDocenteEncargado.jsx';
import Convenio from '../DivisionTecnologica/AutorizacionConvenio.jsx';
import DirectorioEmpresa from '../DivisionTecnologica/DirectorioEmpresa.jsx';
import DirectorioResidente from '../DivisionTecnologica/DirectorioResidentes.jsx';
import AddPuesto from '../DivisionTecnologica/AddPuesto.jsx';
import AddColonia from '../DivisionTecnologica/AddColonia.jsx';
import AddTitulo from '../DivisionTecnologica/AddTitulo.jsx';
import AddFolios from '../DivisionTecnologica/AddFolios.jsx';
import Folios from '../DivisionTecnologica/Folios.jsx';
import HistoriaFolios from '../DivisionTecnologica/HistorialFolios.jsx';
var id_usuario = 1;
class LayoutJefedep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isAuth: true,
            componentSelected: 12,
            imagen: null,
            nombre: null,
            departamento: null,
            id: null,
            visible_add_docente:false,
            visible_add_puesto:false,
            visible_add_colonia:false,
            visible_add_titulo:false,
            visible_add_folios:false,
            
            props_add_docente: {
                id_departamento: null,
                nombre_departamento: null
            },
            components: {

                1: {
                    title: this.logo("Departamento de Gestión Tecnológica y Vinculación "),
                    render: <Empresa />

                },
                2: {
                    title: this.logo("Gestion de Oficina "),
                    render: <Oficina />

                },

                11: {
                    title: this.logo("Actualizacion de tu foto de perfil"),
                    render: <Foto ok={this.imagens.bind(this)} />

                },
                12:{
                    title: this.logo("Convenio de Empresas Pendientes "),
                    render: <Convenio /> 
                },
                13:{
                    title: this.logo("Dorectorio de Empresas "),
                    render: <DirectorioEmpresa /> 
                },
                14:{
                    title: this.logo("Directorio de Residentes "),
                    render: <DirectorioResidente /> 
                },
                19:{
                    title: this.logo("Folios de Residencias "),
                    render: <Folios /> 
                },
                20:{
                    title: this.logo("Historial de folios "),
                    render: <HistoriaFolios /> 
                }


            },
            visibleCambiarContrasenia: false

        }
    }
    logo = (titulo) => {
        return (
            <div className="titulo" style={{ textAlign: 'down', top: 10, height: 40, width: 1000 }}>
                <img src="/img/logoprincipal.png" alt="logo_tec" height="250%" />

                <div style={{ fontSize: 20 }}>{titulo} </div>
            </div>
        )
    }


    getIsAuth() {
        getIsAuth().then((usuario) => {

            if (usuario.rol === 'jefe_departamento' || usuario.rol ==='encargado') {
                id_usuario = usuario.id;
                axios.get(`/api/departamento/${usuario.id_departamento}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                departamento: res.data,
                                isAuth: usuario.isAuth,
                                usuario: usuario.id_departamento,
                                id: usuario.id,

                            })
                            this.imagens(usuario.id);
                        }
                        else {  
                            this.setState({ isAuth: false })
                        }
                    })
            } else {  
                this.setState({ isAuth: false })
            }
        })
    }
    imagens = (id) => {

        axios.get(`/api/usuario/foto/${id ? id : this.state.id}`)
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        imagen: res.data,

                    })
                    axios.get(`/api/docente/informacion/${id ? id : this.state.id}`).then(res => {

                        this.setState({
                            nombre: res.data.titulo + "" + res.data.nombre + " " + res.data.ap_paterno + " " + res.data.ap_materno,
                        })

                    })

                }
            })

    }

    nuevaSelccion = ()=>{
         this.setState({
            componentSelected: 2,
            visibleCambiarContrasenia: false,
            visible_add_docente: false,
            visible_add_puesto: false,
            visible_add_colonia:false,
            visible_add_titulo:false,
            visible_add_folios:false,
         })
    }
    componentWillMount() {
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false,
            visible_add_docente:false,
            visible_add_puesto: false,
            visible_add_colonia:false,
            visible_add_titulo:false,
            visible_add_folios:false,
            
        });
    }

    handleMenu = ({ item, key, selectedKeys }) => {
        if (key == 3) {
            this.setState({
                visibleCambiarContrasenia: true,
                visible_add_docente: false,
                visible_add_colonia:false,
                visible_add_puesto:false,
                visible_add_titulo:false,
                visible_add_folios:false,
            })
        }else if(key == 4){
            const {departamento} = this.state;
            this.setState({
                visibleCambiarContrasenia: false,
                visible_add_puesto: false,
                visible_add_docente: true,
                visible_add_titulo:false,
                visible_add_folios:false,
                props_add_docente: {
                    id_departamento: departamento.id,
                    nombre_departamento: departamento.nombre
                }
            }) 
            }else if( key == 16 ){
                
                this.setState({
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    visible_add_colonia:false,
                    visible_add_puesto: true,
                    visible_add_titulo:false,
                    visible_add_folios:false,

                }) 
            }else if( key == 17 ){
                
                this.setState({
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    visible_add_puesto: false,
                    visible_add_colonia:true,
                    visible_add_titulo:false,
                    visible_add_folios:false,
                }) 
            }else if( key == 18 ){
                
                this.setState({
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    visible_add_puesto: false,
                    visible_add_colonia:false,
                    visible_add_titulo:true,
                    visible_add_folios:false,
                }) 
            } else if( key == 200 ){
                
                this.setState({
                    visibleCambiarContrasenia: false,
                    visible_add_docente: false,
                    visible_add_puesto: false,
                    visible_add_colonia:false,
                    visible_add_titulo:false,
                    visible_add_folios:true,
                }) 
            }else {
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false,
                visible_add_docente: false,
                visible_add_puesto: false,
                visible_add_colonia:false,
                visible_add_titulo:false,
                visible_add_folios:false,
            
                
            })
        }
    }
    render() {
        const { isAuth, componentSelected,visible_add_colonia, visible_add_folios, visible_add_titulo, visible_add_puesto, nombre, components, props_add_docente,visible_add_docente, visibleCambiarContrasenia, imagen } = this.state
        const component = components[componentSelected];
        return (
            isAuth ? (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}

                    ><center>

                            { //solo lo hago para que se
                                this.state.collapsed ?
                                    <div className="grises" >
                                        <img alt="logo_tec" src={`data:image/[png|gif|jpg|jpeg]; base64,${imagen}`} style={{ textAlign: 'center', left: 50, height: 50, width: 35 }} />
                                    </div>
                                    :
                                    <div className="grises" style={{ alignContent: 'center', textAlign: 'center', top: 10, height: 120, width: 150 }}>
                                        <img alt="logo_tec" src={`data:image/[png|gif|jpg|jpeg]; base64,${imagen}`} style={{ left: 35, height: 150, width: 150 }} />
                                        <div>{nombre}</div>
                                    </div>



                            }

                        </center>
                        {
                            this.state.collapsed ? '' : <div><br /><br /><br /><br /><br /></div>
                        }
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['12']} onSelect={this.handleMenu}>

                            <Menu.Item key="12">
                                <Icon type="team" />
                                <span>Convenios</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub6"
                                title={<span><Icon type="schedule" /><span>Oficina</span></span>}
                            >
                            <Menu.Item key="2">
                                <Icon type="schedule" />
                                <span>Oficina</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user-add" />
                                <span>Agregar personal</span>
                               
                            </Menu.Item>
                            <Menu.Item key="16">
                                <Icon type="solution" />
                                <span>Agregar puesto</span>
                               
                            </Menu.Item>
                            <Menu.Item key="17">
                                <Icon type="solution" />
                                <span>Agregar colonia</span>
                               
                            </Menu.Item>
                            <Menu.Item key="18">
                                <Icon type="solution" />
                                <span>Agregar grado de estudios</span>
                               
                            </Menu.Item>
                             </SubMenu>
                            
                            <Menu.Item key="1">
                                <Icon type="contacts" />
                                <span>Empresas</span>
                            </Menu.Item>
                           
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="phone" /><span>Directorio</span></span>}
                            >
                                <Menu.Item key="13">
                                    <Icon type="contacts" />
                                    Empresa</Menu.Item>
                                <Menu.Item key="14">
                                    <Icon type="contacts" />
                                       Residentes</Menu.Item>
                             </SubMenu>
                             <SubMenu
                                key="sub15"
                                title={<span><Icon type="tags" /><span>Folios</span></span>}
                            >
                                <Menu.Item key="19">
                                    <Icon type="tag-o" />
                                    Iniciar folios</Menu.Item>
                                <Menu.Item key="20">
                                <Icon type="tags-o" />
                                       Historial de folios</Menu.Item>
                             </SubMenu>
                            <Menu.Divider />
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                            >
                                <Menu.Item key="3">
                                    <Icon type="unlock" />
                                    Cambiar contraseña</Menu.Item>
                                <Menu.Item key="11">
                                    <Icon type="camera" />
                                    Actializar foto</Menu.Item>
                                <Menu.Item ><a href="/api/usuario/logout"><Icon type="logout" /> <strong>Cerrar sesión</strong> </a> </Menu.Item>
                            </SubMenu>


                        </Menu>

                    </Sider>
                    <Layout>

                        <Header style={{ background: '#fff', padding: 0, height: 150 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div style={{ float: 'right', left: 50 }} >
                                {component.title?component.title:''}
                            </div>
                        </Header>

                        <Content style={{ margin: '0px 0px', padding: 24, background: '#fff' }}>
                            {component.render}
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>
                            Sistema de Seguimiento de residencias del ITCH ©2017 Francisco Arcos farcosj51@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia} />
                    <FormAddDocente visible={visible_add_docente} departamento={props_add_docente} />
                    <AddPuesto visible={visible_add_puesto} onload={this.nuevaSelccion.bind(this)} />
                    <AddColonia visible={visible_add_colonia}  />
                    <AddTitulo visible={visible_add_titulo}  />
                    {/* <AddFolios visible={visible_add_folios}/> */}
                </Layout >
            ) :
                (<Redirect to="/usuario/auth" />)
        )
    }
}

export default LayoutJefedep;