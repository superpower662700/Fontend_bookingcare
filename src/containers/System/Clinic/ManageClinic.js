
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import { LANGUAGE, CommonUtils } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import { postCreateClinic } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            image: '',
        }
    }


    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleOnChangInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    async handleOnChangeImage(event) {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                image: base64
            })
        }

    }
    handleSaveClinic = async () => {
        console.log(this.state);
        let res = await postCreateClinic({
            name: this.state.name,
            address: this.state.address,
            descriptionMarkdown: this.state.descriptionMarkdown,
            descriptionHTML: this.state.descriptionHTML,
            image: this.state.image
        })
        if (res && res.errCode === 0) {
            toast.success("Create a new clinic success")
            this.setState({
                name: '',
                descriptionHTML: '',
                address: '',
                descriptionMarkdown: '',
                image: '',
            })
        }
        else {
            toast.error("Create a new clinic fail")
        }
    }

    render() {
        return (
            <>
                <div className='manage-clinic-container'>
                    <div className='ms-title'>Quản lý Phòng Khám</div>
                    <div className='add-new-clinic row'>
                        <div className='col-4 form-group'>
                            <label>Tên Phòng Khám</label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnChangInput(event, 'name')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ Phòng Khám</label>
                            <input className='form-control' type='text' value={this.state.address}
                                onChange={(event) => this.handleOnChangInput(event, 'address')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ảnh Phòng Khám</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>

                        <div className='col-12 form-group'>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown} />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-clinic' onClick={() => this.handleSaveClinic()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
