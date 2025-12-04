
import { pool } from '../db.js';
export const getAdminMetrics = async (req, res)=>{
    try {
    const [
  programs,
  groups,
  students,
  teachers,
  groupsPerProgram,
  studentsPerGroup,
  progressPerProgram
] = await Promise.all([

  // Educational programs count
  pool.query(`
    SELECT COUNT(*) 
    FROM educational_programs 
    WHERE visible = true
  `),

  // Groups count
  pool.query(`
    SELECT COUNT(*) 
    FROM groups 
    WHERE visible = true
  `),

  // Students count
  pool.query(`
    SELECT COUNT(*) 
    FROM students 
    WHERE visible = true
  `),

  // Teachers (role_id = 2)
  pool.query(`
    SELECT COUNT(*) 
    FROM users u
    JOIN user_roles ur ON u.id = ur.user_id
    WHERE ur.role_id = 2 AND u.visible = true
  `),

  // Groups per program
  pool.query(`
    SELECT ep.name AS program, COUNT(g.id) AS groups
    FROM educational_programs ep
    LEFT JOIN groups g 
      ON ep.id = g.educational_program_id 
      AND g.visible = true
    WHERE ep.visible = true
    GROUP BY ep.name
    ORDER BY ep.name
  `),

  // Students per group
  pool.query(`
    SELECT g.name AS group_name, COUNT(s.id) AS students
    FROM groups g
    LEFT JOIN students s 
      ON g.id = s.group_id 
      AND s.visible = true
    WHERE g.visible = true
    GROUP BY g.name
    ORDER BY g.name
  `),

  // Average progress per program
  pool.query(`
    SELECT ep.name AS program_name, AVG(ip.progress) AS avg_progress
    FROM educational_programs ep
    JOIN groups g 
      ON ep.id = g.educational_program_id 
      AND g.visible = true
    JOIN students st 
      ON g.id = st.group_id 
      AND st.visible = true
    JOIN individualized_plans ip 
      ON st.id = ip.student_id 
      AND ip.visible = true
    WHERE ep.visible = true
    GROUP BY ep.name
    ORDER BY ep.name
  `),

]);

res.json({
  totals: {
    programs: programs.rows[0].count,
    groups: groups.rows[0].count,
    students: students.rows[0].count,
    teachers: teachers.rows[0].count
  },
  groupsPerProgram: groupsPerProgram.rows,
  studentsPerGroup: studentsPerGroup.rows,
  progressPerProgram: progressPerProgram.rows
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo métricas" });
  }
}

export const getStudentDashboardSummary = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Obtener todos los estudiantes asociados al usuario
    const students = await pool.query(`
      SELECT st.id, st.name, st.lastname, st.birthdate, st.group_id, g.name AS group_name
      FROM students st
      LEFT JOIN groups g ON st.group_id = g.id AND g.visible = true
      WHERE st.tutor_id = $1 AND st.visible = true
    `, [userId]);

    const studentList = students.rows;

    if (studentList.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Para cada estudiante buscamos info adicional
    const result = [];

    for (const st of studentList) {
      const peiCount = await pool.query(`
        SELECT COUNT(*) FROM individualized_plans 
        WHERE student_id = $1 AND visible = true
      `, [st.id]);

      const lastReport = await pool.query(`
        SELECT pr.*
        FROM progress_reports pr
        WHERE pr.plan_id IN (SELECT id FROM individualized_plans WHERE student_id = $1)
        AND pr.visible = true
        ORDER BY pr.created_at DESC
        LIMIT 1
      `, [st.id]);

      const therapies = await pool.query(`
        SELECT ip.id, ip.goal, COALESCE(pr.progress, ip.progress) AS progress,
               pr.created_at AS last_update
        FROM individualized_plans ip
        LEFT JOIN LATERAL (
          SELECT pr.* FROM progress_reports pr
          WHERE pr.plan_id = ip.id AND pr.visible = true
          ORDER BY pr.id DESC LIMIT 1
        ) pr ON TRUE
        WHERE ip.student_id = $1 AND ip.visible = true
      `, [st.id]);

      const generalProgress = therapies.rows.length > 0
        ? Math.round(
            therapies.rows.reduce((acc, t) => acc + (t.progress || 0), 0) / therapies.rows.length
          )
        : 0;

      result.push({
        student: st,
        peiCount: peiCount.rows[0].count,
        therapies: therapies.rows,
        lastReport: lastReport.rows[0] || null,
        generalProgress
      });
    }

    return res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo la información" });
  }
};