import * as express from 'express';
import { CfgController } from '../../../controllers/cfg';
const router = express.Router();

router.get('/sidebar-data', CfgController.getSidebarData);

export default router;
