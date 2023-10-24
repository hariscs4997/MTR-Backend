import { Request, Response, NextFunction } from 'express';
import CfgService from '../../services/cfg';

export class CfgController {
    public static async getSidebarData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CfgService.getSidebarData();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getMenuData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CfgService.getMenuData();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}