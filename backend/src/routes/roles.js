import { Router } from 'express';
import { getRoles } from '../controllers/rolesController.js';

const router = Router();

//rutas
router.get('/', getRoles);

export default router;