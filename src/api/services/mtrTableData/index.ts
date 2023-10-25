import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IMTRTableDataItem {
    name: string,
    start: number,
    end: number,
    filters: any,
    sort: object
}
interface IMTRTableDataService {
    getTableData(iMTRTableDataItem: IMTRTableDataItem): any;
}

class MTRTableDataService implements IMTRTableDataService {
    public async getTableData(iMTRTableDataItem: IMTRTableDataItem) {
        try {
            const viewName = await getViewName(iMTRTableDataItem.name)
            const pool = await sqlService.connect(config);
            const noOfRows = iMTRTableDataItem.end - iMTRTableDataItem.start;
            let query = "";
            if (Object.keys(iMTRTableDataItem.filters).length) {
                Object.keys(iMTRTableDataItem.filters).forEach((item: any, index) => {
                    console.log(item)
                    if (index === Object.keys(iMTRTableDataItem.filters).length - 1) {
                        query +=
                            "[".concat(item).concat("]") +
                            " LIKE " +
                            "'".concat(iMTRTableDataItem.filters[item]).concat("%").concat("'");
                    } else {
                        query +=
                            "[".concat(item).concat("]") +
                            " LIKE " +
                            "'".concat(iMTRTableDataItem.filters[item]).concat("%").concat("'") +
                            " AND ";
                    }
                });
            }
            const products = await pool.request().query(
                `SELECT *
              FROM [dbo].[${viewName}] 
              ${query.length > 0 && "WHERE " + query}
              ${Object.keys(iMTRTableDataItem.sort).length
                    ? "ORDER BY " +
                    "[".concat(Object.keys(iMTRTableDataItem.sort)[0]).concat("]") +
                    " " +
                    Object.values(iMTRTableDataItem.sort)[0]
                    : "ORDER BY [Tag No]"
                } 
              OFFSET ${iMTRTableDataItem.start} ROWS
              FETCH NEXT ${noOfRows} ROWS ONLY`
            );
            let totalRecords = await pool
                .request()
                .query(`SELECT COUNT([Tag No]) FROM [dbo].[${viewName}]`);

            return {
                records: products.recordsets[0],
                totalRecords: totalRecords.recordset[0][''],
            };
        } catch (error) {
            console.log(error);
        }
    }
}
const getViewName = async (displayName: string) => {
    try {
        const pool = await sqlService.connect(config);
        const ViewName = await pool.request().query(`
        SELECT *
          FROM [dbo].[cfg_Views]
          WHERE DisplayName = '${displayName}'`);
        return ViewName.recordsets[0][0].ViewName;
    } catch (error) {
        console.log(error);
    }
}

export default new MTRTableDataService();