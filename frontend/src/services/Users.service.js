import axios from "axios";

export const getUserTeacher = async ()=>{
    try{
        const res = await axios.get("http://localhost:4000/api/users/teachers");
        return res.data;
    }catch(err){
        console.error(err)
    }
}

export const getUserTutor = async ()=>{
    try{
        const res = await axios.get("http://localhost:4000/api/users/tutors");
        return res.data;
    }catch(err){
        console.error(err)
    }
}

export const getAllUsers = async () =>{
    try{
        const res = await axios.get("http://localhost:4000/api/users/");
        return res.data;
    }catch(err){
        console.error(err)
    }
}

export const saveUser = async (user) =>{
    try {
        const res = await axios.post("http://localhost:4000/api/users/form/save", user)
        return res;
    } catch (error) {
        
    }
}

export const updateUser = async (user) =>{
    try {
        const res = await axios.put("http://localhost:4000/api/users/form/update", user)
        return res;
    } catch (error) {
        
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await axios.put(`http://localhost:4000/api/users/delete/${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}