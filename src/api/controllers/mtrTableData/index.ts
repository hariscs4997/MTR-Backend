import { Request, Response, NextFunction } from 'express';
import MTRTabelDataService from '../../services/mtrTableData';
import { generateExcel, getJobStatus } from '../../../queues/generateExcel.queue';
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
            const id = await generateExcel(req.body)
            res.send({ status: "ok", id }).status(200)
        } catch (e) {
            throw e;
        }
    }
    public static async getJobStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getJobStatus(req.body.id)
            res.send(data ).status(200)
        } catch (e) {
            throw e;
        }
    }
}