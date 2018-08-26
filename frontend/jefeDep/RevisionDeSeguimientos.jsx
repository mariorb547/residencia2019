import React, { Component } from 'react';

import { Select, Row, Col, message, Cascader } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';
// componentsd

import GestionarCarrera from '../departamento/components/SeguimientosDivision.jsx';
import Seguimientos from '../departamento/components/SeguimientosDivision.jsx';
export default class Departamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departamento: null,
            carrera: null,
            docentesAsigandos: null,
            carreras: null,
            options1: [],
            id_termino: null,
        }
    }
    componentWillMount() {

        axios.get('/api/seguimiento/carreras').then(res => {
            if (res.status == 200) {
                const carreras = res.data.map((seguimiento, key) => {

                    return {
                        value: `${seguimiento.periodo.carrera.id}`,
                        label: `${seguimiento.periodo.carrera.nombre}`,
                    }
                })


                const periodo = res.data.map((seguimiento, key) => {

                    return {
                        value: `${seguimiento.periodo.periodo + "," + seguimiento.periodo.ciclo}`,
                        label: `${seguimiento.periodo.periodo + "/" + seguimiento.periodo.ciclo}`,
                        children: this.eliminarObjetosDuplicados(carreras, 'value')

                    }


                })
                this.setState({
                    options1: this.eliminarObjetosDuplicados(periodo, 'value'),
                })
                // //
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            departamento: null,
            carrera: null,
            docentesAsigandos: null
        })
    }
    handleSeguimientos = (id_seguimiento) => {
        // const { carreras } = this.state;
        // const car = carreras.carreras.find((carrera) => `${carrera.id}` === id_carrera);
      
       console.log(id_seguimiento)
        this.setState({
            carrera: null,
            id_termino:id_seguimiento,
        })
        id_seguimiento!=''?
        axios.get(`/api/seguimientos/divi/${id_seguimiento}`)
            .then(res => {
                if (res.status === 200) {

                       
                    this.setState({
                        carrera: <Seguimientos segui={res.data} /> ,
                    })
                } else {
                    message.warning('Verificar lo que has seleccionado')
                }
            })
            :message.error('Debes selecionar un periodo con la carrera deseada')


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
onChangeD(value){
    message.success(value)
}
render(){
    const { departamento, carreras, carrera, options1 } = this.state;
    return (
        <div>
            
            <Row>
                <Col xs={34} lg={16}>
                   <h2>Periodo:</h2>

                    <Cascader style={{ width: 400 ,fontSize:14 }} options={options1} onChange={this.handleSeguimientos} placeholder="Seleccione el periodo" />

                </Col>
            </Row>
            {carrera}
        </div>
    )
}
}