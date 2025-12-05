import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const login= async (req, res)=>{
  try{
    const {email, password} = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1 OR dni = $2  LIMIT 1', [email, email])

    if(result.rowCount == 0){
      console.log("usuario no encontrado")
      return res.status(400).json({error: "usuario no encontrado"})
    }

    const user = result.rows[0]
    console.log(user)

    const correctPassword = await bcrypt.compare(password, user.password)
    if(correctPassword){

      const userRole = await pool.query('SELECT  r.role FROM user_roles ur JOIN roles r ON  ur.role_id = r.id WHERE ur.user_id = $1' , [user.id])

      const {role} = userRole.rows[0]
      console.log(role)

      return res.json({
        success: true,
        user:{
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          dni: user.dni,
          email: user.email,
          role
        }
      })
    }
  }catch(error){
    console.error(error);
    res.status(500).json({error:"error interno"})
  }
}

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT u.id as id, u.name as name, u.lastname as lastname, u.dni as dni, u.email as email, r.role as role , r.id as role_id FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.visible = true');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

export const createUser = async (req, res) => {
  let userResult = [];
  let roleResult = [];
  console.log(req.body)

  
  try {
    const { dni, name, lastname, email, role_id  } = req.body;

    const password = await bcrypt.hash(lastname,10)
    const userResult = await pool.query('INSERT INTO users(dni, name, lastname, email, password) VALUES($1,$2,$3,$4,$5) RETURNING *', [dni, name, lastname, email, password]);
    if(userResult.rowCount>0){
          const userId = userResult.rows[0].id;
          roleResult = await pool.query('INSERT INTO user_roles(user_id, role_id) VALUES($1,$2) RETURNING *', [userId, role_id]);
    }
    if(userResult.rowCount>0 && roleResult.rowCount>0){
      res.status(201).json(userResult.rows[0]);
    }

    console.log(userResult)
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
  
};

export const updateUser = async (req, res)=>{
  let userResult;
  let roleResult;

  try {
    const { id, dni, name, lastname, email, role_id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "El ID es requerido para actualizar." });
    }

    userResult = await pool.query(
      `UPDATE users 
       SET dni = $1, name = $2, lastname = $3, email = $4 
       WHERE id = $5 
       RETURNING *`,
      [dni, name, lastname, email, id]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    roleResult = await pool.query(
      `UPDATE user_roles 
       SET role_id = $1 
       WHERE user_id = $2 
       RETURNING *`,
      [role_id, id]
    );

    if (roleResult.rowCount === 0) {
      roleResult = await pool.query(
        `INSERT INTO user_roles(user_id, role_id)
         VALUES($1, $2)
         RETURNING *`,
        [id, role_id]
      );
    }

    return res.status(200).json(userResult.rows[0]);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

export const deleteUser = async(req, res)=>{
  try {
        const id = parseInt(req.params.id);
        const result = await pool.query("UPDATE users set visible = false WHERE id = $1 RETURNING *", [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({
            message: "Usuario Eliminado",
            data: result.rows
        });
    } catch (err) {
        console.error(err)
    }
  
}

export const getUsersTeachers = async (req, res) => {
  try{
    const result = await pool.query("SELECT u.id, u.name, u.lastname from users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE r.role = 'teacher' OR r.role = 'TEACHER'")
    res.json(result.rows);
  }catch(err){
    console.log(err)
  }
  
}

export const getUsersTutors = async (req, res) => {
  try{
    const result = await pool.query("SELECT u.id, u.name, u.lastname from users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE r.role = 'tutor' OR r.role = 'TUTOR'")
    res.json(result.rows);
  }catch(err){
    console.log(err)
  }
  
}
