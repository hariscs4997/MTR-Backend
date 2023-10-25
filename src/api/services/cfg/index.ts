import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface ICfgService {
    getSidebarData(): any;
    getClassesData(): any
}

class CfgService implements ICfgService {
    public async getSidebarData() {
        try {
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
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
            const pool = await sqlService.connect(config);
            const products = await pool.request().query(
                `Select l1.classname, l2.classname, l3.classname
                FROM [dbo].[cfg_ClassLevel1] l1
                left join [dbo].[cfg_ClassLevel2] l2 on l1.id = l2.parentid
                  left join [dbo].[cfg_ClassLevel3] l3 on l2.id = l3.parentid
                `
            );
            return products.recordset
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CfgService();