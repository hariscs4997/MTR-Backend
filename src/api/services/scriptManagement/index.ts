import fs from "fs"
import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";
import { spawn } from "child_process"
const sqlService: any = sql

interface IScriptManagementStructure {
    ItemName: string,
    ScriptName: string,
}
interface IScriptManagementService {
    runScripts(ScriptName: string): any
    getAllScripts(): any;
    createMenuItem(payload: IScriptManagementStructure): any;
    getAllMenuItems(): any;
}
class ScriptManagementSerivce implements IScriptManagementService {

    public async getAllScripts() {
        try {
            const directoryPath = 'scripts';
            const files: any = await this.readFiles(directoryPath);
            const fileData = files.map((file: any) => {
                return {
                    name: file,
                };
            });
            return fileData
        }
        catch (e) {
            console.log(e)
        }
    }
    public async createMenuItem(payload: IScriptManagementStructure) {
        try {
            const pool = await sqlService.connect(config);
            await pool.request().query(
                `INSERT INTO data_ScriptManagement
                (ItemName, ScriptName)
                VALUES('${payload.ItemName}', '${payload.ScriptName}')`
            )
            return {
                ItemName: payload.ItemName,
                ScriptName: payload.ScriptName
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    public async getAllMenuItems() {
        try {
            const pool = await sqlService.connect(config);
            const items = await pool.request().query(`
            Select * from data_ScriptManagement
            `
            )
            return items.recordsets[0]
        }
        catch (e) {
            console.log(e)
        }
    }
    public async updateMenuItem(payload: IScriptManagementStructure, id: number) {
        try {
            const pool = await sqlService.connect(config);
            const items = await pool.request().query(`
            UPDATE data_ScriptManagement
            SET ItemName='${payload.ItemName}', ScriptName='${payload.ScriptName}'
            WHERE ID=${id};            `
            )
            console.log(items)
            return items.recordsets;
        }
        catch (e) {
            console.log(e)
        }
    }
    public async deleteMenuItem(id: number) {
        try {
            const pool = await sqlService.connect(config);
            await pool.request().query(`
            DELETE FROM data_ScriptManagement
            WHERE ID=${id};
            `)
            return true
        }
        catch (e) {
            console.log(e)
        }
    }
    public async runScripts(ScriptName: string) {
        try {
            console.log(ScriptName)
            const python = spawn('python3', ['-u', `scripts/${ScriptName}`]);
            python.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            python.stderr.on('data', (data) => {
                console.log('stderr', data.toString());
            });
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    readFiles(directoryPath: string) {
        return new Promise((resolve, reject) => {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files);
            });
        });
    }
}

export default new ScriptManagementSerivce();