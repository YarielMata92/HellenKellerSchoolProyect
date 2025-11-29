import { Router } from 'express';
import { getUsers, createUser, login } from '../controllers/usersController.js';

const router = Router();

//rutas
router.post('/login', login)
router.get('/', getUsers);
router.post('/', createUser);

export default router;
