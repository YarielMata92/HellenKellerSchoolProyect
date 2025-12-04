import { getAdminMetrics, getStudentDashboardSummary } from "../controllers/dashboardMetrics.js";
import { Router } from 'express';

const router = Router();

router.get('/admin', getAdminMetrics);
router.get('/tutor/:id', getStudentDashboardSummary);

export default router;