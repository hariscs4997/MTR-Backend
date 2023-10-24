import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ITagsQuickFindService {
    getTagsQuickFindMainUnitData(): any
    getTagsQuickFindProcessUnitData(id: number): any
}

class TagsQuickFindService implements ITagsQuickFindService {
    public async getTagsQuickFindMainUnitData() {
        try {
            const pool = await sqlService.connect(config);
            const data = await pool
                .request()
                .query(`select Name, ID from data_PBS where Type = 'Main Unit'`);
            return data.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagsQuickFindProcessUnitData(id: number) {
        try {
            const pool = await sqlService.connect(config);
            let data = await pool
                .request()
                .query(
                    `select Name,ID from [data_PBS] where [Type] = 'Process Unit' and [ParentID] = ${id}`
                );
            return data.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TagsQuickFindService();