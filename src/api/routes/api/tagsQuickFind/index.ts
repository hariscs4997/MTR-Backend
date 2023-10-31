import * as express from 'express';
import { TagsQuickFindController } from '../../../controllers/tagsQuickFind';
const router = express.Router();

router.get('/get-tag-class-data', TagsQuickFindController.getTagsQuickTagClassData);
router.post('/get-tag-sub-class-data', TagsQuickFindController.getTagsQuickTagSubClassData);
router.post('/get-tag-type-data', TagsQuickFindController.getTagsQuickTagTypeData);
router.get('/get-main-unit-data', TagsQuickFindController.getTagsQuickFindMainUnitData);
router.post('/get-process-unit-data', TagsQuickFindController.getTagsQuickFindProcessUnitData);
router.post('/get-data', TagsQuickFindController.getTagsQuickFindTableData);
router.post('/get-tag-class-data', TagsQuickFindController.getTagsQuickTagClassData);
export default router;
