
import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";


const sqlService: any = sql

interface ICfgService {
    getSidebarData(): any;
    getClassesData(): any
}

class CfgService implements ICfgService {
    public async getSidebarData() {
        try {
            ;
            const products = await sequelize.query(
                `WITH my_cte1 AS (
              select [Group] 
              from   [dbo].[cfg_Views]
              group by [Group]
            ), 
            my_cte2 AS(
              select *
              from   [dbo].[cfg_Views]
            )
            select ROW_NUMBER() OVER(ORDER BY [Group], DisplayName ASC) id, [ViewName], [DisplayName], [Group], [Icon],[RenderServerSide],[EnableEDWPush]  from (
            select  null [ViewName], null  [DisplayName], [Group], null [Icon], null [RenderServerSide], null [EnableEDWPush] from my_cte1 
            union all 
            select  [ViewName], [DisplayName], [Group], [Icon],[RenderServerSide],[EnableEDWPush] from my_cte2
            ) a
            order by [DisplayName]`
                // SELECT [ViewName] AS id,[DisplayName] AS title, [Icon] AS icon, [ViewName] AS navLink  FROM [dbo].[cfg_Views] order by [DisplayName] asc
            );
            return products.recordset
        } catch (error) {
            console.log(error);
        }
    }
    public async getClassesData() {
        try {
            ;
            const products = await sequelize.query(
                `Select * FROM [cfg_ClassificationLevels]`
            );
            return products.recordset
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CfgService();