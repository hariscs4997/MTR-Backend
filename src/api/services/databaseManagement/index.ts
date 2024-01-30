import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IDatabaseManagement {
    getAllDBTables(): any;
    getTableRecords(tableName: string): any;
    deleteTableRecord(query: string): any
    updateTableRecord(query:string):any
}

class DatabaseManagementService implements IDatabaseManagement {
    public async getAllDBTables() {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool.request().query(
                `SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE'`
            );
            return data.recordsets[0].map((item: any) => ({ table: item.table_name }));
        } catch (error) {
            console.log(error);
        }
    }
    public async getTableRecords(tableName: string) {
        try {
            const pool = await sqlService.connect(config);
            const result = await pool.request().query(`SELECT * FROM ${tableName}`);
            const getDataTypes = await pool.request().query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`)
            const columns = result.recordset?.length ? Object.keys(result.recordset[0]) : []
            const dataTypes =  getDataTypes.recordset
            const records = result.recordset;
            return { columns, records, tableName, dataTypes  }
        } catch (error) {
            console.log(error);
        }
    }
    public async deleteTableRecord(query: string) {
        try {
            const pool = await sqlService.connect(config);
            const result = await pool.request().query(query);
            return result.recordset
        } catch (error) {
            console.log(error);
        }
    }
    public async updateTableRecord(query: string) {
        try {
            const pool = await sqlService.connect(config);
            const result = await pool.request().query(query);
            return result.recordset
        } catch (error) {
            console.log(error);
        }
    }
}


export default new DatabaseManagementService();