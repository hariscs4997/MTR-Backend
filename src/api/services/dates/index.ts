import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IDatesService {
    getLatestUpdatedDates(): any
}

class DatesService implements IDatesService {
    public async getLatestUpdatedDates() {
        try {
            let pool = await sqlService.connect(config);
            const lastUpdateMTRDate = await pool
                .request()
                .query(`SELECT [Date] FROM [dbo].[data_Dates] where [Type] = 'MTR'`);
            const lastUpdateSPToolDate = await pool
                .request()
                .query(`SELECT [Date] FROM [dbo].[data_Dates] where [Type] = 'SPTools'`);
            return {
                lastUpdateMTRDate: lastUpdateMTRDate.recordsets[0][0]["Date"],
                lastUpdateSPToolDate: lastUpdateSPToolDate.recordsets[0][0]["Date"],
            };
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DatesService();