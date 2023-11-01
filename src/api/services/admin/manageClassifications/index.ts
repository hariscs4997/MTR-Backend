import { config } from "../../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IManageClassificationItem {
    className: string,
    parentID: number,
}
interface IManageClassificationService {
    getAllClassificationData(): any
    addClassificationData(iManageClassificationItem: IManageClassificationItem): any
}

class ManageClassificationService implements IManageClassificationService {
    public async getAllClassificationData() {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `Select * FROM [cfg_ClassificationLevels]`
            );
            return products.recordsets[0]
        }
        catch (e) {
            console.log(e)
        }
    }
    public async addClassificationData(iManageClassificationItem: IManageClassificationItem) {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `INSERT INTO cfg_ClassificationLevels (ClassName, ViewName, ParentID, Icon, TageTypeCode)
                VALUES('${iManageClassificationItem.className}', 'data_AllTags', '${iManageClassificationItem.parentID}', null, null);
                `
            );
            return products.recordsets[0]
        }
        catch (e) {
            console.log(e)
        }
    }
}
export default new ManageClassificationService();