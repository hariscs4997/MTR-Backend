
import path from "path"
interface IGPTDataService {
    getChatGPTResponse(fileData: any): any;
}

class GPTDataService implements IGPTDataService {

    public async getChatGPTResponse(fileData: any) {
        try {
            const file = fileData
            file.mv('./uploads/' + file.name)
            return { url: file.name }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new GPTDataService();