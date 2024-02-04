import { Job } from "bull";
import { sequelize } from "../config/dbconfig";
import sql from "mssql/msnodesqlv8";
import JSZip from "jszip"
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import fs from "fs"
const sqlService: any = sql

const generateCsvProcess = async (job: Job) => {
    const { size, title, fileName } = job.data;
    const viewName = await getViewName(title);
    let totalRecords: any = await getTotalRecords(viewName);
    let iterations = totalRecords;
    if (size > 0) {
        iterations = Math.ceil(totalRecords / size);
    }
    const zip = new JSZip();
    if (!fs.existsSync(`public/csv-${job.id}`)) {
        fs.mkdirSync(`public/csv-${job.id}`);
    }
    for (let i = 0; i < iterations; i++) {
        const start: any = i * size;
        const end: any = size;
        const result = await getAllData(viewName, start, end);
        const csvWriter = createCsvWriter({
            path: `public/csv-${job.id}/${fileName}-${i}.csv`,
            header: Object.keys(result[0]).map((col) => {
                return {
                    id: col, title: col
                }
            })
        });
        csvWriter.writeRecords(result)
            .then(() => {
                zip.file(
                    `${fileName}-${i}.csv`,
                    fs.readFileSync(`public/csv-${job.id}/${fileName}-${i}.csv`)
                );
                if (i === iterations - 1) {
                    zip
                        .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                        .pipe(fs.createWriteStream(`public/csv-${job.id}/${fileName}.zip`))
                        .on("finish", function () {
                            return `public/csv-${job.id}/${fileName}.zip`
                        });
                }
            })
    }
}
const getViewName = async (title: string) => {
    try {
        ;
        const ViewName = await sequelize.query(`
        SELECT *
          FROM [dbo].[cfg_Views]
          WHERE DisplayName = '${title}'`);
        return ViewName[0][0].ViewName;
    } catch (error) {
        console.log(error);
    }
}
const getTotalRecords = async (viewName: string) => {
    try {
        ;
        const totalRecords =await sequelize.query(`SELECT COUNT(*) FROM [dbo].[${viewName}]`);
        return Object.values(totalRecords.recordset[0])[0];
    } catch (error) {
        console.error(error);
    }
}
async function getAllData(viewName: string, start: number, end: number) {
    try {
        ;
        const products = await sequelize.query(
            `SELECT *
            FROM [dbo].[${viewName}] ORDER BY [Tag No]  
            OFFSET ${start} ROWS
            FETCH NEXT ${end} ROWS ONLY`
        );
        return products[0];
    } catch (error) {
        console.log(error);
    }
}

export default generateCsvProcess