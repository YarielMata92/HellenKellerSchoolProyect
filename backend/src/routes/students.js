import { Router } from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent, getStudentsByTeacherId } from '../controllers/studentsController.js';

const router = Router();

//rutas
router.get('/list', getStudents)
router.get('/list/:id', getStudentsByTeacherId)
router.post('/form/save', createStudent)
router.put('/form/update', updateStudent)
router.put('/delete/:id', deleteStudent)

export default router;