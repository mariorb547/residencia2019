import React, { Component } from 'react';
import render from 'react-dom';
import { Col, Table, Button, Select, message, notification, Input, Icon } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import moment from 'moment';
const openNotificationWithIcon = () => {
    notification['warning']({
        message: 'Notificación del sistema',
        description: 'Para poder asignar el usuario y constraseña al candidato a residente debes haber seleccionado un periodo en el combobox de arriba por ejemplo periodo FEBRERO-JUNIO/2018.',
    });
};
notification.config({
    placement: 'topRight',
    bottom: 50,
    duration: 13,
});
 

export default class AsginacionUsuario extends Component {
    constructor() {
        super();
        this.state = {
            Empresas: [],
            loadTable: true,
            filterEmpresas: [],
            visible: false,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
             

        }
    }
    fetchPeriodos = () => {

       
    }

    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    onSearch = () => {
        const {searchText, Empresas} = this.state
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            visible: false,
            filterDropdownVisible: false,
            filtered: !!searchText,
            filterEmpresas: Empresas.map((record) => {
                console.warn(record)
                 const match = record.nombre.match(reg);
                 if(!match){
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
    fetchUsuarios = () => {
        axios.get('/api/directorio/empresas')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    const Empresas = res.data.map((empresa, key) => {
                        return {
                            nombre:empresa.nombre,
                            clasificacion:empresa.clasificacion,
                            fax:empresa.fax,
                            correo:empresa.correo,
                            telefono:empresa.telefono,
                            key,
                        }
                    })
                    this.setState({
                        Empresas,
                        loadTable: false,
                        filterEmpresas: Empresas,
                    })
                }
            })
    }
    componentDidMount() {
        this.fetchUsuarios();
     }
    enviarContrasenia = (id_usuario, correo, id_carrera) => {
        const { periodo } = this.state;
        periodo ?


            axios.get(`/api/alumno/periodot/${periodo + '+' + id_usuario + '+' + id_carrera}`).then(res => {
                if (res.status === 200) {
                    this.fetchUsuarios();
                    message.success('El usuario y la constraseña enviaron al correo del candidato a residente');
                } else {
                    message.error('ups hubo un error inesperado favor de contactar al administrador')
                }
            })
            : openNotificationWithIcon();

    }

    handlePeriodo = (value) => {
        // message.success(value)
        var cadena = value.split("#")
        var periodo = cadena[0];
        var fechas = cadena[1].split('+');

        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate + " =>>>>: " + fechas[0] + "------" + fechas[1]);
        if (currentDate >= fechas[0] && currentDate <= fechas[1]) {
            this.setState({
                periodo: periodo,
            })

        } else {
            message.warning('no se puede agregar residentes a ese perido ya que las fechas puestas hasta este momento no cumplen')
            this.setState({
                periodo: null,
            })
        }


    }
    render() {
        const { Empresas, loadTable, filterEmpresas } = this.state;
 

        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                width:300,
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
                        
                    }, () => this.searchInput.focus())
                }
            },
            {
                title: 'Clasificación',
                dataIndex: 'clasificacion',
                key: 'clasificacion',
                width:50,
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
                title: 'Telefono',
                dataIndex: 'telefono',
                key: 'telefono',
                width:50,
            } ,
            {
                title: 'Correo',
                dataIndex: 'correo',
                key: 'correo',
                width:100,
            },

           
            {
                title: 'fax',
                dataIndex: 'fax',
                key: 'fax',
                width:50,
            } 
        ]
        return (
            <div>
                <div >

                   
                </div>
                <h3>Empresas</h3>
                <Col xs={24} lg={24}>

                    <Table dataSource={filterEmpresas} columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 800 }} />
                </Col>
            </div>
        )
    }
}