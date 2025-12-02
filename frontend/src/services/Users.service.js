import axios from "axios";

export const getUserTeacher = async (req, res)=>{
    try{
        const res = await axios.get("http://localhost:4000/api/users/teachers");
        return res.data;
    }catch(err){
        console.error(err)
    }
}