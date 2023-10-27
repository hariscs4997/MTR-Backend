import { Job } from "bull";
import ExcelJS from 'exceljs';
import { config } from "../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

const generateExcelProcess = async (job: Job) => {
    // console.log(job.data)
    const { title, fileName } = job.data;
    const viewName = await getViewName(title);
    let totalRecords: any = await getTotalRecords(viewName);
    // console.log("totalRecords", totalRecords);
    const start = 0;
    //create a workbook
    const workbook = new ExcelJS.Workbook();
    //create a worksheet
    const worksheet = workbook.addWorksheet("Sheet");
    //if records are more than a million return.
    if (totalRecords > 1000000) return;

    const result = await getAllData(viewName, start, totalRecords);
    //prepare columns
    const columns = Object.keys(result[0]).map((col) => {
        return {
            name: col,
            filterButton: true,
        };
    });

    worksheet.properties.defaultRowHeight = 20;

    //add data
    worksheet.addTable({
        name: "MyTable",
        ref: "A1",
        headerRow: true,
        totalsRow: false,
        style: {
            theme: "TableStyleMedium2",
            showRowStripes: true,
            showFirstColumn: true,
        },
        columns,
        rows: result.map((item: any) => {
            let data: any = [];
            Object.keys(item).map((key) => {
                data.push(item[key] ? item[key] : "");
            });
            return data;
        }),
    });

    //stylings
    worksheet.columns.forEach((column, index) => {
        column.width = columns[index].name.length * 1.5;
    });
    worksheet.eachRow((row) => {
        row.font = {
            size: 13,
            name: "Arial",
        };
    });
    worksheet.getRow(1).font = {
        name: "Arial",
        size: 15,
        bold: true,
    };
    //wrtie file
    await workbook.xlsx.writeFile(`public/${fileName}.xlsx`);
    return `${fileName}.xlsx`
}
const getViewName = async (title: string) => {
    try {
        const pool = await sqlService.connect(config);
        const ViewName = await pool.request().query(`
        SELECT *
          FROM [dbo].[cfg_Views]
          WHERE DisplayName = '${title}'`);
        return ViewName.recordsets[0][0].ViewName;
    } catch (error) {
        console.log(error);
    }
}
const getTotalRecords = async (viewName: string) => {
    try {
        const pool = await sqlService.connect(config);
        const totalRecords = await pool
            .request()
            .query(`SELECT COUNT([Tag No]) FROM [dbo].[${viewName}]`);
        return Object.values(totalRecords.recordset[0])[0];
    } catch (error) {
        console.error(error);
    }
}
const getAllData = async (viewName: string, start: number, end: number) => {
    try {
        const pool = await sqlService.connect(config);
        const products = await pool.request().query(
            `SELECT *
          FROM [dbo].[${viewName}] ORDER BY [Tag No]  
          OFFSET ${start} ROWS
          FETCH NEXT ${end} ROWS ONLY`
        );

        return products.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

export default generateExcelProcess