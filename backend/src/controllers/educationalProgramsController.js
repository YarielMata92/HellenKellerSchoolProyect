import { pool } from '../db.js';

export const getPrograms = async (req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM educational_programs WHERE visible = true")
        console.log("Programs", result)
        res.json(result.rows)
    }catch(err){
        console.log(err)
    }
}

export const createProgram = async (req, res) => {
    try {
        console.log("BODYYYYYYY", req.body)
        const { name, description} = req.body;
        const result = await pool.query("INSERT INTO educational_programs (name, description) VALUES ($1,$2) RETURNING *", [name, description]);
        console.log(result)
        if (result.rowCount > 0) {
            return res.status(200).json(result.rows[0])
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
}

export const updateProgram = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        const result = await pool.query("UPDATE educational_programs SET name = $1, description = $2 WHERE id = $3 RETURNING *;", [name, description, id]);
        console.log(result)
        if (result.rows[0].id>0) {
            return res.status(200).json(result.rows[0])
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }

}

export const deleteProgram = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("UPDATE educational_programs set visible = false WHERE id = $1 RETURNING *", [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }

        res.json({
            message: "Programa Eliminado",
            data: result.rows
        });
    } catch (err) {
        console.error(err)
    }

}

