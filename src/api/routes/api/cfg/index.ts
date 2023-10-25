import * as express from 'express';
import { CfgController } from '../../../controllers/cfg';
const router = express.Router();

router.get('/sidebar-data', CfgController.getSidebarData);
router.get('/menu-data', CfgController.getClassesData);

export default router;
