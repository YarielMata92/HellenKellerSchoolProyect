import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import {pool} from './db.js';
import bcrypt from 'bcrypt'
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


