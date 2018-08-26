import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
///crearsss
import { Layout, Menu, Breadcrumb, Icon, Modal, Input, Button, Form, Badge, Avatar, Card, Affix } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { Meta } = Card;
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { getIsAuth } from '../api.jsx';

// components
import Carrera from '../departamento1/index.jsx';
import DepartamentoGestion from '../departamento/index.jsx';
import Presidentes from '../departamento/departamentoDivision.jsx';
import Docente from '../docente/index.jsx';
import Empresa from '../empresa/index.jsx';
import Usuario from '../usuario/index.jsx'
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import AsginacionUsuario from '../jefeDep/AsignacionUsuario.jsx';
import FormAperturaPeriodoDeResidencia from '../jefeDep/addPeriodo.jsx';
import GestionPeriodoDeResidencia from '../periodo_residencia/gestionToledo.jsx';
import Revision from '../jefeDep/RevisionDeSeguimientos.jsx';
import Residente from '../jefeDep/InformacionResidente.jsx';
import Foto from '../jefeDep/Foto.jsx';
import '../styling.css';
import Dictamen from '../jefeDep/DictamenDivision.jsx';
import Estadisticas from '../jefeDep/Estadisticas.jsx';
var id_usuario = 1;
class LayoutJefedep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isAuth: true,
            componentSelected: 1,
            imagen: null,
            nombre: null,
            id: null,
            components: {

                1: {
                    title: this.logo("Registro de residentes"),
                    render: <AsginacionUsuario />

                },
                2: {

                    title: this.logo("Coordinadores de carrera")
                    ,
                    render: <Carrera />
                },
                5: {
                    title: this.logo("Revision de seguimientos"),
                    render: < Revision />
                },
                6: {
                    title: this.logo("Apertura de periodo de residencia"),
                    render: <FormAperturaPeriodoDeResidencia />
                },
                7: {
                    title: this.logo("Gestion de periodo de residencia"),
                    render: <GestionPeriodoDeResidencia />
                },
                8: {
                    title: this.logo("Gestion de departamentos academicos"),
                    render: <DepartamentoGestion />
                },
                9: {
                    title: this.logo("Asignacion de presidetes de academia"),
                    render: <Presidentes />
                },
                10: {
                    title: this.logo("Situacion del residente"),
                    render: <Residente />

                },
                11: {
                    title: this.logo("Actualizacion de tu foto de perfil"),
                    render: <Foto ok={this.imagens.bind(this)} />

                },
                12: {
                    title: this.logo("Dictamenes"),
                    render: <Dictamen />

                },
                13:{
                    title:this.logo('Estadisticas de termino de residencias'),
                    render:<Estadisticas />
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

            if (usuario.rol === 'jefe_departamento') {
                id_usuario = usuario.id;
                this.setState({
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
    componentWillMount() {
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false
        });
    }

    handleMenu = ({ item, key, selectedKeys }) => {
        if (key == 3) {
            this.setState({
                visibleCambiarContrasenia: true
            })
        } else {
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false
            })
        }
    }
    render() {
        const { isAuth, componentSelected, nombre, components, visibleCambiarContrasenia, imagen } = this.state
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
                            this.state.collapsed ? '' : <div><br /><br /><br /></div>
                        }
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMenu}>

                            <Menu.Item key="1">
                                <Icon type="user-add" />
                                <span>Registro de Residentes</span>
                            </Menu.Item>

                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="team" /><span>Personal</span></span>}
                            >
                                <Menu.Item key="2">
                                    <Icon type="solution" />
                                    Division de estudios</Menu.Item>
                                <SubMenu
                                    key="sub5"
                                    title={<span><Icon type="team" /><span>Dictamen</span></span>}
                                >
                                    <Menu.Item key="8">Jefes de departamento académico</Menu.Item>
                                    <Menu.Item key="9" ><strong>Presidentes de academia</strong></Menu.Item>

                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="calendar" /><span>Periodo de residencia</span></span>}
                            >
                                <Menu.Item key="7">Gestion de periodo</Menu.Item>
                                <Menu.Item key="6" ><strong>Apertura de periodo</strong></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub6"
                                title={<span><Icon type="bars" /><span>Reportes</span></span>}
                            >
                                <Menu.Item key="12" >
                                    <Icon type="schedule" />
                                    Dictamenes</Menu.Item>
                                    <Menu.Item key="5" >
                                    <Icon type="schedule" />
                                    Seguimientos</Menu.Item>

                                <Menu.Item key="10" >
                                    <Icon type="solution" />
                                    <strong>Residente</strong></Menu.Item>

                                <Menu.Item key="13" >
                                    <Icon type="line-chart" />
                                    <strong>Estadisticas</strong></Menu.Item>
                            </SubMenu>
                            {/* <Menu.Item key="5" >
                                <Icon type="bars" />
                                <span>Revision de seguimientos</span>
                            </Menu.Item> */}
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
                                {component.title}
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
                </Layout >
            ) :
                (<Redirect to="/usuario/auth" />)
        )
    }
}

export default LayoutJefedep;