import React, { Component } from 'react';

import { Select, Row, Col, message, Input, Layout } from 'antd';
const Option = Select.Option;
const DemoBox = props => <div className={`height-${props.value}`}>{props.children}</div>;

import axios from 'axios';
import uuid from 'uuid';
const Search = Input.Search;
import '../styling.css';
import Informacion from '../alumno/components/InformacionRe.jsx';
// componentsd
export default class Departamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderResidente: null,
            residente: null,
            imagen: null,
            numeroControl: null,
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            renderResidente: null,
            residente: null,
            imagen: null,
            numeroControl: null,

        })
    }
    onSearchResidente = (no_control) => {
        this.setState({
            renderResidente: null,
            residente: null,
            numeroControl: no_control
        })
        axios.get(`/api/informacion/empresa/${no_control}`)
            .then(res => {
                if (res.status === 200 && res.data.bien === 'ok') {
                    this.imagenresidente(res.data.alumno.id_usuario);
                    this.setState({
                        residente: res.data.alumno,
                        renderResidente: < Informacion refrescar={this.onSearchResidenteRefrescar.bind(this)} situacion={res.data.situacion} alumno={res.data.alumno} interno={res.data.interno} externo={res.data.externo} anteproyecto={res.data.anteproyecto} proyecto={res.data.proyecto} empresa={res.data.empresa} seguimientos={res.data.seguimientos} carrera={res.data.carrera} seguimiento_proyectos={res.data.seguimiento_proyectos} />,


                    })
                } else {
                    message.warning('Verificar el numero de control.')
                }
            })
    }
    onSearchResidenteRefrescar = () => {
       const {numeroControl}= this.state;
        axios.get(`/api/informacion/empresa/${numeroControl}`)
            .then(res => {
                if (res.status === 200 && res.data.bien === 'ok') {
                    this.imagenresidente(res.data.alumno.id_usuario);
                    this.setState({
                        residente: res.data.alumno,
                        renderResidente: < Informacion situacion={res.data.situacion} alumno={res.data.alumno} interno={res.data.interno} externo={res.data.externo} anteproyecto={res.data.anteproyecto} proyecto={res.data.proyecto} empresa={res.data.empresa} seguimientos={res.data.seguimientos} carrera={res.data.carrera} seguimiento_proyectos={res.data.seguimiento_proyectos} />,


                    })
                } else {
                    message.warning('Verificar el numero de control.')
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
                    axios.get(`/api/docente/informacion/${id}`).then(res => {

                        this.setState({
                            nombre: res.data.titulo + "" + res.data.nombre + " " + res.data.ap_paterno + " " + res.data.ap_materno,
                        })

                    })

                }
            })

    }
    imagenresidente = (id) => {
        axios.get(`/api/usuario/foto/${id ? id : this.state.id}`)
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        imagen: res.data,

                    })
                }
            })
    }
    render() {
        const { renderResidente, residente, imagen } = this.state;
        var nombre=residente? residente.nombre + " " + residente.ap_paterno + " " + residente.ap_materno:'' ;
        return (
            <div>

                <Row>

                    <Row type="flex" justify="space-between" align="bottom">
                        <Col span={4} className="texto" style={{ width: 300 }}><DemoBox value={300}>
                            NUMERO DE CONTROL:
                            <Search type="number"
                                placeholder="Introduce el numero de control"
                                onSearch={this.onSearchResidente}//manda el valor 
                                style={{ width: 200, fontSize: 20 }}
                            />

                        </DemoBox></Col>
                        <Col span={4} ><DemoBox value={150}>
                            {residente ?
                                <div className="grises" style={{ alignContent: 'center', textAlign: 'center', height: 100, width: 150 }}>
                                    <img alt="logo_tec" src={`data:image/[png|gif|jpg|jpeg]; base64,${imagen}`} style={{ left: 35, height: 150, width: 150 }} />
                                    <div>{nombre}</div>
                                </div>
                                : ''}
                        </DemoBox></Col>

                    </Row>
                    <br />
                    <br />

                    <Col xs={24} lg={24}>
                        {renderResidente}
                    </Col>




                </Row>

            </div>
        )
    }
}