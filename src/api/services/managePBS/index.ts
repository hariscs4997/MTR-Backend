import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IManagePBSStructure {
    name: string,
    parentID: number,
    description:string,
    type:string
}
interface IManagePBSService {
    getAllPBSData(): any;
    getAllPBSTypeData():any;
    addPBSData(iManagePBSStructure: IManagePBSStructure): any;
    updatePBSData(iManagePBSStructure: IManagePBSStructure, id: number): any;
    deletePBSData(id: number): any
}

class ManagePBSService implements IManagePBSService {
    public async getAllPBSData() {
        try {
            ;
            const products = await sequelize.query(
                `Select * FROM [data_PBS]`
            );
            return products[0]
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async getAllPBSTypeData() {
        try {
            ;
            const products = await sequelize.query(
                `Select * FROM [cfg_PBSSchema]`
            );
            return products[0].map((item:any)  => ({Name:item.Name}));
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async addPBSData(iManagePBSStructure: IManagePBSStructure) {
        try {
            ;
            const products = await sequelize.query(
                `INSERT INTO data_PBS (Name, Description, Type, ParentID)
                VALUES('${iManagePBSStructure.name}', '${iManagePBSStructure.description}','${iManagePBSStructure.type}' ,${iManagePBSStructure.parentID >= 0 ? `${iManagePBSStructure.parentID}` : 0});
                `
            );
            return {
                Name: iManagePBSStructure.name,
                Description: iManagePBSStructure.description,
                ParentID: iManagePBSStructure.parentID,
                Type: iManagePBSStructure.type,
            }
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async updatePBSData(iManagePBSStructure: IManagePBSStructure, id: number) {
        try {
            ;
            const products = await sequelize.query(
                `UPDATE data_PBS
                SET Name='${iManagePBSStructure.name}', Description='${iManagePBSStructure.description}',Type='${iManagePBSStructure.type}', ParentID=${iManagePBSStructure.parentID >=0 ? `${iManagePBSStructure.parentID}` : null}
                WHERE ID=${id};
                `
            );
            return {
                Name: iManagePBSStructure.name,
                Description: iManagePBSStructure.description,
                ParentID: iManagePBSStructure.parentID,
                Type: iManagePBSStructure.type,
            }
        }
        catch (e) {
            //console.log(e)
        }
    }
    public async deletePBSData(id: number) {
        try {
            ;
            const products = await sequelize.query(
                `WITH RecursiveCTE AS (
                    SELECT ID
                    FROM data_PBS
                    WHERE ID = ${id}
                    UNION ALL
                    SELECT t.ID
                    FROM data_PBS t
                    INNER JOIN RecursiveCTE cte ON cte.ID = t.ParentID
                  )
                  DELETE FROM data_PBS
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
export default new ManagePBSService();