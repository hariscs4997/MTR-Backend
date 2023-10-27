import * as express from 'express';
import { MTRTabelDataController } from '../../../controllers/mtrTableData';
const router = express.Router();

router.post('/get-table-data', MTRTabelDataController.getTableData);
router.post('/export-excel', MTRTabelDataController.generateExcel);

export default router;
