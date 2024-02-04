import { Request, Response, NextFunction } from 'express';
import AnalyticsService from '../../services/analytics';

export class AnalyticsController {
    public static async getStatisticsOverallData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AnalyticsService.getStatisticsOverallandValidationData();
           
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}