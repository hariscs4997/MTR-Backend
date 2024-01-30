import * as express from 'express';
import { ScriptManagementController } from '../../../controllers/scriptManagement';

const router = express.Router();

router.post('/run-scripts', ScriptManagementController.runScripts);
router.get('/get-all-scripts', ScriptManagementController.getAllScripts);
router.post('/create-menu-item', ScriptManagementController.createMenuItem);
router.get('/get-all-menu-items', ScriptManagementController.getAllMenuItems);
router.patch('/update-menu-item', ScriptManagementController.updateMenuItem);
router.delete('/delete-menu-item/:id', ScriptManagementController.deleteMenuItem);
export default router;
