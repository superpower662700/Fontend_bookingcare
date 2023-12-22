//MedicalFacility
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { getDataClinicService } from '../../../services/userService';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],
        }
    }
    async componentDidMount() {
        let res = await getDataClinicService('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
    }
    render() {
        let { arrClinic } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrClinic.length > 0 && arrClinic.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-medical-facility'
                                                    style={{ backgroundImage: `url(${imageBase64})` }} />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
