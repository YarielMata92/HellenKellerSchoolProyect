import axios from "axios";
const BASE_API_URL = 'http://localhost:4000/dashboard/programs';

export const getPrograms = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/list`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

export const saveProgram = async (program) => {
    console.log("PROGRAM", program)
    try{
        const response = await axios.post(`${BASE_API_URL}/form/save`, program)
        return response
    }catch(err){
        console.log(err)
    }
}

export const updateProgram = async (program) => {
    try{
        const response = await axios.put(`${BASE_API_URL}/form/update`, program)
        return response
    }catch(err){
        console.log(err)
    }
}

export const deleteProgram = async (id) => {
    try{
        const response = axios.put(`${BASE_API_URL}/delete/${id}`)
        return response
    }catch(err){
        console.log(err)
    }
}