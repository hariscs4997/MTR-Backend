import * as express from 'express';
import { AnalyticsController } from '../../../controllers/analytics';

const router = express.Router();

router.get('/statistics-overall-data', AnalyticsController.getStatisticsOverallData);

export default router;
