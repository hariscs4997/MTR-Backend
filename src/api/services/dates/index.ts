import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IDatesService {
    getLatestUpdatedDates(): any
}

class DatesService implements IDatesService {
    public async getLatestUpdatedDates() {
        try {
            ;
            const lastUpdateMTRDate = await sequelize.query(`SELECT [Date] FROM [dbo].[data_Dates] where [Type] = 'MTR'`);
            const lastUpdateSPToolDate = await sequelize.query(`SELECT [Date] FROM [dbo].[data_Dates] where [Type] = 'SPTools'`);
            return {
                lastUpdateMTRDate: lastUpdateMTRDate[0][0]["Date"],
                lastUpdateSPToolDate: lastUpdateSPToolDate[0][0]["Date"],
            };
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DatesService();