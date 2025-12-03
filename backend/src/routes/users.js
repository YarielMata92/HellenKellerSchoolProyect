import { Router } from 'express';
import { getUsers, createUser, login, getUsersTeachers, getUsersTutors } from '../controllers/usersController.js';

const router = Router();

//rutas
router.post('/login', login)
router.get('/', getUsers);
router.post('/form/save', createUser);
router.get('/teachers', getUsersTeachers);
router.get('/tutors', getUsersTutors);

export default router;
