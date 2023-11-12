import { Request, Response, NextFunction } from 'express';
import TagsByClassService from '../../services/tagsByClass';

export class TagsByClassController {
    public static async getTagClassData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsByClassService.getTagClassData(req.body.name, req.body.viewName)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getTagSubClassData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsByClassService.getTagSubClassData(req.body.name)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getTagLastClassData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsByClassService.getTagLastClassData(req.body.name)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}