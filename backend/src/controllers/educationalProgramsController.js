import { pool } from '../db.js';

export const getPrograms = async (req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM educational_programs")
        console.log("Programs", result)
        res.json(result.rows)
    }catch(err){
        console.log(err)
    }
}