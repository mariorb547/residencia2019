import React, { Component } from 'react';
import { TreeSelect, Form, Tooltip, Select, Row, Col, Icon, Input, Upload, message, Button, Modal, Badge, Collapse, Alert, Checkbox } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
import axios from 'axios';
import moment from 'moment';
const plainOptions = ['PDF', 'DOCS'];
const defaultCheckedList = ['PDF'];
const ButtonGroup = Button.Group;
var yearIterator = 2016;
export default class GenerarReporteIndiviual extends Component {

    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
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
                        <Col xs={18} lg={6}>
                            <FormItem label="Numero de Control" hasFeedback>

                                <Input placeholder="Ingrese el numero de control" type="text" style={{ width: 200 }} />

                            </FormItem>
                        </Col>
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
                    </Row>

                    <ButtonGroup> <Button icon="save" type="primary" htmlType="submit" style={{ marginTop: 20, marginBottom: 20 }}>
                        Generar Reporte
                    </Button>  <Button type="primary" icon="eye-o"> <a style={{ color: 'white' }} target="_blank" >Ver</a></Button>
                    </ButtonGroup>
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
}