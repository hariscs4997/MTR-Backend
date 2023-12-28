import * as express from 'express';
import { GPTController } from '../../../controllers/gpt';
const router = express.Router();

router.post('/upload-file', GPTController.uploadGPTFile);

export default router;
