import React, { Component } from 'react';
import render from 'react-dom';
import { Col, Table, Button, Select, message, notification } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import moment from 'moment';
import AddFoliosOtros from './AddFolios.jsx';
import AddFoliosResidente from './AddFoliosResidencias.jsx';
import uuid from 'uuid';
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
        axios.get(`/api/folio/otros`)
            .then(res => {
                if (res.status === 200) {
                     
                    const f = res.data.map((folios, key) => {
                         
                        return {
                            numero:folios.numero_de_folio,
                            emisor:folios.emisor.titulo+""+folios.emisor.nombre+" "+folios.emisor.ap_paterno+" "+folios.emisor.ap_materno,
                            destinatario:folios.nombre_destinatario,
                            descripcion:folios.descripcion,
                            ciclo:""+folios.folio.ciclo,
                            key:uuid.v4()
                        }


                    })
                    axios.get(`/api/folio/residentes`)
                    .then(res => {
                        if (res.status === 200) {
                           
                         res.data.map((folio, key) => {
                                f.push(  {
                                    numero:folio.numero_de_folio,
                                    emisor:folio.docente.titulo+""+folio.docente.nombre+" "+folio.docente.ap_paterno+" "+folio.docente.ap_materno,
                                    destinatario:folio.alumno.nombre+" "+folio.alumno.ap_paterno+" "+folio.alumno.ap_materno,
                                    descripcion:folio.descripcion,
                                    ciclo:""+folio.folios.folio.ciclo,
                                    key:uuid.v4()
                                });

                            })
                            this.setState({
                                folios: folio,
                                usuarios: f,
                            })
                        }})
                   
                   
                    // console.log('si entra pues')
                }
            })
    }
    //   emi=()=>{
    //     axios.get('/api/docentesGestion')
    //     .then(res => {
    //         if(res.status == 200){
              
    //             this.setState({
    //                 emisores:res.data
    //             })
              
    //         }
    //     })
    //   }
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
    }
    render() {
        const { loadTable, folios, usuarios,visible_add_folio_residentes, visible_add_folio_otros, numero_de_folio_otros, id_folio } = this.state;


        const columns = [
          
            {
                title: 'Numero de folio',
                dataIndex: 'numero',
                key: 'numero',
                sorter: (a, b) => a.numero - b.numero,
            },

            {
                title: 'Emisor',
                dataIndex: 'emisor',
                key: 'emisor'
            },
            {
                title: 'Destinatario',
                dataIndex: 'destinatario',
                key: 'destinatario'
            }, {
                title: 'Descripcion',
                dataIndex: 'descripcion',
                key: 'descripcion'
            },   {
                title: 'Ciclo',
                dataIndex: 'ciclo',
                key: 'ciclo',
                filters: [
                    {
                        text: '2017',
                        value:'2017'
                    },
                    {
                        text: '2018',
                        value:'2018'
                    },
                    {
                        text: '2019',
                        value: '2019'
                    },
                     
                ],
                onFilter: (value, record) => record.ciclo.indexOf(value) === 0,
            }, 

             

        ]
        var fecha = new Date();
        var ano = fecha.getFullYear();
        return (
            <div>
                 
                <h3>Historia Folios</h3>
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