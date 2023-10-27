import { Request, Response, NextFunction } from 'express';
import MTRTabelDataService from '../../services/mtrTableData';
import { generateExcel } from '../../../queues/generateExcel.queue';
export class MTRTabelDataController {
    public static async getTableData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await MTRTabelDataService.getTableData(req.body);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async generateExcel(req: Request, res: Response, next: NextFunction) {
        try {
            generateExcel(req.body)
            res.send({status:"ok"}).status(200)
        } catch (e) {
            throw e;
        }
    }
}