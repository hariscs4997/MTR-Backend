import Bull from "bull";
import generateCsvProcess from "../processes/generateCsv.process";
const generateCsvQueue = new Bull("generateCsv", {
    redis: {
        port: 6380,
        host: 'tgmtr2.redis.cache.windows.net',
        password:"PXOXd4TDlaCy1xjqz7Sy7aYa5FVxUQn7DAzCaItrBUM=",
        tls:{
            enableTrace:true
        }
    },
})


generateCsvQueue.process(generateCsvProcess)
    generateCsvQueue.on('completed', (job, result) => {
        console.log('job completed')
        job.finished();
    })

const generateCsv = async (data: any) => {
    const job = await generateCsvQueue.add(data, {
        attempts: 2
    })
    return job.id
}
async function getCsvJobStatus(jobId: string) {
    try {
        const job = await generateCsvQueue.getJob(jobId);
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
    generateCsv,
    getCsvJobStatus
}