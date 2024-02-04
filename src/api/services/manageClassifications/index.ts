import { sequelize } from "../../../config/dbconfig";
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
            ;
            const products = await sequelize.query(
                `Select * FROM [cfg_ClassificationLevels]`
            );
            return products[0]
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async getAllViewNamesData() {
        try {
            ;
            const products = await sequelize.query(
                `Select * FROM [cfg_Views]`
            );
            return products[0].map((item:any)  => ({ViewName:item.ViewName, DisplayName: item.DisplayName}));
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async addClassificationData(iManageClassificationItem: IManageClassificationItem) {
        try {
            ;
            const products = await sequelize.query(
                `INSERT INTO cfg_ClassificationLevels (ClassName, ViewName, ParentID, Icon, TageTypeCode)
                VALUES('${iManageClassificationItem.className}', '${iManageClassificationItem.viewName}', ${iManageClassificationItem.parentID ? `${iManageClassificationItem.parentID}` : null} , null, null);
                `
            );
            return {
                ClassName: iManageClassificationItem.className,
                ViewName: iManageClassificationItem.viewName,
                ParentID: iManageClassificationItem.parentID,
                Icon: null,
                TageTypeCode: null
            }
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async updateClassificationData(iManageClassificationItem: IManageClassificationItem, id: number) {
        try {
            ;
            const products = await sequelize.query(
                `UPDATE cfg_ClassificationLevels
                SET ClassName='${iManageClassificationItem.className}', ViewName='${iManageClassificationItem.viewName}', ParentID=${iManageClassificationItem.parentID ? `${iManageClassificationItem.parentID}` : null}, Icon=null, TageTypeCode=null
                WHERE ID=${id};
                `
            );
            return {
                ClassName: iManageClassificationItem.className,
                ViewName: iManageClassificationItem.viewName,
                ParentID: iManageClassificationItem.parentID,
                Icon: null,
                TageTypeCode: null
            }
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async deleteClassificationData(id: number) {
        try {
            ;
            const products = await sequelize.query(
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
            //console.log(e)
        }
    }
}
export default new ManageClassificationService();