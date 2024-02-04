import { sequelize } from "../../../config/dbconfig";

interface IDatabaseManagement {
    getAllDBTables(): any;
    getTableRecords(tableName: string): any;
    deleteTableRecord(query: string): any
    updateTableRecord(query:string):any
}

class DatabaseManagementService implements IDatabaseManagement {
    public async getAllDBTables() {
        try {
            const data = await sequelize.query(
                `SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE'`
            );
           
            return data.map((item: any) => ({ table: item.table_name }));
        } catch (error) {
            //console.log(error);
        }
    }
    public async getTableRecords(tableName: string) {
        try {
            const result = await sequelize.query(`SELECT * FROM ${tableName}`);
            const getDataTypes = await sequelize.query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`)
            const columns = result?.length ? Object.keys(result[0]) : []
            const dataTypes =  getDataTypes
            const records = result;
            return { columns, records, tableName, dataTypes  }
        } catch (error) {
            //console.log(error);
        }
    }
    public async deleteTableRecord(query: string) {
        try {
            const result = await sequelize.query(query);
            return result.recordset
        } catch (error) {
            //console.log(error);
        }
    }
    public async updateTableRecord(query: string) {
        try {
            const result = await sequelize.query(query);
            return result.recordset
        } catch (error) {
            //console.log(error);
        }
    }
}


export default new DatabaseManagementService();