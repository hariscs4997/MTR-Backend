import { Request, Response, NextFunction } from 'express';
import ReportsService from '../../services/reports';

export class ReportsController {
    public static async getHandOverReportData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ReportsService.getHandOverReportData()
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getReportLink(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ReportsService.getReportLink(req.body.query)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getReportSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ReportsService.getReportSummary(req.body.query)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}