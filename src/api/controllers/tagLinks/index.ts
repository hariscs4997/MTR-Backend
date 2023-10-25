import { Request, Response, NextFunction } from 'express';
import TagLinks from '../../services/tagLinks';

export class TagLinksController {
    public static async getTagLinks(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TagLinks.getTagLinks(req.body.tag);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}