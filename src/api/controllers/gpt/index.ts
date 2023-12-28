import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

export class GPTController {
    public static async uploadGPTFile(req: Request, res: Response, next: NextFunction) {
        try {
            const { file }: any = req.files
            file.mv('./uploads/' + file.name)
            res.send('/uploads/' + file.name).status(200);
        } catch (e) {
            throw e;
        }
    }
}