import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Modal, Input, Form} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import {getIsAuth} from '../api.jsx';


// components
import Docente from '../docente/index.jsx';
import Empresa from '../empresa/index.jsx';
import Departamento from '../departamento/departamento.jsx';
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import FormAddDocente from '../docente/components/FormAddDocente.jsx';
import GestionPeriodoDeResidencia from '../periodo_residencia/gestionToledo.jsx';
import FormAperturaPeriodoDeResidencia from '../jefeDep/addPeriodo.jsx';
import RevisionAnteproyectos from '../periodo_residencia/revisionAnteproyectos.jsx';
import RevisionSeguimientos from '../periodo_residencia/RevisionSeguimientos.jsx';
import Dictamen from '../periodo_residencia/dictamen.jsx';
import RevisionProyectoResidencia from '../docente/components/RevisionProyectoResidencia.jsx';
import GestionDeFormatos from '../jefeDep/GestionDeFormatos.jsx';
import GestionDeCoordinadores from '../jefeDep/GestionDeCoordinadores.jsx'; 
import GenerarReportesGenerales from '../jefeDep/GenerarReportesGenerales.jsx';
import GenerarReporteIndividual from '../jefeDep/GenerarReporteIndividual.jsx';
import GenerarReporteSeguimiento from '../jefeDep/GenerarReporteSeguimiento.jsx';
import GenerarDictamen from '../jefeDep/GenerarDictamen.jsx';
import AsginacionUsuario from '../jefeDep/AsignacionUsuario.jsx';
class LayoutJefedep extends Component{
    constructor(){
        super();
        this.state = {
            collapsed: true,
            isAuth: true,
            usuario: null,
            departamento: null,
            carreras: null,
            componentRender: {
                       title: null,
                       render: null
            },
            visibleCambiarContrasenia: false,
            visible_add_docente: false,
            props_add_docente: {
                id_departamento: null,
                nombre_departamento: null
            }
        }
    }
    getIsAuth(){
        getIsAuth().then((usuario) => {
            if(usuario.rol === 'jefe_departamento'){
                axios.get(`/api/carrera_todasss`)
                    .then(res => {
                        if(res.status === 200){
                         
                            this.setState({
                                carreras: res.data,
                                isAuth: usuario.isAuth,
                                usuario: usuario,
                                componentRender: {
                                    title: 'Asignar usuario y contraseña al Residente',
                                    render: <AsginacionUsuario/>

                                }
                            }
                        
                        
                        
                        
                        )
                        }else{
                            this.setState({isAuth: false})
                        }
                    })
            }
            else{
                this.setState({isAuth: false})
            }
        })
    }
    handleCarreras(){
        axios.get('/api/carrera')
    }
    componentWillMount(){
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false
        });
    }
    
    handleMenu = ({item, key, selectedKeys}) => {
        if(key == 8){
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false,
                visible_add_docente: false,
                componentRender: {
                    title: 'Gestión de Formatos',
                    render: <GestionDeFormatos />
                }
            })
        }else if (key == 2){
            const {carreras} = this.state;
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false,
                visible_add_docente: false,
                componentRender: {
                    title: 'Gestión de Coordinadores',
                    render: <GestionDeCoordinadores carreras={carreras} />
                }
            })
        }else if(key == 3){
            const {carreras} = this.state;
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Gestión de periodo de residencia',
                    render: <GestionPeriodoDeResidencia carreras={carreras}/>
                }
            })
        }else if(key == 4){
            const {carreras} = this.state;
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Apertura de periodo de residencia',
                    render: <FormAperturaPeriodoDeResidencia carreras={carreras}/>
                }
            })
        }else if(key == 5){
            const {departamento} = this.state
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Generar Reportes Generales',
                   render: <GenerarReportesGenerales/>
                }
            })
        }else if(key == 6){
            const {departamento} = this.state
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Generar Reporte Individual',
                   render: <GenerarReporteIndividual/>
                }
            })
        }else if(key == 11){
            const {departamento} = this.state
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Generar Reporte Seguimiento',
                   render: <GenerarReporteSeguimiento/>
                }
            })
        }else if(key == 9){
            const {departamento} = this.state
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Enviar  usuario y contraseña',
                   render: <AsginacionUsuario/>
                }
            })
        }else if(key == 10){
            const {departamento} = this.state
            this.setState({
                visible_add_docente: false,
                visibleCambiarContrasenia: false,
                componentRender: {
                    title: 'Generar Reporte Dictamen',
                   render: <GenerarDictamen/>
                }
            })
        }else if(key == 7){
            this.setState({
                visibleCambiarContrasenia: true,
                visible_add_docente: false
            })
        }
    }
    render(){
        const {isAuth, componentSelected, componentRender, visibleCambiarContrasenia, usuario, departamento, visible_add_docente, props_add_docente} = this.state
        return(
            isAuth ? (
                <Layout style={{minHeight:'100vh'}}>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        
                    >
                        <div className="logo" style={{textAlign: 'center'}}>
                            <img src="/img/tec_logo.png" alt="logo_tec" height="100%"/>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMenu}>
                        <SubMenu
                                key="sub1"
                                title={<span><Icon type="file-word" /><span>Gestion de formatos</span></span>}
                            >
                                <Menu.Item key="8" >
                                    <Icon type="file-add"/>
                                    <span>Formatos</span>
                                </Menu.Item>
                                

                            </SubMenu>
                        <SubMenu
                                key="sub2"
                                title={<span><Icon type="usergroup-add" /><span>Gestion Coordinadores</span></span>}
                            >
                                <Menu.Item key="2" >
                                    <Icon type="plus"/>
                                    <span>Agregar Coordinadores</span>
                                </Menu.Item>
                                

                            </SubMenu>
                            
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="calendar" /><span>Periodos de residencia</span></span>}
                            >
                             <Menu.Item key="3" >
                                    <Icon type="setting"/>
                                    <span>Gestion de periodo</span>
                                </Menu.Item>
                                
                                <Menu.Item key="4" >
                                    <Icon type="plus"/>
                                    <span>Apertura de periodo</span>
                                </Menu.Item>
                                

                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="folder-open" /><span>Generar Reportes</span></span>}
                            >
                                <Menu.Item key="5" >
                                    <Icon type="file-pdf"/>
                                    <span>Reportes Generales</span>
                                </Menu.Item>
                                <Menu.Item key="11" >
                                    <Icon type="layout"/>
                                    <span>Reporte Seguimiento</span>
                                </Menu.Item>
                                <Menu.Item key="6" >
                                    <Icon type="file-pdf"/>
                                    <span>Reportes Individuales</span>
                                </Menu.Item>
                                <Menu.Item key="10" >
                                    <Icon type="layout"/>
                                    <span>Dictamen</span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="team" /><span>Asignación de usuario y contraseña</span></span>}
                            >
                                <Menu.Item key="9" >
                                    <Icon type="plus"/>
                                    <span>Residentes</span>
                                </Menu.Item>
                                
                                 
                                
                            </SubMenu>
                             
                         
                            <Menu.Divider/>
                            <SubMenu
                                key="sub6"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                                >
                                <Menu.Item key="7">Cambiar contraseña</Menu.Item>
                                <Menu.Item ><a href="/api/usuario/logout"> <strong>Cerrar sesión</strong> </a> </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            {componentRender.title}
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            {componentRender.render}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Sistema de Seguimiento de residencias del ITCH ©2018 Francisco Arcos farcosj51@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia}/>
                </Layout>
            ):
            (<Redirect to="/usuario/auth"/>)
        )
    }
}

export default LayoutJefedep;