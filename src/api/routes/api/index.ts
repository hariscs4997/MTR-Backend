import * as express from 'express';
import cfg from './cfg';
import analytics from './analytics';
import dates from './dates'
import reports from './reports';
import tagsByClass from './tagsByClass';
const router = express.Router();
router.use('/cfg', cfg);
router.use('/analytics', analytics);
router.use("/dates", dates)
router.use("/reports", reports)
router.use("/tags-by-class",tagsByClass)

export default router;
