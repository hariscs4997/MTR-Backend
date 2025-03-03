import * as express from 'express';
import cfg from './cfg';
import analytics from './analytics';
import dates from './dates'
import reports from './reports';
import tagsByClass from './tagsByClass';
import tagsQuickFind from './tagsQuickFind';
import tagLinks from './tagLinks';
import mtrTableData from './mtrTableData';
import manageClassification from "./manageClassification"
import managePBS from './managePBS';
import gpt from './gpt';
const router = express.Router();
router.use('/cfg', cfg);
router.use('/analytics', analytics);
router.use("/dates", dates)
router.use("/reports", reports)
router.use("/tags-by-class", tagsByClass)
router.use("/tags-quick-find", tagsQuickFind)
router.use("/tag-links", tagLinks)
router.use("/mtr", mtrTableData)
router.use('/manage-classification', manageClassification)
router.use('/manage-pbs',managePBS)
router.use('/gpt',gpt)
export default router;
