import { Request, Response, NextFunction } from 'express';
import MTRTabelDataService from '../../services/mtrTableData';
import { generateExcel, getExcelJobStatus } from '../../../queues/generateExcel.queue';
import { generateCsv, getCsvJobStatus } from '../../../queues/generateCsv.queue';
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
            res.send({ status: "ok", id, pathname:`/excel-${id}/${req.body.fileName}.zip` }).status(200)
        } catch (e) {
            throw e;
        }
    }
    public static async generateCsv(req: Request, res: Response, next: NextFunction) {
        try {
            const id = await generateCsv(req.body)
            res.send({ status: "ok", id, pathname:`/csv-${id}/${req.body.fileName}.zip`}).status(200)
        } catch (e) {
            throw e;
        }
    }
    public static async getExcelJobStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getExcelJobStatus(req.body.id)
            res.send(data ).status(200)
        } catch (e) {
            throw e;
        }
    }
    public static async getCsvJobStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getCsvJobStatus(req.body.id)
            res.send(data ).status(200)
        } catch (e) {
            throw e;
        }
    }
}