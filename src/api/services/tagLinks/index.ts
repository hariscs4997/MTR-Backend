import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ICfgService {
    getTagLinks(key: string): any;
}

class CfgService implements ICfgService {
    public async getTagLinks(key: string) {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT [URL]
                ,[Title]
            FROM [dbo].[data_Links] where [Tag Key] = '${key}'`
            );
            return data.recordset[0]
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CfgService();