import React, {Component} from 'react';
import { Row,  Table} from 'antd';


import uuid from 'uuid';
import axios from 'axios';
export default class SubactividadesRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_actividad_general: props.id_actividad_general,
            dataSource1:[],
            columns1:[]          
        }
    }

    componentWillReceiveProps(nextProps){
      this.state = {
        id_actividad_general: nextProps.id_actividad_general,
          
      }
      
  
  }
    componentDidMount(){
      
    axios.get(`/api/plan_de_trabajo/${this.state.id_actividad_general}/get_subactividades`)
      .then(res =>{
          if(res.status === 200){
              const proyectoPlan = res.data.map((proyecto, index) => {

                  return{
                      key: uuid.v1(),
                      id:proyecto.id,
                      actividad: proyecto.actividad,
                    
                  }
              })
              
           
          this.setState({
            dataSource1:proyectoPlan //se asigna las sub actividades encontradas a la variable dataSource
            
        })
      }
      })
                   

    this.setState({ 
      // se asignas las columnas que tendrá la tabla
       columns1:[{
      title: 'Subactividades',
      dataIndex: 'actividad',
      key: 'actividad',
    }, ]
    
   
  })

    
  }


  showTareas=(idsubactividad)=> {
   
  
  } 
 
       
    render(){
      return(<dataSource1/>)
       /* return(
          <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
           
          <Table
             className="full-width"
             dataSource={this.state.dataSource1} 
             columns={this.state.columns1}
             expandedRowRender={ <Table
              className="full-width"
              dataSource={this.state.dataSource1} 
              columns={this.state.columns1}
              expandedRowRender={record => <div >{this.showTareas(record.id)}</div>}
              pagination={{ pageSize: 8 }} 
              scroll={{ x: 2500 }} />}
             pagination={{ pageSize: 8 }} 
             scroll={{ x: 2500 }} />
        
          </Row> 
        
        )*/
    }
}