import { Request, Response, NextFunction } from 'express';
import ScriptManagement from '../../services/scriptManagement'
import fs from "fs"
export class ScriptManagementController {
    public static async getAllScripts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ScriptManagement.getAllScripts();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async createMenuItem(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ScriptManagement.createMenuItem(req.body);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getAllMenuItems(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ScriptManagement.getAllMenuItems();
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async updateMenuItem(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ScriptManagement.updateMenuItem({ ItemName: req.body.ItemName, ScriptName: req.body.ScriptName }, req.body.ID);
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async deleteMenuItem(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ScriptManagement.deleteMenuItem(parseInt(req.params.id));
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async runScripts(req: Request, res: Response, next: NextFunction) {
        try {
            // const { file }: any = req.files
            // file.mv('./uploads/' + file.name)
            // console.log(req.files, req.body)
            const data = await ScriptManagement.runScripts(req.body.scriptName);
            // fs.unlink('./uploads/' + file.name, (err) => {
            //     if (err) throw err;
            //     console.log('path/file.txt was deleted');
            // })
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}