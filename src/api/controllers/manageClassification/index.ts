import { Request, Response, NextFunction } from 'express';
import ManageClassificationService from "../../services/manageClassifications"

export class ManageClassificationController {
    public static async getAllClassificationData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManageClassificationService.getAllClassificationData();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async addClassificationData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManageClassificationService.addClassificationData(req.body);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async updateClassificationData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManageClassificationService.updateClassificationData({ className: req.body.className, parentID: req.body.parentID }, req.body.id);
            console.log(data)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async deleteClassificationData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManageClassificationService.deleteClassificationData(parseInt(req.params.id));
            console.log(data)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}