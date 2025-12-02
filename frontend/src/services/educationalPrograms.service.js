import axios from "axios";

const BASE_API_URL = 'http://localhost:4000/dashboard/programs';


export const getEducationalPrograms = async ()=>{
    const res = await axios.get(`${BASE_API_URL}/list`)
    console.log(res)
    return res.data;
}