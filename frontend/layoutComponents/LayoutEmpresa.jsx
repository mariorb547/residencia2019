import React, {Component} from 'react';
import {render} from 'react-dom';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Modal, Input, Form} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import {getIsAuth} from '../api.jsx';

// components
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';
import RegistrarAnteproyecto from '../alumno/components/RegistrarAnteproyecto.jsx';
import ProyectosDeResidencia from '../asesor_externo/components/ProyectosDeResidencia1.jsx';
import FormAddAsesorExterno from '../asesor_externo/components/FormAddAsesorExterno.jsx'
// import FormAddAsesorExterno from '../asesor_externo'

export default class LayoutAsesorExterno extends Component{
    constructor(){
        super();
        this.state = {
            collapsed: true,
            isAuth: true,
            usuario: null,
            visibleFormAddAsesorExterno: false,
            componentRender: {
                       title: null,
                       render: null
            },
            props_add_asesor: {
                id_empresa: null,
                // nombre_empresa: null
            },
            visibleCambiarContrasenia: false,
        }
    }
    getIsAuth(){
        getIsAuth().then((usuario) => {
            if(usuario.rol === 'empresa'){
                axios.get(`/api/proyectos/empresa/${usuario.id}`)
                .then(res => {
                    if(res.status === 200){
                        this.setState({
                            isAuth: usuario.isAuth,
                            usuario: usuario,
                            visibleCambiarContrasenia: false,
                            props_add_asesor:{
                                id_empresa:usuario.id,
                            },
                            componentRender: {
                                    title: 'Proyectos de residencia',
                                    render: <ProyectosDeResidencia proyectos={res.data} usuario={usuario}/>
                            }
                        })
                    }
                })
            }else{
                this.setState({isAuth: false})
            }
        })
    }
    
    componentWillMount(){
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false,
            visibleFormAddAsesorExterno: false,
        });
    }
    
    handleMenu = ({item, key, selectedKeys}) => {
        if(key == 1){ // 
            
            // this.setState({
            //     componentSelected: key,
            //     visibleCambiarContrasenia: false,
            //     componentRender: {
            //         title: 'Registrar anteproyecto',
            //         render: <RegistrarAnteproyecto anteproyecto={anteproyecto}/>
            //     }
            // })
        }
        if(key == 3){ // modal cambiar contraseña
            this.setState({
                visibleCambiarContrasenia: true,
                visibleFormAddAsesorExterno: false,
            })
        }else  if(key == 4){ // modal cambiar contraseña
            this.setState({
                visibleCambiarContrasenia: false,
                visibleFormAddAsesorExterno: true,
            })
        }
    }
    fetchEmpresas= ()=>{

    }
    render(){
        const {isAuth, props_add_asesor,visibleFormAddAsesorExterno, componentRender,usuario, visibleCambiarContrasenia} = this.state
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
                            <Menu.Item key="1" >
                                <Icon type="inbox"/>
                                <span>Menu1</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                                >
                                <Menu.Item key="4">Agregar asesor externo</Menu.Item>
                                <Menu.Item key="3">Cambiar contraseña</Menu.Item>
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
                            Sistema de Seguimiento de residencias del ITCH ©2017 Francisco Blanco 00fblanco@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia}/>
                    <FormAddAsesorExterno visible={visibleFormAddAsesorExterno} empresa={props_add_asesor} onReloadFetch={this.fetchEmpresas.bind(this)} />

                </Layout>
            ):
            (<Redirect to="/usuario/auth"/>)
        )
    }
}
