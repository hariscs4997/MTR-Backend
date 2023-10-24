import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ITagsByClassService {
    getTagClassData(item: string): any
    getTagSubClassData(item: string): any
    getTagLastClassData(item: string): any
}

class TagsByClassService implements ITagsByClassService {
    public async getTagClassData(item: string) {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT [ViewName]
          FROM [dbo].[cfg_ClassLevel1]
          Where [ClassName] = '${item}'`
            );
            const tableData = await pool
                .request()
                .query(
                    `select * from ${data.recordsets[0][0].ViewName} where [Tag Class] = '${item}'`
                );

            return tableData.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagSubClassData(item: string) {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT [ViewName]
          FROM [dbo].[cfg_ClassLevel2]
          Where [ClassName] = '${item}'`
            );
            const tableData = await pool
                .request()
                .query(
                    `select * from ${data.recordsets[0][0].ViewName} where [Tag SubClass] = '${item}'`
                );
            return tableData.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagLastClassData(item: string) {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT [ViewName]
          FROM [dbo].[cfg_ClassLevel3]
          Where [ClassName] = '${item}'`
            );
            const tableData = await pool
                .request()
                .query(
                    `select * from ${data.recordsets[0][0].ViewName} where [Tag Type] = '${item}'`
                );
            return tableData.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TagsByClassService();