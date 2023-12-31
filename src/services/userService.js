import axios from "../axios";

const handleLoginApi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword });
}

const handleUserApi = (userid) => {
    return axios.get(`/api/get-all-user?id=${userid}`);
}
const handleAddUserApi = (data) => {
    return axios.post('/api/create-user', data);
}
const handleDeleteUserApi = (userid) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userid
        }
    });
}
const handleEditUserApi = (user) => {
    return axios.put('/api/put-user', {
        data: {
            user: user
        }
    });
}
///api/getAllCode
const getAllCodeService = (typeInput) => {
    return axios.get(`/api/getAllCode?type=${typeInput}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?type=${limit}`);
}

const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctor');
}
const saveInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}
const getDetailDoctorByIdService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}
const getDoctorSchedule = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}
const getDoctorInfor = (doctorId) => {
    return axios.get(`/api/get-doctor-infor-by-id?doctorId=${doctorId}`);
}
const saveBooking = (data) => {
    return axios.post('/api/save-patient-booking', data);
}
const postVerifyBooking = (data) => {
    return axios.post('/api/verify-booking-patient', data);
}
const postCreateSpecialty = (data) => {
    return axios.post('/api/port-create-specialty', data);
}

const getAllSpecialtyService = (id) => {
    return axios.get(`/api/get-all-specialty?id=${id}`);
}
const getDoctorIdBySpecialtyId = (id, location) => {
    return axios.get(`/api/get-doctorId-by-specialtyId?id=${id}&location=${location}`);
}

const postCreateClinic = (data) => {
    return axios.post('/api/port-create-clinic', data);
}
const getDataClinicService = (id) => {
    return axios.get(`/api/get-data-specialty?id=${id}`);
}
const getDoctorIdByClinicId = (id) => {
    return axios.get(`/api/get-doctorId-by-clinicId?id=${id}`);
}

const getScheduleByDoctorId = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-doctorId?doctorId=${doctorId}&date=${date}`);
}

export {
    handleLoginApi, getScheduleByDoctorId,
    handleUserApi,
    handleAddUserApi,
    handleDeleteUserApi,
    handleEditUserApi,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveInforDoctor,
    saveBulkSchedule,
    getDetailDoctorByIdService,
    getDoctorSchedule,
    getDoctorInfor,
    saveBooking,
    postVerifyBooking, postCreateSpecialty, getAllSpecialtyService, getDoctorIdBySpecialtyId,
    postCreateClinic, getDataClinicService, getDoctorIdByClinicId
}