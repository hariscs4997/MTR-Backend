import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ICfgService {
    getTagLinks(key: string): any;
}

class CfgService implements ICfgService {
    public async getTagLinks(key: string) {
        try {
            ;
            const data = await sequelize.query(
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