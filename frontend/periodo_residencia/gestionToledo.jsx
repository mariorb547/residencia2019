import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Avatar, DatePicker, Timeline, Icon, Popconfirm} from 'antd';
const Option = Select.Option;

import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

// component
import FormAddAlumno from '../alumno/components/FormAddAlumno.jsx';
import FormAddSeguimiento from '../periodo_residencia/addSeguimientos.jsx';


export default class GestionPeriodoDeResidencia extends Component{
    constructor(){
        super();
        this.state = {
            periodoss: null,
            carreraSeleccionada: null,
            visible_add_alumno: false,
            visible_add_seguimiento: false,
            id_periodo: null,
            alumnos_rechazados_por_carrera: [],
            fecha_inicioP: null,
        }
    }
    handleCancelacion = (id_alumno) => {
        axios.put('/api/alumno/cancelacion', {
            id_alumno
        }).then(res => {
                if(res.status === 200){
                    message.success('Se realizado la cancelación del proyecto del alumno!')
                    this.setState({
                        visible_add_alumno: false,
                        visible_add_seguimiento: false,
                    })
                }else{
                    message.error('Ops, hubo un error al realizar la cancelación, favor de reportar al administrador.')
                }
            })
    }
    showListaCandidatosResidente = (id_periodo) => {
        axios.get(`/api/periodo/${id_periodo}/anteproyectos`)
            .then(res => {
                if(res.status === 200){
                    const candidatos = res.data.map((candidato, index) => {
                        return (
                                <div style={{overflowY: 100}}>
                                    <Timeline.Item  key={index} color="green" dot={<Icon type="check-circle-o" style={{ fontSize: '16px', marginTop: 10, marginLeft: 10}} />}>
                                        <p>{`${candidato.nombre} ${candidato.ap_paterno} ${candidato.ap_materno}`}</p>
                                        <Popconfirm title={(<span><p>¿Esta seguro de realizar la cancelación de proyecto?</p><p>al realizar esta acción, se borrara todo la información relacionada a este alumno</p><p>y se podra agregar al alumno a otro periodo.</p></span>)} onConfirm={() => this.handleCancelacion(candidato.id)} okText="Si" cancelText="Cancelar">
                                            <Button icon="user-delete" style={{marginTop: 5}} type="danger" >Realizar cancelación</Button>
                                        </Popconfirm>
                                    </Timeline.Item>
                                </div>
                        )
                    })
                    Modal.info({
                        width: 600,
                        title: 'Lista residentes del periodo.',
                        content: (
                            <Timeline>
                                {candidatos}
                            </Timeline>),
                        onOk(){}
                    })
                }
            })
        
    }
    componentWillMount() {
        axios.get(`/api/periodoss`)
            .then(res => {
                if(res.status === 200){
                  console.log("==>",res.data)
                  this.setState({
                      periodoss:res.data,
                  })
                }
            })
    }
    showAddAlumno = (id_periodo) => {
        
        this.setState({
            visible_add_alumno: true,
            visible_add_seguimiento: false,
            id_periodo
        })
        
    }
    showAddSeguimiento = (id_periodo, fecha_fin) => {
        this.setState({
            visible_add_alumno: false,
            visible_add_seguimiento: true,
            id_periodo
        })
    }
    
    showSeguimientos = (seguimientos) => {

        console.warn(seguimientos);
        const seguimientos_map = seguimientos.map((seguimiento, key) => {
            return (
                <Timeline.Item key={key}>
                    <p><strong>{(key+1)}</strong> - Del {moment(seguimiento.fecha_inicial, 'YYYY-MM-DD').format('LL')} al {moment(seguimiento.fecha_final,'YYYY-MM-DD').format('LL')}</p>
                </Timeline.Item>
            )
        })
        
        Modal.info({
            title: 'Seguimientos',
            width: 600,
            content: (
                <Timeline>
                    {seguimientos_map}
                </Timeline>
            ),
            onOk(){}
        })
    }


