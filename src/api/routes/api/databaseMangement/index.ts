import * as express from 'express';
import { DatabaseManagementController } from '../../../controllers/databaseManagement';
const router = express.Router();

router.get('/get-all-db-tables', DatabaseManagementController.getAllDBTables);
router.post("/get-table-records", DatabaseManagementController.getTableRecords)
router.post("/delete-table-record", DatabaseManagementController.deleteTableRecord)
router.post("/update-table-record", DatabaseManagementController.updateTableRecord)
export default router;
