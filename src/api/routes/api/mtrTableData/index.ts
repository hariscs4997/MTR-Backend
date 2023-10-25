import * as express from 'express';
import { MTRTabelDataController } from '../../../controllers/mtrTableData';
const router = express.Router();

router.post('/get-table-data', MTRTabelDataController.getTableData);

export default router;
