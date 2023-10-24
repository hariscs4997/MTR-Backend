import * as express from 'express';
import cfg from './cfg';
import analytics from './analytics';
import dates from './dates'
import reports from './reports';
const router = express.Router();
router.use('/cfg', cfg);
router.use('/analytics', analytics);
router.use("/dates", dates)
router.use("/reports", reports)

export default router;
