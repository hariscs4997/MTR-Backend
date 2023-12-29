import express, { Request, Response, Application } from 'express';
import path from "path"
import api from './api';
export class Routes {

  public routes(app: Application): void {
    app.route('/_status').get((req: Request, res: Response) => {
      res.status(200).send('Healthy!!!');
    });
    app.use('/api', api);
    const clientPath = path.normalize(path.join(process.cwd(), './client'));
    app.use(express.static(clientPath));
    app.use('(/*)?', async (req, res, next) => {
      res.sendFile(path.join(clientPath, 'index.html'));
    });

  }
}
