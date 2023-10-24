import * as express from 'express';
import { DatesController } from '../../../controllers/dates';
const router = express.Router();

router.get('/latest-dates', DatesController.getLatestUpdatedDates);

export default router;
