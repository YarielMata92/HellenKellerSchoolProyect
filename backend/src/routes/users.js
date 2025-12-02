import { Router } from 'express';
import { getUsers, createUser, login, getUsersTeachers } from '../controllers/usersController.js';

const router = Router();

//rutas
router.post('/login', login)
router.get('/', getUsers);
router.post('/', createUser);
router.get('/teachers', getUsersTeachers);

export default router;
