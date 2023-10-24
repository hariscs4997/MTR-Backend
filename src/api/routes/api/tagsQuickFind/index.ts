import * as express from 'express';
import { TagsQuickFindController } from '../../../controllers/tagsQuickFind';
const router = express.Router();

router.post('/get-main-unit-data', TagsQuickFindController.getTagsQuickFindMainUnitData);
router.post('/get-process-unit-data', TagsQuickFindController.getTagsQuickFindProcessUnitData);

export default router;
