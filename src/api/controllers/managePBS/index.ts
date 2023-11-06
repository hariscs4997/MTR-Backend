import { Request, Response, NextFunction } from 'express';
import ManagePBSService from "../../services/managePBS"

export class ManagePBSController {
    public static async getAllPBSData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManagePBSService.getAllPBSData();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getAllPBSTypeData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManagePBSService.getAllPBSTypeData();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async addPBSData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManagePBSService.addPBSData(req.body);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async updatePBSData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManagePBSService.updatePBSData({ name: req.body.name, parentID: req.body.parentID, description:req.body.description, type:req.body.type }, req.body.id);
            console.log(data)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async deletePBSData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ManagePBSService.deletePBSData(parseInt(req.params.id));
            console.log(data)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}