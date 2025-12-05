import { pool } from '../db.js';

export const createStudent = async (req, res) => {
    try {
        const { dni, name, lastname, second_lastname, birthdate, disability, tutor_id, group_id } = req.body;
        const result = await pool.query("INSERT INTO students (dni, name, lastname, second_lastname, birthdate, disability, tutor_id, group_id) VALUES ($1,$2,$3,$4,$5, $6, $7, $8) RETURNING *", [dni, name, lastname, second_lastname, birthdate, disability, tutor_id, group_id]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
}

export const getStudents = async (req, res) => {
    try {
        const result = await pool.query("SELECT s.id, s.dni, s.name, s.lastname, s.second_lastname, s.birthdate, s.disability, us.name as tutor, us.id as tutor_id, g.name as group, g.id as group_id FROM students s JOIN users us ON s.tutor_id = us.id JOIN groups g ON s.group_id = g.id WHERE s.visible = true")
        console.log(result.rows)
        return res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.log(err)
    }
}

export const getStudentsByTeacherId = async (req, res) => {
    try {

        const id = parseInt(req.params.id);

        const query = `
            SELECT 
            s.id, s.dni, s.name, s.lastname, s.second_lastname, 
            s.birthdate, s.disability,
            us.name AS tutor, us.id AS tutor_id,
            g.name AS group, g.id AS group_id
            FROM students s
            JOIN users us ON s.tutor_id = us.id
            JOIN groups g ON s.group_id = g.id
            WHERE s.visible = true
            AND g.teacher_id = $1
        `;

        const result = await pool.query(query,[id])
        console.log(result.rows)
        return res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.log(err)
    }
}

export const updateStudent = async (req, res) => {
    try {
        const { dni, name, lastname, second_lastname, birthdate, disability, tutor_id, group_id, id } = req.body;

        const result = await pool.query("UPDATE students SET dni = $1, name = $2, lastname = $3, second_lastname = $4, birthdate = $5, disability = $6, tutor_id = $7, group_id = $8 WHERE id = $9 RETURNING *;", [dni, name, lastname, second_lastname, birthdate, disability, tutor_id, group_id, id]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }

}

//eliminado logico
export const deleteStudent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("UPDATE students set visible = false WHERE id = $1 RETURNING *", [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({
            message: "Estudiante Eliminado",
            data: result.rows
        });
    } catch (err) {
        console.error(err)
    }
}