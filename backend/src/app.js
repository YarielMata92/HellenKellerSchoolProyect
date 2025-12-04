import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import groupsRouter from './routes/groups.js';
import educationalProgramRouter from './routes/educationalProgram.js'
import studentsRouter from './routes/students.js'
import rolesRouter from './routes/roles.js';
import individualPlansRouter from './routes/individualPlan.js';
import {pool} from "./db.js";
import bcrypt from 'bcrypt';

async function initMasterRoleAndUser() {
  try {
    const roleName = "master";
    let newRole;

    // 1. ----------- CREAR ROL SI NO EXISTE -----------
    let role = await pool.query(
      "SELECT id FROM roles WHERE role = $1",
      [roleName]
    );

    let roleId;

    if (role.rows.length === 0) {

      newRole = await pool.query(
        "INSERT INTO roles (role) VALUES ($1) RETURNING *",
        [roleName]
      );

      await pool.query(
        "INSERT INTO roles (role) VALUES ($1) RETURNING *",
        ["admin"]
      );

      await pool.query(
        "INSERT INTO roles (role) VALUES ($1) RETURNING *",
        ["teacher"]
      );

      await pool.query(
        "INSERT INTO roles (role) VALUES ($1) RETURNING *",
        ["therapist"]
      );

      await pool.query(
        "INSERT INTO roles (role) VALUES ($1) RETURNING *",
        ["tutor"]
      );

      roleId = newRole.rows[0].id;
      console.log("✔ Rol MASTER creado");
    } else {
      roleId = role.rows[0].id;
      console.log("✔ Rol MASTER ya existe");
    }

    // 2. ----------- CREAR USUARIO MASTER SI NO EXISTE -----------
    const email = "master@master.com";

    const user = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length > 0) {
      console.log("✔ Usuario master ya existe");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("master", 10);

    // Crear usuario master
    const newUser = await pool.query(
      `INSERT INTO users (email, password, name, lastname, dni, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [
        email,
        hashedPassword,
        "master",
        "master",
        "0000000"
      ]
    );

    //creando relacion

    if(newRole.rows[0].id > 0 & newUser.rows[0].id > 0){
      await pool.query(
        `INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)`,
        [
          newUser.rows[0].id,
          newRole.rows[0].id
        ]
      );
    }

    console.log("✔ Usuario master creado y asignado al rol MASTER");

  } catch (err) {
    console.error("❌ Error inicializando rol/usuario master:", err);
  }
}

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000'
];


const app = express();
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests del backend (sin origin) para pruebas con postman etc
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Origen no permitido por CORS'));
    }
  },
}));
app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/dashboard/groups', groupsRouter );
app.use('/dashboard/programs', educationalProgramRouter );
app.use('/dashboard/students', studentsRouter );
app.use('/dashboard/individualplans', individualPlansRouter );


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

await initMasterRoleAndUser();

