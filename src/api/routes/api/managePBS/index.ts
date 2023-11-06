import * as express from 'express';
import { ManagePBSController } from '../../../controllers/managePBS';
const router = express.Router();

router.get('/get-pbs-data', ManagePBSController.getAllPBSData);
router.get('/get-pbs-type-data', ManagePBSController.getAllPBSTypeData);
router.post('/add-pbs-data', ManagePBSController.addPBSData);
router.patch('/update-pbs-data', ManagePBSController.updatePBSData)
router.delete('/delete-pbs-data/:id', ManagePBSController.deletePBSData)
export default router;
