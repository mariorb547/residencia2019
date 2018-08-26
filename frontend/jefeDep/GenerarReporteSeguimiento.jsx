import React, { Component } from 'react';
import { TreeSelect, Form, Tooltip, Select, Row, Col, Icon, Input, Upload, message, Button, Modal, Badge, Collapse, Alert,Checkbox } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
import axios from 'axios';
import moment from 'moment';
const plainOptions = ['PDF', 'DOCS', 'XLS'];
const defaultCheckedList = ['PDF'];
const seguimientoOptions = ['1', '2', '3'];
const defaultSeguimiento = ['1'];
var yearIterator = 2016;
export default class GenerarReporteSeguimiento extends Component {

    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false, 
        checkedList1: defaultSeguimiento,
        indeterminate1: true,
        checkAll1: false,
      };

    render() {
        yearIterator = 2016;
        return (

            <div>
                <Form layout="vertical" >
                    <Row>
                        <Col xs={24} lg={8}>
                            <FormItem label="Carrera" hasFeedback>
                                 
                                    <Select placeholder="Seleccione una carrera">
                                   
                                       <Option key="1" value="1">Ingenieria en Sistemas Computacionales</Option>
                                       <Option key="2" value="2">Ingenieria en Informatica</Option>
                                       <Option key="3" value="3">Ingenieria Civil</Option>
                                    </Select>
                                 
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={18} lg={8}>
                            <FormItem label="Periodo de residencia" hasFeedback>
                            
                                    <Select placeholder="Seleccione un periodo">
                                        <Option value="FEBRERO-JUNIO">FEBRERO-JUNIO</Option>
                                        <Option value="AGOSTO-DICIEMBRE">AGOSTO-DICIEMBRE</Option>
                                    </Select>
                               
                            </FormItem>
                        </Col>
                        <Col xs={6} lg={4}>
                            <FormItem label="Ciclo" hasFeedback>
                               
                                    <Select placeholder="Seleccione un ciclo">
                                        {Array(50).fill(1).map((e, i) => {
                                            yearIterator++;
                                            return <Option key={i} value={`${yearIterator}`}>{yearIterator}</Option>
                                        })}
                                    </Select>
                                
                            </FormItem>
                            <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll1}
          >
            Todos los seguimientos
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={seguimientoOptions} value={this.state.checkedList1} onChange={this.onChange1} />
      </div></Col>





                    </Row>
                    <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Todos los formatos
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </div>
                    <Button icon="save" type="primary" htmlType="submit" style={{marginTop: 20, marginBottom: 20}}>
                        Generar Reporte
                    </Button>
                </Form>
            </div>
        )
    }
    onChange = (checkedList) => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
          checkAll: checkedList.length === plainOptions.length,
        });
      }
      onCheckAllChange = (e) => {
        this.setState({
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
    }
        onChange1 = (checkedList) => {
            this.setState({
              checkedList,
              indeterminate1: !!checkedList.length && (checkedList.length < seguimientoOptions.length),
              checkAll1: checkedList.length === seguimientoOptions.length,
            });
          }
          onCheckAllChange1 = (e) => {
            this.setState({
              checkedList1: e.target.checked? seguimientoOptions : [],
              indeterminate: false,
              checkAll1: e.target.checked,
            });
      }
}