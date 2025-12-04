import axios from "axios";
const BASE_API_URL = 'http://localhost:4000/dashboard/groups';

export const getGroups = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/list`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

export const saveGroup = async (group) => {
    console.log(group)
    const response = axios.post(`${BASE_API_URL}/form/save`, group)
        .then(res => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateGroup = async (group) => {
    console.log(group)
    const response = axios.put(`${BASE_API_URL}/form/update`, group)
        .then(() => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteGroup = async (id) => {
    const response = axios.put(`${BASE_API_URL}/delete/${id}`)
    .then(()=>{
        return response;
    })
    .catch(err=>{
        console.error(err)
    })
}