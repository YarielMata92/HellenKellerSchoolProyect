import { Router } from 'express';

import {getPrograms} from '../controllers/educationalProgramsController.js'



const router = Router();

router.get('/list', getPrograms)



export default router;