import React, { Component } from 'react';
import { Row, Tabs, Select, Col, message, Button } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import axios from 'axios';

import moment from 'moment';

export default class Dictamen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodos: null,
            id_periodo: null,
            id_carrera: null,
            id_periodo1: null,
            id_carrera1: null,

        }
    }
    handlePeriodo = (value) => {

        var cadena = value.split('+');
        this.setState({
            id_periodo: cadena[0],
            id_carrera: cadena[1]
        })
        // router.route('/residentes/:id_periodo/periodo/:id_carrera/reporte_por_periodo.docx')

    }
    handlePeriodo1 = (value) => {

        var cadena = value.split('+');
        this.setState({
            id_periodo1: cadena[0],
            id_carrera1: cadena[1]
        })
        // router.route('/residentes/:id_periodo/periodo/:id_carrera/reporte_por_periodo.docx')

    }
    componentDidMount() {

        this.fetchPeriodos();
    }
    fetchPeriodos = () => {

        axios.get(`/api/periodoss`)
            .then(res => {
                if (res.status === 200) {
                    console.log("==>", res.data)
                    this.setState({
                        periodos: res.data,
                    })
                }
            })
    }
    //dddindi
    combox = (periodos) => {
        return (
            <div >
                {

                    <Select key="1" placeholder="Seleccione el periodo"
                        onChange={this.handlePeriodo}
                        style={{ width: 300, left: 10, fontSize: 20 }}>
                        {periodos ? periodos.map((periodo, index) => {

                            return (


                                <Option key={index} value={`${periodo.periodo}+${periodo.ciclo}`} > <a >{periodo.periodo + "/" + periodo.ciclo}</a></Option>


                            )


                        }) : ''}
                    </Select>
                }


            </div>
        )
    }
    render() {
        const { periodos, id_carrera, id_periodo, id_periodo1, id_carrera1 } = this.state;
        const currentDate = moment().format('YYYY-MM-DD');

        return (
            <div>
                <Col xs={24} lg={24}>
                    <Row type="flex">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Reporte por semestre" key="1">

                                {
                                    this.combox(periodos)
                                }
                                <br />
                                {/* <a href={`/api/residentes/${periodo.periodo}/periodo/${periodo.ciclo}`} target="_blank">{periodo.periodo + "/" + periodo.ciclo}</a> */}
                                {
                                    id_periodo !== null && id_carrera !== null ?
                                       <div><Button icon="file-pdf" style={{ backgroundColor: "#108ee8" }} ><a href={`/api/residentes/${id_periodo}/periodo/${id_carrera}`} target="_blank" style={{ color: "#FBFBEF" }} >Ver</a> </Button>....
                                        <Button icon="file-word" style={{ backgroundColor: "#108ee8" }} ><a href={`/api/residentes/${id_periodo}/periodo/${id_carrera}/reporte_por_periodo.docx`} target="_blank" style={{ color: "#FBFBEF" }} >Descargar</a> </Button></div>
                              : ''
                                }
                            </TabPane>
                            <TabPane tab="Reporte por ciclo Escolar" key="2">

                                <div >
                                    {

                                        <Select key="2" placeholder="Seleccione el ciclo"
                                            onChange={this.handlePeriodo1}
                                            style={{ width: 300, left: 10, fontSize: 20 }}>
                                            {periodos ? periodos.map((periodo, index) => {

                                                return (


                                                    <Option key={index} value={`${periodo.periodo}+${periodo.ciclo}`} > <a>Ciclo {periodo.ciclo}</a></Option>


                                                )


                                            }) : ''}
                                        </Select>
                                    }
                                    <br/>
                                    <br/>
                                    <br/>

                                     {
                                    id_periodo1 !== null && id_carrera1 !== null ?
                                       <div><Button icon="file-pdf" style={{ backgroundColor: "#108ee8" }} ><a href={`/api/residentes/ciclo/${id_carrera1}`} target="_blank" style={{ color: "#FBFBEF" }} >Ver</a> </Button>....
                                        <Button icon="file-word" style={{ backgroundColor: "#108ee8" }} ><a href={`/api/residentes/ciclo/${id_carrera1}/reporte_por_ciclo.docx`} target="_blank" style={{ color: "#FBFBEF" }} >Descargar</a> </Button></div>
                              : ''
                                }
                                </div>

                            </TabPane>
                        </Tabs>
                    </Row>
                </Col>
            </div>
        )
    }
}