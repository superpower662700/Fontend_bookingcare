import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from 'react-flatpickr';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import { getScheduleByDoctorId } from '../../../services/userService'
class ManagePatient extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrPatient: [],
        }
    }


    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = async (date) => {

        let time = moment(new Date(date[0])).add(-1, 'days').startOf('days').valueOf();
        let currentDate = moment(time).format('YYYY-MM-DD') + "T17:00:00.000Z";

        let res = await getScheduleByDoctorId(this.props.userInfo.id, currentDate)
        if (res && res.errCode === 0) {
            this.setState({
                arrPatient: res.data
            })
        }

    }
    render() {
        let { language, userInfo } = this.props;
        let { arrPatient } = this.state;
        console.log(arrPatient);
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedule-container'>
                <div className='title'>
                    <FormattedMessage id='manage-patient.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form group'>
                            <label><FormattedMessage id='manage-patient.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                    </div>
                    <div className='patient-table'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Thời Gian</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Địa chỉ Email</th>
                                    <th scope="col">Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrPatient.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{language === LANGUAGE.VI ? item.timeTypeBookingData.valueVi : item.timeTypeBookingData.valueEn}</td>
                                                <td>{item.User.firstName}</td>
                                                <td>{language === LANGUAGE.VI ? item.User.genderData.valueVi : item.User.genderData.valueEn}</td>
                                                <td>{item.User.email}</td>
                                                <td>{item.User.phonenumber}</td>
                                            </tr>
                                        </>

                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
