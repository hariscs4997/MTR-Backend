import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ITagsByClassService {
    getTagClassData(item: string, viewName:string): any
    getTagSubClassData(item: string): any
    getTagLastClassData(item: string): any
}

class TagsByClassService implements ITagsByClassService {
    public async getTagClassData(item: string, viewName:string) {
        try {
            ;
            const tableData = await sequelize.query(
                    `select * from ${viewName} where [Tag Class] = '${item}'`
                );

            return tableData[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagSubClassData(item: string) {
        try {
            ;
            const data = await sequelize.query(
                `SELECT [ViewName]
          FROM [dbo].[cfg_ClassLevel2]
          Where [ClassName] = '${item}'`
            );
            const tableData = await sequelize.query(
                    `select * from ${data[0][0].ViewName} where [Tag SubClass] = '${item}'`
                );
            return tableData[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagLastClassData(item: string) {
        try {
            ;
            const data = await sequelize.query(
                `SELECT [ViewName]
          FROM [dbo].[cfg_ClassLevel3]
          Where [ClassName] = '${item}'`
            );
            const tableData = await sequelize.query(
                    `select * from ${data[0][0].ViewName} where [Tag Type] = '${item}'`
                );
            return tableData[0];
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TagsByClassService();