    handleChageCarrera = (value) => {
        // componentWillMount();
        this.setState({
            fecha_inicioP: value,
            
        })
        const {carreras} = this.state;
        //const carrera = carreras.carreras.find((carrera) => `${carrera.id}` === value);
        axios.get(`/api/carrera/periodos_todos/${value}`,{
          
        })
            .then(res => {
                if(res.status === 200){
                    // console.log('alv',res.data)
                    // axios.get(`/api/alumnos/${carrera.id}/rechazados`)
                    //     .then(_res => {
                    //         if(_res.status === 200){
                                this.setState({
                                    // alumnos_rechazados_por_carrera: _res.data._alumnos,
                                    carreraSeleccionada: res.data,
                                    visible_add_alumno: false,
                                    visible_add_seguimiento: false
                                })
                        //     }
                        // })
                }else{
                    message.warning('Verificar conexión.')
                }
            })   
    }
    handleChageCarrerarefres = () => {
       const {fecha_inicioP} = this.state;
        
  
        //const carrera = carreras.carreras.find((carrera) => `${carrera.id}` === value);
        axios.get(`/api/carrera/periodos_todos/${fecha_inicioP}`,{
          
        })
            .then(res => {
                if(res.status === 200){
                    // console.log('alv',res.data)
                    // axios.get(`/api/alumnos/${carrera.id}/rechazados`)
                    //     .then(_res => {
                    //         if(_res.status === 200){
                                this.setState({
                                    // alumnos_rechazados_por_carrera: _res.data._alumnos,
                                    carreraSeleccionada: res.data,
                                    visible_add_alumno: false,
                                    visible_add_seguimiento: false
                                })
                        //     }
                        // })
                }else{
                    message.warning('Verificar conexión.')
                }
            })   
    }
     
