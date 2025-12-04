import { Router } from 'express';
import { createGroup, deleteGroup, getGroups, updateGroup, getTeacherGroups } from '../controllers/groupController.js';

const router = Router();

//rutas
router.get('/list', getGroups)
router.get('/list/:id', getTeacherGroups)
router.post('/form/save', createGroup)
router.put('/form/update', updateGroup)
router.put('/delete/:id', deleteGroup)

export default router;