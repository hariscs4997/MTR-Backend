import { Request, Response, NextFunction } from 'express';
import DatesService from '../../services/dates';

export class DatesController {
    public static async getLatestUpdatedDates(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await DatesService.getLatestUpdatedDates()
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}