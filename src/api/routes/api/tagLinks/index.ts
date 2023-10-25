import * as express from 'express';
import { TagLinksController } from '../../../controllers/tagLinks';
const router = express.Router();

router.get('/get-links', TagLinksController.getTagLinks);

export default router;
