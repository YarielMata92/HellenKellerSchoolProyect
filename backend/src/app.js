import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import groupsRouter from './routes/groups.js';
import educationalProgramRouter from './routes/educationalProgram.js'
import studentsRouter from './routes/students.js'
import rolesRouter from './routes/roles.js';

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


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


