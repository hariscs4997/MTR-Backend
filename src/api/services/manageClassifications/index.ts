import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IManageClassificationItem {
    className: string,
    parentID: number,
    viewName:string
}
interface IManageClassificationService {
    getAllClassificationData(): any;
    getAllViewNamesData():any;
    addClassificationData(iManageClassificationItem: IManageClassificationItem): any;
    updateClassificationData(iManageClassificationItem: IManageClassificationItem, id: number): any;
    deleteClassificationData(id: number): any
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
    public async getAllViewNamesData() {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `Select * FROM [cfg_Views]`
            );
            return products.recordsets[0].map((item:any)  => ({ViewName:item.ViewName, DisplayName: item.DisplayName}));
        }
        catch (e) {
            console.log(e)
        }
    }
    public async addClassificationData(iManageClassificationItem: IManageClassificationItem) {
        console.log(iManageClassificationItem)
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `INSERT INTO cfg_ClassificationLevels (ClassName, ViewName, ParentID, Icon, TageTypeCode)
                VALUES('${iManageClassificationItem.className}', '${iManageClassificationItem.viewName}', ${iManageClassificationItem.parentID ? `${iManageClassificationItem.parentID}` : null} , null, null);
                `
            );
            return {
                ClassName: iManageClassificationItem.className,
                ViewName: "data_AllTags",
                ParentID: iManageClassificationItem.parentID,
                Icon: null,
                TageTypeCode: null
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    public async updateClassificationData(iManageClassificationItem: IManageClassificationItem, id: number) {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `UPDATE cfg_ClassificationLevels
                SET ClassName='${iManageClassificationItem.className}', ViewName='${iManageClassificationItem.viewName}', ParentID=${iManageClassificationItem.parentID ? `${iManageClassificationItem.parentID}` : null}, Icon=null, TageTypeCode=null
                WHERE ID=${id};
                `
            );
            return {
                ClassName: iManageClassificationItem.className,
                ViewName: "data_AllTags",
                ParentID: iManageClassificationItem.parentID,
                Icon: null,
                TageTypeCode: null
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    public async deleteClassificationData(id: number) {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `WITH RecursiveCTE AS (
                    SELECT ID
                    FROM cfg_ClassificationLevels
                    WHERE ID = ${id}
                    UNION ALL
                    SELECT t.ID
                    FROM cfg_ClassificationLevels t
                    INNER JOIN RecursiveCTE cte ON cte.ID = t.ParentID
                  )
                  DELETE FROM cfg_ClassificationLevels
                  WHERE ID IN (SELECT ID FROM RecursiveCTE)
                `
            );
            return "Deleted Successfully"
        }
        catch (e) {
            console.log(e)
        }
    }
}
export default new ManageClassificationService();