import { Request, Response, NextFunction } from 'express';
import TagsQuickFindService from '../../services/tagsQuickFind';

export class TagsQuickFindController {
    public static async getTagsQuickFindMainUnitData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsQuickFindService.getTagsQuickFindMainUnitData()
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getTagsQuickFindProcessUnitData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsQuickFindService.getTagsQuickFindProcessUnitData(req.body.id)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getTagsQuickFindTableData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagsQuickFindService.getTagsQuickFindTableData(req.body)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}