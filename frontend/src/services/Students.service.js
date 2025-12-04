import axios from "axios";
const BASE_API_URL = 'http://localhost:4000/dashboard/students';

export const getStudents = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/list`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

export const saveStudent = async (student) => {
    console.log(student)
    const response = axios.post(`${BASE_API_URL}/form/save`, student)
        .then(res => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateStudent = async (student) => {
    console.log(student)
    const response = axios.put(`${BASE_API_URL}/form/update`, student)
        .then(() => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteStudent = async (id) => {
    const response = axios.put(`${BASE_API_URL}/delete/${id}`)
    .then(()=>{
        return response;
    })
    .catch(err=>{
        console.error(err)
    })
}
