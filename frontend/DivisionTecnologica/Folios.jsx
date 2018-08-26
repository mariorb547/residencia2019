import React, { Component } from 'react';
import render from 'react-dom';
import { Col, Table, Button, Select, message, notification } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import moment from 'moment';
import AddFoliosOtros from './AddFolios.jsx';
import AddFoliosResidente from './AddFoliosResidencias.jsx';
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
// import addFoliosOtros from './AddFolios.jsx';

export default class AsginacionUsuario extends Component {
    constructor() {
        super();
        this.state = {
            numero_de_folio_otros: null,
            visible_add_folio_otros: false,
            visible_add_folio_residentes:false,
            id_folio: null,
            usuarios: [],
            emisores:null,
            loadTable: false,
            folios: [],
            periodo: null,
            ciclo: null

        }
    }
    // componentWillReceiveProps(nextProps) {
    //     const {visible_add_folio_otros, numero_de_folio_otros} = nextProps;
    //     this.setState({
    //         visible_add_folio_otros: visible_add_folio_otros,
    //         numero_de_folio_otros: numero_de_folio_otros
    //     })
    // }
    fetchFolios = () => {
        var fecha = new Date();
        var ano = fecha.getFullYear();
        const folio = [];
        var bandera = true;
        axios.get(`/api/folio`)
            .then(res => {
                if (res.status === 200) {
                    const f = res.data.map((fol, key) => {
                        if (fol.ciclo === ano) {
                            bandera = false;
                            // message.success('holaaa');
                        }
                        return {
                            id: fol.id,
                            numero: fol.numero_folio,
                            ciclo: fol.ciclo,
                            estado: fol.estado ? 'Activo' : 'Terminado',
                            key,
                        }


                    })
                    if (bandera) {
                        // message.success('hola')
                        folio.push(<Option key={1} value={`${ano}`}>{ano}</Option>)
                    }
                    this.setState({
                        folios: folio,
                        usuarios: f,
                    })
                    // console.log('si entra pues')
                }
            })
    }
      emi=()=>{
        axios.get('/api/primeroword/1')
        .then(res => {
            if(res.status == 200){
                 <a style={{color: '#4da1ff'}} href="/plantillas/solicitud.docx">Plantilla de plan de trabajo <Icon type="cloud-download"/></a>
                
            }
        })
      }
    componentDidMount() {
      
        this.fetchFolios();
        // this.emi();
    }

    recargar=()=>{
        this.fetchFolios();
        this.setState({
            visible_add_folio_otros:false,
            visible_add_folio_residentes:false
        })
    }
    addFolios = (id_folio, numero_de_folio) => {
        // axios.get('/api/docentesGestion')
        // .then(res => {
        //     if(res.status == 200){
        //         console.log('vamos bien we')
        //         var emisor= res.data;//claro claro claro 
                this.setState({
                    // emisores:emisor,
                    visible_add_folio_otros: true,
                    visible_add_folio_residentes:false,
                    numero_de_folio_otros: numero_de_folio,
                    id_folio: id_folio
                })
              
        //     }
        // })
       
    }
    addFoliosReservar = (id_folio, numero_de_folio) => {
        // axios.get('/api/docentesGestion')
        // .then(res => {
        //     if(res.status == 200){
        //         console.log('vamos bien we')
        //         var emisor= res.data;//claro claro claro 
                this.setState({
                    // emisores:emisor,
                    visible_add_folio_residentes: true,
                    visible_add_folio_otros:false,
                    numero_de_folio_otros: numero_de_folio,
                    id_folio: id_folio
                })
              
        //     }
        // })
       
    }
    handlePeriodo = (value) => {
        // message.success(value)
        this.setState({
            ciclo: value
        })

    }
    ///dibdudb
    iniciarFolios = () => {
        const anio = this.state.ciclo;
        anio === null ? message.warning('Debes seleccionar el ciclo para poner agregar el inicio de folios') :
            axios.post('/api/folio', {
                anio,

            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    message.success("Folio  agregado satisfactoriamente")
                    this.fetchFolios();
                } else {
                    message.warning('En el ciclo seleccionado ya se iniciaron los folios');
                }
            }).catch((err) => {
                message.error(err);
            })
        // this.emi();
    }
    render() {
        const { loadTable, folios, usuarios,visible_add_folio_residentes, visible_add_folio_otros, numero_de_folio_otros, id_folio } = this.state;


        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Numero de folio',
                dataIndex: 'numero',
                key: 'numero'
            },

            {
                title: 'Ciclo',
                dataIndex: 'ciclo',
                key: 'ciclo'
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado'
            }, {
                className: 'center-text',
                title: 'Accion',
                dataIndex: 'key',
                key: 'key',
                render: (text, record) => {
                    return (
                        <div>
                            {
                                record.estado === 'Terminado' ? 'Dado el ciclo escolar terminado no puede reservar folios para residentes' :
                                    <span>
                                        <Button icon="plus" onClick={() => this.addFoliosReservar(record.id, record.numero+1)}>Reservar Folios para residentes</Button>
                                        <Button icon="plus" onClick={() => this.addFolios(record.id, record.numero+1)}>Generar folio</Button>
                                    </span>


                            }
                        </div>
                    )

                }

            }

        ]
        var fecha = new Date();
        var ano = fecha.getFullYear();
        return (
            <div>
                <div >

                    <Select placeholder="Seleccione el ciclo"
                        onChange={this.handlePeriodo}
                        style={{ width: 150, left: 650, fontSize: 12 }}>
                        {/* <Option key={1} value={`${ano}`}>{ano}</Option> */}
                        {
                            folios
                        }
                    </Select>
                    <Button type='primary' onClick={() => this.iniciarFolios()} style={{ left: 750 }}>Iniciar Folios</Button>

                </div>
                <h3>Folios</h3>
                <Col xs={24} lg={24}>

                    <Table dataSource={usuarios} columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 1100 }} />
                </Col>
                <Col xs={24} lg={24}>
               <AddFoliosResidente visible={visible_add_folio_residentes} numero={numero_de_folio_otros} id_folio={id_folio} recargar={this.recargar.bind(this)} />
                <AddFoliosOtros visible={visible_add_folio_otros} numero={numero_de_folio_otros} id_folio={id_folio} recargar={this.recargar.bind(this)} />
                </Col>
            </div>
        )
    }
}