import * as express from 'express';
import { TagsByClassController } from '../../../controllers/tagsByClass';
const router = express.Router();

router.post('/get-class-data', TagsByClassController.getTagClassData);
router.post('/get-subclass-data', TagsByClassController.getTagSubClassData);
router.post('/get-last-class-data', TagsByClassController.getTagLastClassData);

export default router;
