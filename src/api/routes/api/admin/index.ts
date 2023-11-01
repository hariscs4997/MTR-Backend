import * as express from 'express';
import { ManageClassificationController } from '../../../controllers/admin/manageClassification';
const router = express.Router();

router.get('/get-classification-data', ManageClassificationController.getAllClassificationData);
router.post('/add-classification-data', ManageClassificationController.addClassificationData);

export default router;
