import { Router } from 'express';
import { getIndividualPlans, createIndividualPlans, updateIndividualPlans, deleteIndividualPlans, createReport, getTeacherIndividualPlans } from '../controllers/individualPlansController.js';

const router = Router();

//rutas
router.get('/list', getIndividualPlans)
router.get('/list/:id', getTeacherIndividualPlans)
router.post('/form/save', createIndividualPlans)
router.put('/form/update', updateIndividualPlans)
router.put('/delete/:id', deleteIndividualPlans)
router.post('/form/report', createReport)

export default router;