import { Request, Response, NextFunction } from 'express';
import MTRTabelDataService from '../../services/mtrTableData';

export class MTRTabelDataController {
    public static async getTableData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await MTRTabelDataService.getTableData(req.body);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}