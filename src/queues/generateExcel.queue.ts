import Bull from "bull";
import generateExcelProcess from "../processes/generateExcel.process";
const generateExcelQueue = new Bull("generateExcel", {
    redis: {
        port: 6379,
        host: 'localhost',
    },
})

generateExcelQueue.process(generateExcelProcess)
const generateExcel = (data: any) => {
    generateExcelQueue.add(data, {
        attempts:2
    })
}

export {
    generateExcel
}