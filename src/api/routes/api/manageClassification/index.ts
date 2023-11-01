import * as express from 'express';
import { ManageClassificationController } from '../../../controllers/manageClassification';
const router = express.Router();

router.get('/get-classification-data', ManageClassificationController.getAllClassificationData);
router.post('/add-classification-data', ManageClassificationController.addClassificationData);
router.patch('/update-classification-data', ManageClassificationController.updateClassificationData)
router.delete('/delete-classification-data', ManageClassificationController.deleteClassificationData)
export default router;
