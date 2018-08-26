import React, { Component } from 'react';
import { Row, Tabs, Timeline, Col, Button } from 'antd';
const TabPane = Tabs.TabPane;

import axios from 'axios';

import moment from 'moment';

export default class Dictamen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodo: props.periodo,
            cancelados: null,
            terminados: null,
            abandonados: null,
            prorroga: null,
            total:null

        }
    }

    componentWillReceiveProps(nextProps) {
        // message.success('Que show como andas compa ')
        this.setState({
            periodo: nextProps.periodo,
        })
       
    
    }
    componentDidMount() {
        this.actualizar();
    }
       actualizar =()=>{
           var prorroga1=0,activo1=0,cancelado1=0,abandonado1=0,total1= 0;
        axios.get('/api/situacion/periodo/'+this.state.periodo.id)
            .then(res => {
                if (res.status === 200) {
                    res.data.map((situacion,key)=>{
                        situacion.estado === 'cancelado'?cancelado1+=1:''
                        situacion.estado === 'prorroga'?prorroga1+=1:''
                        situacion.estado === 'activo'?activo1+=1:''
                        situacion.estado === 'abandonado'?abandonado1+=1:''
                    })
                    total1+=cancelado1+prorroga1+activo1+abandonado1;
                    this.setState({
                        cancelados: cancelado1,
                        terminados:activo1,
                        abandonados: abandonado1,
                        prorroga: prorroga1,
                        total:total1
            
                    })
            } else {
                message.warning('En el ciclo seleccionado ya se iniciaron los folios');
            }
        }).catch((err) => {
            message.error(err);
        })
       }
    render() {
        const { periodo,total,prorroga,terminados,cancelados,abandonados } = this.state;
        const currentDate = moment().format('YYYY-MM-DD');
        console.log('checando valores');
        console.log(periodo)
           

        return (
            <div style={{ width: 700 }}>
                <Row  >
                <Button  icon="file-pdf" style={{ left: 800 }}><a href={`/api/residentes/${periodo.id}/termino/${periodo.id_carrera}`} target="_blank">Genera</a></Button>
                        <br /><br />
                    <Col xs={24} lg={24}>
                        <center> <h3>Numero total de residentes: {total?total:'0'} </h3></center>

                    </Col>
                    <br />
                    <Col xs={24} lg={24}>
                        <center>
                            <Timeline>
                                <Timeline.Item color="green">{<h4>Proyectos concluidos........................................{terminados?terminados:'0'}</h4>}</Timeline.Item>
                                <Timeline.Item >{<h4>Proyectos en prorroga.......................................{prorroga?prorroga:'0'}</h4>}</Timeline.Item>
                                <Timeline.Item color="red">{<h4>Proyectos cancelados........................................{cancelados?cancelados:0}</h4>}</Timeline.Item>
                                <Timeline.Item color="red">{<h4>Proyectos abandonados......................................{abandonados?abandonados:'0'}</h4>}</Timeline.Item>
                            </Timeline>
                        </center>
                    </Col>
                </Row>
            </div>
        )
    }
}