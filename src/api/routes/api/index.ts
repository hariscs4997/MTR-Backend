import * as express from 'express';
import cfg from './cfg';
import analytics from './analytics';
const router = express.Router();
router.use('/cfg', cfg);
router.use('/analytics', analytics);

export default router;
