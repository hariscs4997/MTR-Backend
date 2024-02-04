import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ITagsQuickFind {
    tagNo: string,
    mainUnit: string,
    processUnit: string,
    tagClass: string,
    tagSubClass: string,
    tagType: string
}
interface ITagsQuickFindService {
    getTagsQuickTagClassData(): any
    getTagsQuickFindMainUnitData(): any
    getTagsQuickFindProcessUnitData(id: number): any;
    getTagsQuickFindTableData(iTagsQuickFind: ITagsQuickFind): any
}

class TagsQuickFindService implements ITagsQuickFindService {
    public async getTagsQuickTagClassData() {
        try {
            ;
            const data = await sequelize.query(`Select ClassName,ID from [cfg_ClassLevel1]`);
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagsQuickTagSubClassData(tagClass: string) {
        try {
            ;
            const data = await sequelize.query(
                    `select [ClassName], ID FROM [cfg_ClassLevel2] where [ParentID] = '${tagClass}'`
                );
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagsQuickTagTypeData(tagSubClass: string) {
        try {
            ;
            const data = await sequelize.query(
                    `select [ClassName],ID FROM [cfg_ClassLevel3] where [ParentID] ='${tagSubClass}'`
                );
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }

    public async getTagsQuickFindMainUnitData() {
        try {
            ;
            const data = await sequelize.query(`select Name, ID from data_PBS where Type = 'Main Unit'`);
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagsQuickFindProcessUnitData(id: number) {
        try {
            ;
            let data = await sequelize.query(
                    `select Name,ID from [data_PBS] where [Type] = 'Process Unit' and [ParentID] = ${id}`
                );
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }
    public async getTagsQuickFindTableData(iTagsQuickFind: ITagsQuickFind) {
        try {
            ;
            let data = await sequelize.query(
                `select * FROM [data_AllTags] where [Tag No] LIKE '${iTagsQuickFind.tagNo}' and [Main Unit] LIKE '${iTagsQuickFind.mainUnit}' and [Process Unit] LIKE '${iTagsQuickFind.processUnit}' and [Tag Class] LIKE
                '${iTagsQuickFind.tagClass}' and [Tag SubClass] LIKE '${iTagsQuickFind.tagSubClass}' and [Tag Type] LIKE '${iTagsQuickFind.tagType}'`
            );
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }

}

export default new TagsQuickFindService();