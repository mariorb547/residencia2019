import React, { Component } from 'react';
import { TreeSelect, Form, Tooltip, Select, Row, Col, Icon, Input, Upload, message, Button, Modal, Badge, Collapse, Alert } from 'antd';
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;


import axios from 'axios';
import moment from 'moment';


export default class GestionDeFormatos extends Component {



    render() {
        return (
            <Row gutter={100}>
            <center>
                <Col xs={300} lg={6}>
                    <div >
              
                    <Button icon="cloud-download-o" type="primary" htmlType="submit" style={{marginTop: 20, marginBottom: 20, width: 200, height: 100 }}>
                    Formato 1
                    </Button>
                    </div>
                </Col>
                <Col xs={200} lg={5}>
                    <div  >
                     
                    <Button icon="cloud-download-o"  type="primary" htmlType="submit" style={{marginTop: 20, marginBottom: 20, width: 200, height: 100 }}>
                        Formato 2
                    </Button>
                    </div>
                </Col>
                <Col xs={200} lg={5}>
                    <div >
                    <Button icon="cloud-download-o" type="primary" htmlType="submit"style={{marginTop: 20, marginBottom: 20, width: 200, height: 100 }}>
                    Formato 3
                    </Button>

                    </div>
                </Col>
                <Col xs={200} lg={5}>
                    <div  >
                    <Button icon="cloud-download-o" type="primary" htmlType="submit" style={{marginTop: 20, marginBottom: 20, width: 200, height: 100 }}>
                    Formato 4
                    </Button>
                    </div>
                </Col>
                </center>
            </Row>

            // <Form
            //     layout="vertical"
            // >  
            // <FormItem
            //  label="Seleccione el formato 1"
            // >
            //   <div className="dropbox">

            //                 <Upload.Dragger 
            //                     name="fileAnteproyecto" 
            //                    // action={`/api/alumno/file_anteproyecto/${anteproyecto.id}`}
            //                    // beforeUpload={beforeUpload}
            //                 >
            //                 <p className="ant-upload-drag-icon">
            //                 <Icon type="inbox" />
            //                 </p>
            //                 <p className="ant-upload-text">Da click para seleccionar o arrastra tu archivo .pdf</p>
            //                 <p className="ant-upload-hint">Tu archivo debe pesar menos de 10 MB.</p>
            //             </Upload.Dragger>

            //         </div>
            // </FormItem>
            // <FormItem
            //  label="Seleccione el formato 2"
            // >
            //   <div className="dropbox">

            //                 <Upload.Dragger 
            //                     name="fileAnteproyecto" 
            //                    // action={`/api/alumno/file_anteproyecto/${anteproyecto.id}`}
            //                    // beforeUpload={beforeUpload}
            //                 >
            //                 <p className="ant-upload-drag-icon">
            //                 <Icon type="inbox" />
            //                 </p>
            //                 <p className="ant-upload-text">Da click para seleccionar o arrastra tu archivo .pdf</p>
            //                 <p className="ant-upload-hint">Tu archivo debe pesar menos de 10 MB.</p>
            //             </Upload.Dragger>

            //         </div>
            // </FormItem>
            // <FormItem
            //  label="Seleccione el formato 3"
            // >
            //   <div className="dropbox">

            //                 <Upload.Dragger 
            //                     name="fileAnteproyecto" 
            //                    // action={`/api/alumno/file_anteproyecto/${anteproyecto.id}`}
            //                    // beforeUpload={beforeUpload}
            //                 >
            //                 <p className="ant-upload-drag-icon">
            //                 <Icon type="inbox" />
            //                 </p>
            //                 <p className="ant-upload-text">Da click para seleccionar o arrastra tu archivo .pdf</p>
            //                 <p className="ant-upload-hint">Tu archivo debe pesar menos de 10 MB.</p>
            //             </Upload.Dragger>

            //         </div>
            // </FormItem>
            //  </Form>
        )
    }
}