    handleChangeFechaFinEntregaAnteproyecto = (fecha_fin_entrega_anteproyecto, datoamodificar) => {
        const fecha= this.state.fecha_inicioP;
        axios.put('/api/periodo/fecha_fin_entrega_anteproyectos', {
            fecha_fin_entrega_anteproyecto: fecha_fin_entrega_anteproyecto.format('YYYY-MM-DD'),
            fecha,
            datoamodificar,
            
        }).then(res => {
            if(res.status === 200){
                // console.log('alv',res.data)
                message.success('Fecha de entrega de anteproyectos actualizada!')
               this.handleChageCarrerarefres();
            }else{
                message.warning('Ups, verificar conexión.')
            }
        }) 
        
    }
    eliminarObjetosDuplicados(arr, prop) {
        var nuevoArray = [];
        var lookup = {};
    
        for (var i in arr) {
            lookup[arr[i][prop]] = arr[i];
        }
    
        for (i in lookup) {
            nuevoArray.push(lookup[i]);
        }
    
        return nuevoArray;
    }
    render(){
        const {periodoss,fecha_inicioP , carreraSeleccionada, visible_add_alumno, id_periodo, visible_lista_candidatos_residente, alumnos_rechazados_por_carrera, visible_add_seguimiento} = this.state
        const currentDate = moment().format('YYYY-MM-DD');
        var contador=0;
        const periodos = carreraSeleccionada ? carreraSeleccionada.map((periodo, index) => {
            
                return { 
                    id: periodo.id, 
                    key:0,// uuid.v1() le puse el cero por que solo quiero que visualize uno nada mas lo demas es repetitivo
                    periodo: periodo.periodo,
                    ciclo: periodo.ciclo,
                    fecha_periodo: `${periodo.fecha_inicio} - ${periodo.fecha_fin}`,
                    fecha_fin: periodo.fecha_fin ,
                    fecha_inicio_entrega_anteproyecto: periodo.fecha_inicio_entrega_anteproyecto,
                    fecha_fin_entrega_anteproyecto:  periodo.fecha_fin_entrega_anteproyecto,
                    fecha_inicio_dictamen: periodo.fecha_inicio_dictamen,
                    fecha_fin_dictamen:periodo.fecha_fin_dictamen,
                    fecha_inicio_lai:periodo.fecha_inicio_lai,
                    fecha_fin_lai: periodo.fecha_fin_lai,
                    fecha_inicio_eef:periodo.fecha_inicio_eef,
                    fecha_inicio_eef:periodo.fecha_inicio_eef,
                    fecha_fin_eef:periodo.fecha_fin_eef,
                    fecha_inicio_entrega_empresa:periodo.fecha_inicio_entrega_empresa,
                    fecha_fin_entrega_empresa: periodo.fecha_fin_entrega_empresa,
                    fecha_inicio_liberacion_empresa:periodo.fecha_inicio_liberacion_empresa,
                    fecha_fin_liberacion_empresa: periodo.fecha_fin_liberacion_empresa,
                    acciones: (moment().format('YYYY-MM-DD') >= periodo.fecha_inicio_entrega_anteproyecto && moment().format('YYYY-MM-DD') <= periodo.fecha_fin_entrega_anteproyecto) ? true : false,
                    lista_candidatos: 'on',
                    seguimientos: periodo.seguimientos
                 
               }
        }): null;
        console.log(periodos)

        const columns = [
            {
                className: 'center-text',
                title: 'Periodo',
                key: 'periodo',
                dataIndex: 'periodo',
                fixed: 'left'
            }, 
            {
                className: 'center-text',
                title: 'Ciclo',
                key: 'ciclo',
                dataIndex: 'ciclo',
                fixed: 'left'
            },
            {
                className: 'center-text',
                title: 'Fecha de periodo',
                key: 'fecha_periodo',
                dataIndex: 'fecha_periodo'
            },
            {
                className: 'center-text',
                title: 'Fecha entrega anteproyectos',
                key: 'fecha_entrega_anteproyecto',
                dataIndex: 'fecha_entrega_anteproyecto',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_entrega_anteproyecto} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, 'anteproyecto')}} disabledDate={current => (current.format('YYYY-MM-DD') > moment(record.fecha_fin, "YYYY-MM-DD").format('YYYY-MM-DD') || current.format('YYYY-MM-DD') < moment(record.fecha_inicio_entrega_anteproyecto, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_entrega_anteproyecto, "YYYY-MM-DD")}/>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Fecha turno de dictamen',
                key: 'fecha_turno_dictamen',
                dataIndex: 'fecha_turno_dictamen',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_dictamen} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, 'dictamen')}} disabledDate={current => (current.format('YYYY-MM-DD') < moment(record.fecha_fin_dictamen, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_dictamen, "YYYY-MM-DD")}/>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Fecha de liberacion del asesor interno',
                key: 'fecha_inicio_lai',
                dataIndex: 'fecha_inicio_lai',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_lai} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, 'lai')}} disabledDate={current => ( current.format('YYYY-MM-DD') < moment(record.fecha_fin_lai, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_lai, "YYYY-MM-DD")}/>
                    </span>
                )
            },   {
                className: 'center-text',
                title: 'Fecha de liberacion del asesor externo',
                key: 'fecha_inicio_eef',
                dataIndex: 'fecha_inicio_eef',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_eef} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, 'lae')}} disabledDate={current => ( current.format('YYYY-MM-DD') < moment(record.fecha_fin_eef, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_eef, "YYYY-MM-DD")}/>
                    </span>
                )
            },  {
                className: 'center-text',
                title: 'Fecha de entrega a la empresa',
                key: 'fecha_inicio_entrega_empresa',
                dataIndex: 'fecha_inicio_entrega_empresa',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_entrega_empresa} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, 'entrega')}} disabledDate={current => (current.format('YYYY-MM-DD') < moment(record.fecha_fin_entrega_empresa, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_entrega_empresa, "YYYY-MM-DD")}/>
                    </span>
                )
            }, {
                className: 'center-text',
                title: 'Fecha de liberacion de la empresa',
                key: 'fecha_inicio_liberacion_empresa',
                dataIndex: 'fecha_inicio_liberacion_empresa',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_liberacion_empresa} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate,'liberacion')}} disabledDate={current => ( current.format('YYYY-MM-DD') < moment(record.fecha_fin_liberacion_empresa, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_liberacion_empresa, "YYYY-MM-DD")}/>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Seguimientos',
                key: 'seguimientos',
                dataIndex: 'seguimientos',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Button style={{marginRight: 2, marginLeft: 2}} type="primary" icon="bars" onClick={() => this.showSeguimientos(record.seguimientos)}>Lista</Button>
                        {(currentDate > record.fecha_fin) ? '' :
                        <Button style={{marginRight: 2, marginLeft: 2}} icon="plus" onClick={() => this.showAddSeguimiento(record.id, record.fecha_fin)}>Seguimiento</Button>
                        }
                    </div>
                )
            },
            //  {
            //     className: 'center-text',
            //     title: 'Lista de candidatos',
            //     key: 'lista_candidatos',
            //     dataIndex: 'lista_candidatos',
            //     render: (text, record) => (
            //         <span>
            //             <Button icon="solution" onClick={() => this.showListaCandidatosResidente(record.id)}></Button>
            //         </span>
            //     )
            // }
        ]
        return (
            <Row gutter={16}>
                <Col xs={24} lg={4}>
                        <p>Seleccione el periodo: </p>
                        <Select
                            placeholder="Seleccione periodo"                           
                            style={{width: '110%'}}
                            onChange={this.handleChageCarrera}
                        > 
                            
                        {periodoss?periodoss.map((periodo, index) => {return <Option key={index} value={`${periodo.periodo}+${periodo.ciclo}`} >{periodo.periodo+"/"+periodo.ciclo}</Option>}):''}
                        </Select>
                </Col>
                <Col xs={24} lg={30}>
                    <Table bordered title={() => 'Gestión de periodos'}  pagination={false} dataSource={this.eliminarObjetosDuplicados(periodos,'key')} className="full-width" columns={columns} pagination={ false}  scroll={{ x: 2050 }} />
                </Col>
                
                <FormAddAlumno visible={visible_add_alumno} carrera={carreraSeleccionada} id_periodo={id_periodo} alumnos_rechazados_por_carrera={alumnos_rechazados_por_carrera}/>
                <FormAddSeguimiento visible={visible_add_seguimiento}   fecha={fecha_inicioP} Onresfrecar={this.handleChageCarrerarefres.bind(this)}/>
            </Row>

            
        )
    }
}