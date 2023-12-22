import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './DetailClinic.scss';
import { FormattedMessage } from 'react-intl';
import HeaderHome from '../../HomePage/HeaderHome';
import { getDataClinicService, getDoctorIdByClinicId } from '../../../services/userService';
import 'react-image-lightbox/style.css';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class DetailClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            detailClinic: [],
            arrDoctorId: [],
        }
    }


    async componentDidMount() {
        let res = await getDataClinicService(this.props.match.params.id)
        if (res && res.errCode === 0) {
            this.setState({
                detailClinic: res.data
            })
            let clinicId = res.data && res.data.id ? res.data.id : null;
            let arrDoctorId = await getDoctorIdByClinicId(clinicId)
            if (arrDoctorId && arrDoctorId.errCode === 0) {
                this.setState({
                    arrDoctorId: arrDoctorId.data
                })

            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        let { arrDoctorId, detailClinic } = this.state;
        return (
            <>
                <div className='detail-clinic-container'>
                    <HeaderHome />
                    <div className='detail-clinic-body'>
                        <div className='detail-clinic-body-content'>
                            <div className='detail-clinic-name'>{detailClinic.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
                        </div>
                        {
                            arrDoctorId && arrDoctorId.length > 0
                            && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item.doctorId}
                                                    isShowInforDoctor={false}
                                                    isShowLinkDetailDoctor={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
