import { pool } from '../db.js';

export const createGroup = async (req, res) => {
    try {
        const { name, description, educationalProgram, teacher } = req.body;
        const result = await pool.query("INSERT INTO groups (name, description, educational_program_id, teacher_id) VALUES ($1,$2,$3,$4) RETURNING *", [name, description, educationalProgram, teacher]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
}

export const getGroups = async (req, res) => {
    console.log("GetGroups")
    try {
        const result = await pool.query("SELECT g.id as id, g.name as name, g.description as description, ep.name as program_name, ep.id as program_id, u.name as teacher_name, u.lastname as teacher_lastname, u.id as teacher_id FROM groups g JOIN educational_programs ep ON g.educational_program_id = ep.id JOIN users u ON g.teacher_id = u.id WHERE g.visible = true;")
        console.log(result.rows)
        return res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.log(err)
    }
}

export const updateGroup = async (req, res) => {
    try {
        const { id, name, description, educationalProgram, teacher } = req.body;
        console.log("Teacher id", teacher)
        const result = await pool.query("UPDATE groups SET name = $1, description = $2, educational_program_id = $3, teacher_id = $4 WHERE id = $5 RETURNING *;", [name, description, educationalProgram, teacher, id]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }

}

//eliminado logico
export const deleteGroup = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("UPDATE groups set visible = false WHERE id = $1 RETURNING *", [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }

        res.json({
            message: "Grupo Eliminado",
            data: result.rows
        });
    } catch (err) {
        console.error(err)
    }
}