import { Router } from 'express';
import { getUsers, createUser, login, getUsersTeachers, getUsersTutors, updateUser, deleteUser } from '../controllers/usersController.js';

const router = Router();

//rutas
router.post('/login', login)
router.get('/', getUsers);
router.post('/form/save', createUser);
router.put('/form/update', updateUser);
router.get('/teachers', getUsersTeachers);
router.get('/tutors', getUsersTutors);
router.put('/delete/:id', deleteUser);

export default router;
