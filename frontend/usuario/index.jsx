import React, {Component} from 'react';
import render from 'react-dom';
import {Row, Table, Button, message} from 'antd';

import axios from 'axios';
export default class Usuarios extends Component{
    constructor(){
        super();
        this.state = {
            usuarios: [],
            loadTable: true,            
        }
    }
    
    fetchUsuarios = () => {
        axios.get('/api/usuarios')
            .then(res => {
                if(res.status === 200){
                    const usuarios = res.data.map((usuario, key) => {
                        return {
                            id: usuario.id,
                            correo: usuario.correo,
                            rol: usuario.rol,
                            key,
                        }
                    })
                    this.setState({
                        usuarios,
                        loadTable: false,
                    })
                }
            })
    }
    componentDidMount(){
        this.fetchUsuarios();
    }
    enviarContrasenia = (id_usuario, correo) => {
        // alert(id_usuario)
        axios.put('/api/usuario/cambiar_contrasenia/email', {id_usuario, correo})
            .then(res => {
                if(res.status === 200){
                    message.success('Contraseña nueva enviada al correo del usuario!')
                }else{
                    message.error('Surgio un error, verificar conexión');
                }
            })
    }
    render(){
        const {usuarios, loadTable} = this.state;
        const columns = [
            {
                title: 'correo',
                dataIndex: 'correo',
                key: 'correo'
            }, {
                title: 'rol',
                dataIndex: 'rol',
                key: 'rol',
                filters: [
                    {
                        text: 'docente',
                        value: 'docente'
                    },
                    {
                        text: 'residente',
                        value: 'residente'
                    },
                    {
                        text: 'candidato_residente',
                        value: 'candidato_residente'
                    },
                    {
                        text: 'jefe_departamento',
                        value: 'jefe_departamento'
                    },
                    {
                        text: 'asesor_externo',
                        value: 'asesor_externo'
                    },
                    {
                        text: 'subdirector_academico',
                        value: 'subdirector_academico'
                    },
                ],
                onFilter: (value, record) => record.rol.indexOf(value) === 0,
            },
            {
                className: 'center-text',
                title: 'Recuperar contraseña',
                dataIndex: 'recover',
                key: 'recover',
                render: (text, record) => {

                    return (
                        <Button icon="reload" onClick={() => this.enviarContrasenia(record.id, record.correo)}>Enviar nueva contraseña a su correo</Button>
                    )
                }

            }
        ]
        return (
            <div>
                <h3>Usuarios del sistema</h3>
                <Row type="flex" style={{marginTop: 20}}>
                    <Table dataSource={usuarios} columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 1100 }} />
                </Row>
            </div>
        )
    }
}