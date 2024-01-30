import { Request, Response, NextFunction } from 'express';
import DatabaseManagementService from '../../services/databaseManagement';

export class DatabaseManagementController {
    public static async getAllDBTables(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await DatabaseManagementService.getAllDBTables()
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async getTableRecords(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await DatabaseManagementService.getTableRecords(req.body.table)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async deleteTableRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await DatabaseManagementService.deleteTableRecord(req.body.query)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
    public static async updateTableRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await DatabaseManagementService.updateTableRecord(req.body.query)
            res.send(data).status(200);
        } catch (e) {
            throw e;
        }
    }
}