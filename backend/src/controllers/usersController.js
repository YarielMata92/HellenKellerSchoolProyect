import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const login= async (req, res)=>{
  try{
    const {email, password} = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])

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
    const result = await pool.query('SELECT id, name FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING id, name', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
