import axios from "axios";

export const getAllRoles = async (req, res) =>{
    try{
        const res = await axios.get("http://localhost:4000/api/roles/");
        return res;
    }catch(err){
        console.error(err)
    }
}