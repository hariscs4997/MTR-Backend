import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IReportsService {
    getHandOverReportData(): any;
    getReportLink(query: string): any
    getReportSummary(query: string): any
}

class ReportsService implements IReportsService {
    public async getHandOverReportData() {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT [Tool], [Name]
              FROM [dbo].[cfg_HandoverReports]
              
              SELECT *
              FROM [dbo].[cfg_HandoverReports]
        `
            );
            return data.recordsets;
        } catch (error) {
            console.log(error);
        }
    }
    public async getReportLink(query: string) {
        try {
            const data = await getData(query)
            return data
        } catch (error) {
            console.log(error);
        }
    }
    public async getReportSummary(query: string) {
        try {
            const data = await getData(query)
            return data
        } catch (error) {
            console.log(error);
        }
    }
}
const getData = async (query: string) => {
    try {
        const pool = await sqlService.connect(config);
        const data = await pool.request().query(`${query}`);
        return data.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

export default new ReportsService();