import { Router } from 'express';

import {getPrograms, createProgram, updateProgram, deleteProgram} from '../controllers/educationalProgramsController.js'



const router = Router();

router.get('/list', getPrograms)
router.post('/form/save', createProgram)
router.put('/form/update', updateProgram)
router.put('/delete/:id', deleteProgram)



export default router;