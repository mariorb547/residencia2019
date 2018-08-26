import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, message, Icon, Avatar, Modal, Input, Form } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import { getIsAuth } from '../api.jsx';

// components
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import RegistrarAnteproyecto from '../alumno/components/RegistrarAnteproyecto.jsx';
import FormAddColaborador from '../alumno/components/FormAddColaborador.jsx';
import FormAddAlumno from '../alumno/components/FormEditAlumno.jsx';
import Foto from '../jefeDep/Foto.jsx';
class LayoutCandidatoAResidente extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            isAuth: true,
            usuario: null,
            imagen: null,
            nombre: null,

            componentRender: {
                title: null,
                render: null
            },
            visibleCambiarContrasenia: false,
            anteproyecto: null,
            visiblecolaborador: false,
            id_alumnoC: null,
            datosAlumno: null,
            visible_add_alumno: false,
        }
    }
    imagens = (id) => {

        axios.get(`/api/usuario/foto/${id ? id : this.state.usuario.id}`)
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        imagen: res.data,

                    })

                }
            })

    }
    logo = (titulo) => {
        return (
            <div className="titulo" style={{ textAlign: 'down', top: 10, height: 40, width: 1000 }}>
                <img src="/img/logoprincipal.png" alt="logo_tec" height="250%" />

                <div style={{ fontSize: 20 }}>{titulo} </div>
            </div>
        )
    }
    getDatosCandidato(id) {
        axios.get(`/api/alumno/informacion/${id}`).then(res => {
            if (res.status == 200) {
                this.imagens(res.data.id_usuario);
                if (res.data.sexo == null) {
                    this.setState({
                        visible_add_alumno: true,

                    })
                }
                this.setState({
                    datosAlumno: res.data,
                    nombre: res.data.nombre + " " + res.data.ap_paterno + " " + res.data.ap_materno,
                })
            } else {
                message.error('Ups hubo un error inesperado favor de contactar al administrador')
            }
        });
    }
    getIsAuth() {
        getIsAuth().then((usuario) => {
            if (usuario.rol === 'candidato_residente') {
                this.getDatosCandidato(usuario.id_alumno);
                axios.get(`/api/alumno/${usuario.id_alumno}/anteproyecto`)
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                anteproyecto: res.data,
                                isAuth: usuario.isAuth,
                                usuario: usuario,
                                id_alumnoC: res.data.id_alumno,
                                visiblecolaborador: false,
                                visibleCambiarContrasenia: false,
                                componentRender: {
                                    title: this.logo("Registro de anteproyecto"),
                                    render: <RegistrarAnteproyecto anteproyecto={res.data} />
                                }
                            })
                        } else {
                            this.setState({ isAuth: false })
                        }
                    })
            } else {
                this.setState({ isAuth: false })
            }
        })
    }
    componentWillMount() {
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false,
        });
    }

    handleMenu = ({ item, key, selectedKeys }) => {
        if (key == 1) { // Registrar anteproyecto
            const{ anteproyecto} = this.state;
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false,
                visiblecolaborador: false,
                componentRender: {
                    title: this.logo("Registro de anteproyecto"),
                    render: <RegistrarAnteproyecto anteproyecto={anteproyecto} />
                }
            })
        }
        if (key == 3) { // modal cambiar contraseña
            this.setState({
                visibleCambiarContrasenia: true,
                visiblecolaborador: false,
                visible_add_alumno: false
            })
        }
        if (key == 4) { // modal cambiar contraseña
            this.setState({
                visiblecolaborador: true,
                visibleCambiarContrasenia: false,
                visible_add_alumno: false

            })

        } if (key == 5) {
            this.setState({
                componentSelected: key,
                componentRender: {
                    title: this.logo("Actualizacion de tu foto de perfil"),
                    render: <Foto ok={this.imagens.bind(this)}/>
                }
            })
        }
    }
    render() {
        const { isAuth, imagen, nombre, componentSelected, visible_add_alumno, datosAlumno, componentRender, usuario, visibleCambiarContrasenia, visiblecolaborador, id_alumnoC } = this.state
        return (
            isAuth ? (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}

                    >
                        <center>

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
                            <Menu.Item key="1" >
                                <Icon type="inbox" />
                                <span>Registrar anteproyecto</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="user-add" /><span>Colaborador</span></span>}
                            >
                                <Menu.Item key="4">Añadir colaborador</Menu.Item>

                            </SubMenu>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                            >
                                
                                <Menu.Item key="3">Cambiar contraseña</Menu.Item>
                                <Menu.Item key="5">
                                    <Icon type="camera" />
                                    Actializar foto</Menu.Item>
                                <Menu.Item ><a href="/api/usuario/logout"> <strong>Cerrar sesión</strong> </a> </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0., height: 150 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                             <div style={{ float: 'right', left: 50 }} >
                            {componentRender.title}
                            </div>
                        </Header>
                        <Content style={{ margin: '0px 0px', padding: 24, background: '#fff' }}>
                            {componentRender.render}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Sistema de Seguimiento de residencias del ITCH ©2017 Francisco Blanco 00fblanco@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia} />
                    <FormAddColaborador visible={visiblecolaborador} id_alumno={id_alumnoC}
                    />
                    <FormAddAlumno visible={visible_add_alumno} datosAlumno={datosAlumno} />

                </Layout>
            ) :
                (<Redirect to="/usuario/auth" />)
        )
    }
}

export default LayoutCandidatoAResidente;