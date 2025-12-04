import axios from "axios";
const BASE_API_URL = 'http://localhost:4000/dashboard/individualplans'

export const getIndividualPlan = async ()=>{
     try {
        const res = await axios.get(`${BASE_API_URL}/list`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteIndividualPlan = (id)=>{
    const response = axios.put(`${BASE_API_URL}/delete/${id}`)
    .then(()=>{
        return response;
    })
    .catch(err=>{
        console.error(err)
    })
}

export const createIndividualPlan = (individualPlan)=>{
    const response = axios.post(`${BASE_API_URL}/form/save`, individualPlan)
        .then(res => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateIndividualPlan = (individualPlan) =>{
    const response = axios.put(`${BASE_API_URL}/form/update`, individualPlan)
        .then(() => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const sendReport = (report) =>{
    console.log(report)
    const response = axios.post(`${BASE_API_URL}/form/report`, report)
        .then(() => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

