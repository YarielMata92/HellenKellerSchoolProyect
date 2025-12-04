import { pool } from '../db.js';

export const getIndividualPlans = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ip.id AS id,
        st.id AS student_id,
        st.name AS student_name,
        st.lastname AS student_lastname,

        us.id AS teacher_id,
        us.name AS teacher_name,
        us.lastname AS teacher_lastname,

        ip.goal AS goal,

        -- Si no hay reportes, usar ip.progress
        COALESCE(pr.progress, ip.progress) AS progress,

        pr.id AS report_id

      FROM individualized_plans ip
      JOIN students st ON ip.student_id = st.id AND st.visible = true
      JOIN users us ON ip.teacher_id = us.id AND us.visible = true
      
      -- Obtener el último reporte, si existe
      LEFT JOIN LATERAL (
        SELECT pr.*
        FROM progress_reports pr
        WHERE pr.plan_id = ip.id 
          AND pr.visible = true
        ORDER BY pr.id DESC
        LIMIT 1
      ) pr ON TRUE

      WHERE ip.visible = true;
    `);

    return res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error obteniendo los planes.' });
  }
};

export const createIndividualPlans = async (req, res)=>{
     try {
        const { student_id, teacher_id, goal, progress} = req.body;
        const result = await pool.query("INSERT INTO individualized_plans (student_id, teacher_id, goal, progress) VALUES ($1,$2,$3,$4) RETURNING *", [student_id, teacher_id, goal, progress]);

        if (result.rowCount>0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
} 

export const updateIndividualPlans = async (req, res)=>{
    try {
        const { id, student_id, teacher_id, goal, progress } = req.body;
        const result = await pool.query("UPDATE individualized_plans SET student_id = $1, teacher_id = $2, goal = $3, progress = $4 WHERE id = $5 RETURNING *;", [student_id, teacher_id, goal, progress, id]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
} 

export const deleteIndividualPlans = async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("UPDATE individualized_plans set visible = false WHERE id = $1 RETURNING *", [id])

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

export const createReport = async (req, res)=>{
     try {
        console.log(req.body)
        const { individual_Plan_id, teacher_id, progress, observations} = req.body;
        const result = await pool.query("INSERT INTO progress_reports (plan_id, teacher_id, progress, observations) VALUES ($1,$2,$3,$4) RETURNING *", [individual_Plan_id, teacher_id, progress, observations]);

        if (result.id > 0) {
            return res.status(200).json({ result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "error interno" })
    }
} 