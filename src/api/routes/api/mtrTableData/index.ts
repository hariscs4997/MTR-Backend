import * as express from 'express';
import { MTRTabelDataController } from '../../../controllers/mtrTableData';
const router = express.Router();

router.post('/get-table-data', MTRTabelDataController.getTableData);
router.post('/export-excel', MTRTabelDataController.generateExcel);
router.post('/get-excel-status', MTRTabelDataController.getExcelJobStatus);
router.post('/get-csv-status', MTRTabelDataController.getCsvJobStatus);
router.post('/export-csv', MTRTabelDataController.generateCsv);

export default router;
