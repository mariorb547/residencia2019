import React, { Component } from 'react';

import { Select, Row, Col, message, Input, Upload, Icon } from 'antd';
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';
const Search = Input.Search;
import { getIsAuth } from '../api.jsx';
// componentsd
export default class Departamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario:null,
            loading: false,
            
        }
    }
    componentWillReceiveProps(nextProps) {
     
        this.setState({
            loading: false,
            id_usuario: null,

        })
    }
    componentWillMount() {
        this.getIsAuth()
    }
    getIsAuth() {
        getIsAuth().then((usuario) => {
            // if (usuario.rol === 'jefe_departamento') {
                console.log(usuario)
                this.setState({
                    
                    id_usuario: usuario.id,

                })
                
            // }
            
        })
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        // const isJPG = file.type === 'image/jpg';
        //  const isJPG = file.type === 'image/jpeg';
        console.log(file)
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    //no se que paso ? 
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            this.props.ok();
        }
    }
    render() {
        const { id_usuario,onloadFoto } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Cargar foto</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>

                <Row>
                    <Col xs={34} lg={16}>
                    <center>
                        <br/>
                        <br/>
                        <br/>

                        <Upload
                            name="filenamefoto"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}//
                            action={`/api/alumno/file_foto/${id_usuario}`}
                            beforeUpload={this.beforeUpload}
                           onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="" style={{ left:150,height:250, width:300}}/> : uploadButton}
                        </Upload>
                        </center>
                       
                    </Col>
                </Row>

            </div>
        )
    }
}