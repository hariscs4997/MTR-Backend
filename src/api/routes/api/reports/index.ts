import * as express from 'express';
import { ReportsController } from '../../../controllers/reports';
const router = express.Router();

router.get('/get-reports-data', ReportsController.getHandOverReportData);
router.post('/get-report-link', ReportsController.getReportLink);
router.post('/get-report-summary', ReportsController.getReportSummary);

export default router;
