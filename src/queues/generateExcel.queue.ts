import Bull from "bull";
import generateExcelProcess from "../processes/generateExcel.process";
const generateExcelQueue = new Bull("generateExcel", {
    redis: {
        port: 6380,
        host: 'tgmtr2.redis.cache.windows.net',
        password:"PXOXd4TDlaCy1xjqz7Sy7aYa5FVxUQn7DAzCaItrBUM=",
        tls:{
            enableTrace:true
        }
    },
})


generateExcelQueue.process(generateExcelProcess)
    generateExcelQueue.on('completed', (job, result) => {
        console.log(result)
        job.finished();
    })

const generateExcel = async (data: any) => {
    const job = await generateExcelQueue.add(data, {
        attempts: 2
    })
    return job.id
}
async function getExcelJobStatus(jobId: string) {
    try {
        const job = await generateExcelQueue.getJob(jobId);
        if (!job) {
            return 'Job not found';
        }

        const state = await job.getState();
        console.log(job)
        return state;
    } catch (error) {
        console.error('Error getting job status:', error);
        throw error; // Handle or propagate the error as needed
    }
}

export {
    generateExcel,
    getExcelJobStatus
}