import React, { Component } from 'react';
import { Col, Row, Tabs, Icon, Alert, message } from 'antd'
const { TabPane } = Tabs;

import uuid from 'uuid';
import moment from 'moment';
import axios from 'axios';
// components
import WrappedFormSeguimiento from '../../alumno/components/FormSeguimientoDivision.jsx';
import WrappedFormSeguimientoFinal from '../../alumno/components/FormSeguimientoFinalDivision.jsx';
import TerminoDeSeguimiento from '../../jefeDep/TerminoSeguimientos.jsx';

var params = require(__dirname + '/../../../config/params.json');



export default class SeguimientoProyecto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seguimientos: props.segui,
            renderSeguimiento: null
        }
    }
    componentWillReceiveProps(nextProps) {
        // message.success('Que show como andas compa ')
        this.setState({
            seguimientos: nextProps.seguimientos,

            renderSeguimiento: null
        })
    }
    actualizarsituacion = (id) => {


        axios.put('/api/alumno/situacion', {
            id,
            estado: 'cancelado'
        }).then((res) => {
            if (res.status = 200) {

                console.log('ok se cambio el estado ')

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })
    }

    actualizarsituacionfinal = (id) => {


        axios.put('/api/alumno/situacion', {
            id,
            estado: 'abandonado'
        }).then((res) => {
            if (res.status = 200) {

                console.log('ok se cambio el estado ')

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })
        return 'abandonado';
    }
    actualizaSuNumeroDeSeguimientosEntregados = (id, numeroseguimientos) => {

        axios.put('/api/alumno/situacion/numeroseguimientos', {
            id,
            numeroseguimientos
        }).then((res) => {
            if (res.status = 200) {

                console.log('ok se cambio el numero ')

            } else {
                message.error("Ups ha visto un problema, favor de contactar al administrador")
            }
        })

    }
    onChangeSeguimiento = (id_seguimiento) => {

        const { seguimientos } = this.state;
        const currentDate = moment().format('YYYY-MM-DD');
        const segui = id_seguimiento.split("+");
        if (id_seguimiento === 'seguimiento_final') {

            axios.get(`/api/seguimiento/generar/reportefinal/${seguimientos[0].id_periodo}`).then(res => {
                if (res.status === 200) {
                    // if(currentDate >= moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD') && currentDate<= moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD')){
                    if (true) {
                        const residentes = res.data.anteproyectos.map((anteproyecto, key) => {
                            return {
                                NO: key + 1,
                                control: anteproyecto.alumno.no_control,
                                nombre: anteproyecto.alumno.nombre + " " + anteproyecto.alumno.ap_paterno + " " + anteproyecto.alumno.ap_materno,
                                Anteproyecto: anteproyecto.nombre,
                                asesor: anteproyecto.asesor_interno ? anteproyecto.asesor_interno.titulo + " " + anteproyecto.asesor_interno.nombre + " " + anteproyecto.asesor_interno.ap_paterno + " " + anteproyecto.asesor_interno.ap_materno : '',
                                fecha: res.data.periodo.fecha_fin,
                                lugar: anteproyecto.asesor_externo ? anteproyecto.asesor_externo.empresa.nombre : '',
                                cumplio: (anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_interno && anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_externo) ? 'SI' : 'NO',
                                estado: anteproyecto.alumno.situacion[0].estado === 'cancelado' && anteproyecto.alumno.situacion[0].numeroseguimientos === 0 ? this.actualizarsituacionfinal(anteproyecto.alumno.id) : anteproyecto.alumno.situacion[0].estado,
                                key,
                            }
                        })

                        this.setState({
                            renderSeguimiento: <TerminoDeSeguimiento periodo={res.data.periodo} />
                            // renderSeguimiento: <WrappedFormSeguimientoFinal residentes={residentes} periodo={res.data.periodo}/>
                        })
                    } else {
                        this.setState({
                            renderSeguimiento: <Alert message={`El seguimiento final no esta disponible,\n Fecha inicial: ${moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')} - Fecha final: ${moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')}`} type="warning" showIcon />
                        })
                    }


                } else {
                    message.error('Ups se ocasiono un problema favor de contactar al administrador')
                }

            })

        }else if(id_seguimiento === "reporte_final"){
            axios.get(`/api/seguimiento/generar/reportefinal/${seguimientos[0].id_periodo}`).then(res => {
                if (res.status === 200) {
                    // if(currentDate >= moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD') && currentDate<= moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('YYYY-MM-DD')){
                    if (true) {
                        const residentes = res.data.anteproyectos.map((anteproyecto, key) => {
                            return {
                                NO: key + 1,
                                control: anteproyecto.alumno.no_control,
                                nombre: anteproyecto.alumno.nombre + " " + anteproyecto.alumno.ap_paterno + " " + anteproyecto.alumno.ap_materno,
                                Anteproyecto: anteproyecto.nombre,
                                asesor: anteproyecto.asesor_interno ? anteproyecto.asesor_interno.titulo + " " + anteproyecto.asesor_interno.nombre + " " + anteproyecto.asesor_interno.ap_paterno + " " + anteproyecto.asesor_interno.ap_materno : '',
                                fecha: res.data.periodo.fecha_fin,
                                lugar: anteproyecto.asesor_externo ? anteproyecto.asesor_externo.empresa.nombre : '',
                                cumplio: (anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_interno && anteproyecto.proyectos[0].autorizar_carta_liberacion_asesor_externo) ? 'SI' : 'NO',
                                estado: anteproyecto.alumno.situacion[0].estado === 'cancelado' && anteproyecto.alumno.situacion[0].numeroseguimientos === 0 ? this.actualizarsituacionfinal(anteproyecto.alumno.id) : anteproyecto.alumno.situacion[0].estado,
                                key,
                            }
                        })

                        this.setState({
                            // renderSeguimiento: <TerminoDeSeguimiento periodo={res.data.periodo} />
                            renderSeguimiento: <WrappedFormSeguimientoFinal residentes={residentes} periodo={res.data.periodo}/>
                        })
                    } else {
                        this.setState({
                            renderSeguimiento: <Alert message={`El seguimiento final no esta disponible,\n Fecha inicial: ${moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').subtract(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')} - Fecha final: ${moment(res.data.periodo.fecha_fin, 'YYYY-MM-DD').add(params.periodo_residencia.dias_habiles_seguimiento_final, 'days').format('LL')}`} type="warning" showIcon />
                        })
                    }


                } else {
                    message.error('Ups se ocasiono un problema favor de contactar al administrador')
                }

            })
        } else {
            const seguimiento = seguimientos.find(seg => seg.id == segui[0]);
            if (currentDate >= seguimiento.fecha_final) {
                axios.get(`/api/seguimiento/generar/${seguimiento.id}`).then(res => {
                    if (res.status == 200) {
                        const residentes = res.data.map((seguimientos, key) => {
                            seguimiento.revisado ? console.log('que pasa we que pasa') : seguimientos.estado_seguimiento === 'no cumplio' && seguimientos.proyecto.anteproyecto.alumno.situacion[0].estado === 'activo' ? this.actualizarsituacion(seguimientos.proyecto.anteproyecto.alumno.id) : ''
                            seguimiento.revisado ? '' : seguimientos.estado_seguimiento === 'cumplio' ? this.actualizaSuNumeroDeSeguimientosEntregados(seguimientos.proyecto.anteproyecto.alumno.id, seguimientos.proyecto.anteproyecto.alumno.situacion[0].numeroseguimientos) : ''

                            return {
                                NO: key + 1,
                                control: seguimientos.proyecto.anteproyecto.alumno.no_control,
                                nombre: seguimientos.proyecto.anteproyecto.alumno.nombre + " " + seguimientos.proyecto.anteproyecto.alumno.ap_paterno + " " + seguimientos.proyecto.anteproyecto.alumno.ap_materno,
                                Anteproyecto: seguimientos.proyecto.anteproyecto.nombre,
                                asesor: seguimientos.proyecto.anteproyecto.asesor_interno.titulo + ". " + seguimientos.proyecto.anteproyecto.asesor_interno.nombre + " " + seguimientos.proyecto.anteproyecto.asesor_interno.ap_paterno + " " + seguimientos.proyecto.anteproyecto.asesor_interno.ap_materno,
                                fecha: seguimiento.fecha_inicial,
                                lugar: seguimientos.proyecto.anteproyecto.asesor_externo.empresa.nombre,
                                cumplio: seguimientos.estado_seguimiento === 'cumplio' ? 'SI' : 'NO',
                                key,
                            }
                        })
                        this.setState({
                            renderSeguimiento: <WrappedFormSeguimiento seguimiento={seguimiento} residentes={residentes} numeroseguimiento={segui[1]} />
                        })

                        seguimiento.revisado ? console.log('ya lo habias visto we') : axios.put(`/api/revisar/seguimiento/${seguimiento.id}`).then(res => {
                            if (res.status === 200) {
                                console.log('ya vi el seguimiento :', seguimiento.id)
                            } else {
                                console.log('paso algo no pudo ver el seguimiento')
                            }
                        });
                    }
                })

            } else {
                this.setState({
                    renderSeguimiento: <Alert message={`No puede acceder al seguimiento,\n Fecha final: ${moment(seguimiento.fecha_final, 'YYYY-MM-DD').format('LL')}`} type="warning" showIcon />
                })
            }
        }


    }
    handleSeguimientos = (id_seguimiento) => {
        // const { carreras } = this.state;
        // const car = carreras.carreras.find((carrera) => `${carrera.id}` === id_carrera);


        this.setState({
            carrera: null,
        })
        id_seguimiento != '' ?
            axios.get(`/api/seguimientos/divi/${id_seguimiento}`)
                .then(res => {
                    if (res.status === 200) {


                        this.setState({
                            carrera: <Seguimientos segui={res.data} />,
                        })
                    } else {
                        message.warning('Verificar lo que has seleccionado')
                    }
                })
            : message.error('Debes selecionar un periodo con la carrera deseada')




    }
    render() {
        const { seguimientos, renderSeguimiento } = this.state;
        const currentDate = moment().format('YYYY-MM-DD');
        return (
            <div>
                <br />
                <h2>Seguimientos :</h2>
                <br />
                {/* <br/> */}
                <Row>
                    <Col xs={24} lg={24}>
                        <Tabs defaultActiveKey="-1" tabPosition="center" onChange={(key) => this.onChangeSeguimiento(key)}>
                            {seguimientos.map(((seguimiento, index) => {
                                return (
                                    <TabPane tab={<span><Icon type={currentDate > seguimiento.fecha_final ? (seguimiento.revisado ? 'eye-o' : 'eye') : 'clock-circle-o'} />{`Seguimiento ${index + 1}`}</span>} key={seguimiento.id + "+" + (index + 1)}>
                                    </TabPane>
                                )
                            }))}
                            <TabPane tab={<span><Icon type="schedule" />Reporte final</span>} key={"reporte_final"}>

                            </TabPane>
                            <TabPane tab={<span><Icon type="schedule" />Resultados </span>} key={"seguimiento_final"}>

                            </TabPane>
                        </Tabs>

                    </Col>
                    <Col xs={24} lg={24}>
                        {renderSeguimiento}
                    </Col>
                </Row>


            </div>
        )
    }
}