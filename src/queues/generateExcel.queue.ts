import Bull from "bull";
import generateExcelProcess from "../processes/generateExcel.process";
const generateExcelQueue = new Bull("generateExcel", {
    redis: {
        port: 6379,
        host: 'localhost',
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